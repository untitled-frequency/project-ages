<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use App\Models\Paie;
use App\Models\Annee;
use App\Models\Contribution;
use App\Models\OperationFinanciere;
use App\Models\User;

class ContributionController extends Controller
{
    /**
     * Liste des membres avec leur statut de contribution pour l'année en cours,
     * plus une carte récapitulative (contributions perçues / dépenses / solde).
     */
    public function index(Request $request): Response
    {
        $idAnneeEnCours = Annee::max('id');
        $annee = Annee::find($idAnneeEnCours);

        $contribution = Contribution::where('annee_id', $idAnneeEnCours)->first();

        $montantMembre = $contribution?->montantMembre ?? 0;
        $montantMembreBureau = $contribution?->montantMembreBureau ?? 0;

        $selectedStatut = $request->input('statut');
        $search = $request->input('search'); // 1. Capture search query

        $usersQuery = User::with([
            'roles',
            'paies' => function ($query) use ($idAnneeEnCours) {
                $query->whereHas('contribution', fn ($q) => $q->where('annee_id', $idAnneeEnCours))
                    ->orderBy('id', 'desc');
            },
        ]);

        // 2. Filter by search query (Name or Email)
        if ($search) {
            $usersQuery->where(function ($q) use ($search) {
                $q->where('nom', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $users = $usersQuery->get()->map(function ($user) use ($montantMembre, $montantMembreBureau) {
            $estMembreBureau = $user->roles->isNotEmpty();
            $montantExige = $estMembreBureau ? $montantMembreBureau : $montantMembre;

            $montantTotalPaye = $user->paies->sum('montantPaye');
            $resteAPayer = max($montantExige - $montantTotalPaye, 0);
            $statut = $resteAPayer <= 0 ? 'A jour' : 'En retard';

            return [
                'id' => $user->id,
                'nom' => $user->nom,
                'email' => $user->email,
                'estMembreBureau' => $estMembreBureau,
                'dernierPaiement' => $user->paies->first(),
                'montantTotalPaye' => $montantTotalPaye,
                'totalAPayer' => $montantExige,
                'resteAPayer' => $resteAPayer,
                'statut' => $statut,
            ];
        });

        if ($selectedStatut) {
            $users = $users->filter(function ($u) use ($selectedStatut) {
                return $selectedStatut === 'a_jour'
                    ? $u['statut'] === 'A jour'
                    : $u['statut'] === 'En retard';
            })->values();
        }

        $perPage = 10;
        $currentPage = LengthAwarePaginator::resolveCurrentPage();

        $usersPaginated = new LengthAwarePaginator(
            $users->slice(($currentPage - 1) * $perPage, $perPage)->values(),
            $users->count(),
            $perPage,
            $currentPage,
            [
                'path' => Paginator::resolveCurrentPath(),
                'query' => $request->query(),
            ]
        );

        $totalContributionsPercues = Paie::whereHas(
            'contribution',
            fn ($q) => $q->where('annee_id', $idAnneeEnCours)
        )->sum('montantPaye');

        $operationsQuery = OperationFinanciere::query();
        if ($annee?->dateDebut && $annee?->dateFin) {
            $operationsQuery->whereBetween('date', [$annee->dateDebut, $annee->dateFin]);
        }

        $totalDepenses = (clone $operationsQuery)->where('type', 'depense')->sum('montant');
        $totalRecettes = (clone $operationsQuery)->where('type', 'recette')->sum('montant');

        $solde = ($totalContributionsPercues + $totalRecettes) - $totalDepenses;

        return Inertia::render('Contribution/Index', [
            'users' => $usersPaginated,
            'selectedStatut' => $selectedStatut,
            'search' => $search, // 3. Pass search query back to frontend
            'contribution' => $contribution,
            'recap' => [
                'totalContributions' => $totalContributionsPercues,
                'totalDepenses' => $totalDepenses,
                'totalRecettes' => $totalRecettes,
                'solde' => $solde,
            ],
        ]);
}

    /**
     * Formulaire de définition du montant de la contribution pour l'année en cours.
     */
    public function create()
    {
        $idAnneeEnCours = Annee::max('id');

        if (Contribution::where('annee_id', $idAnneeEnCours)->exists()) {
            return redirect()->route('contribution.index')
                ->with('error', "Une contribution est déjà définie pour l'année en cours.");
        }

        return Inertia::render('Contribution/Create');
    }

    public function store(Request $request)
    {
        $idAnneeEnCours = Annee::max('id');

        $validated = $request->validate([
            'montantMembre' => 'required|numeric|min:0',
            'montantMembreBureau' => 'required|numeric|min:0|gte:montantMembre',
        ]);

        if (Contribution::where('annee_id', $idAnneeEnCours)->exists()) {
            return back()->withErrors([
                'annee_id' => "Une contribution est déjà définie pour l'année en cours.",
            ]);
        }

        $validated['annee_id'] = $idAnneeEnCours;

        Contribution::create($validated);

        return redirect()->route('contribution.index')
            ->with('success', 'Montant de la contribution défini avec succès.');
    }

    /**
     * Formulaire de modification du montant de la contribution.
     */
    public function edit(Contribution $contribution)
    {
        return Inertia::render('Contribution/Edit', [
            'contribution' => $contribution,
        ]);
    }

    public function update(Request $request, Contribution $contribution)
    {
        $validated = $request->validate([
            'montantMembre' => 'required|numeric|min:0',
            'montantMembreBureau' => 'required|numeric|min:0|gte:montantMembre',
        ]);

        $contribution->update($validated);

        return redirect()->route('contributions.index')
            ->with('success', 'Contribution mise à jour avec succès.');
    }

    /**
     * Supprime la configuration de contribution d'une année (uniquement si aucun
     * paiement n'y est déjà rattaché, pour ne pas perdre l'historique financier).
     */
    public function destroy(Contribution $contribution)
    {
        if ($contribution->paies()->exists()) {
            return back()->withErrors([
                'contribution' => 'Impossible de supprimer : des paiements existent déjà pour cette contribution.',
            ]);
        }

        $contribution->delete();

        return redirect()->route('contribution.index')
            ->with('success', 'Contribution supprimée avec succès.');
    }

    // ------------------------------------------------------------------
    // Gestion des paiements (Paie) rattachés à une contribution
    // ------------------------------------------------------------------

    public function createPaiement(Contribution $contribution, Request $request)
    {
        $user = User::findOrFail($request->query('user_id'));

        return Inertia::render('Paiement/Create', [
            'contribution' => $contribution,
            'user' => $user->only('id', 'nom', 'email'),
        ]);
    }

    public function editPaiement(Paie $paie)
    {
        $paie->load('user:id,nom,email');

        return Inertia::render('Paiement/Edit', [
            'paie' => $paie,
        ]);
    }

    public function updatePaiement(Request $request, Paie $paie)
    {
        $validated = $request->validate([
            'montantPaye' => 'required|numeric|min:0.01',
        ]);

        $paie->update($validated);

        return redirect()->route('contributions.index')
            ->with('success', 'Paiement mis à jour avec succès.');
    }
    /**
     * Enregistre un paiement d'un membre pour la contribution courante.
     */
    public function storePaiement(Request $request, Contribution $contribution)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'montantPaye' => 'required|numeric|min:0.01',
        ]);

        Paie::create([
            'user_id' => $validated['user_id'],
            'contribution_id' => $contribution->id,
            'montantPaye' => $validated['montantPaye'],
        ]);

        // Redirect to index instead of back()
        return redirect()->route('contributions.index')
            ->with('success', 'Paiement enregistré avec succès.');
    }

    /**
     * Supprime un paiement (corrige "impossibilité de supprimer une contribution").
     */
    public function destroyPaiement(Paie $paie)
    {
        $paie->delete();

        return back()->with('success', 'Paiement supprimé avec succès.');
    }
}