<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\Annee;
use App\Models\User;
use App\Models\ListeCandidat;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ElectionController extends Controller
{   
    public function indexVotant()
    {
        $user = Auth::user();
        $now = Carbon::now();

        $elections = Election::with(['annee', 'listesCandidats'])
            ->withCount(['emergements as total_voters'])
            ->orderBy('dateOuvertureVote', 'desc')
            ->get()
            ->map(function ($election) use ($user, $now) {
                // Check if current authenticated user has already voted
                $hasVoted = $user 
                    ? $election->emergements()->where('user_id', $user->id)->exists() 
                    : false;

                // Dynamic temporal status evaluation
                if ($now->lt($election->dateDebutDepot)) {
                    $statut = 'À venir';
                } elseif ($now->between($election->dateDebutDepot, $election->dateFinDepot)) {
                    $statut = 'Dépôt des candidatures';
                } elseif ($now->between($election->dateDebutCampagne, $election->dateFinCampagne)) {
                    $statut = 'Campagne électorale';
                } elseif ($now->between($election->dateOuvertureVote, $election->dateClotureVote)) {
                    $statut = 'Vote en cours';
                } else {
                    $statut = 'Clôturé';
                }

                return [
                    'id' => $election->id,
                    'title' => $election->title ?? 'Élection du bureau',
                    'statut' => $statut,
                    'has_voted' => $hasVoted,
                    'total_voters' => $election->total_voters,
                    'listes_count' => $election->listesCandidats->count(),
                    'annee' => $election->annee ? [
                        'dateDebut' => $election->annee->dateDebut,
                        'dateFin' => $election->annee->dateFin,
                    ] : null,
                    'dates' => [
                        'vote_debut' => Carbon::parse($election->dateOuvertureVote)->format('d/m/Y à H:i'),
                        'vote_fin' => Carbon::parse($election->dateClotureVote)->format('d/m/Y à H:i'),
                    ],
                ];
            });

        return Inertia::render('Election/Index', [
            'elections' => $elections,
        ]);
    }

    public function showVotant(Election $election)
    {
        $user = Auth::user();
        $now = Carbon::now();

        // Check if user has already voted
        $hasVoted = $user 
            ? $election->emergements()->where('user_id', $user->id)->exists() 
            : false;

        // Dynamic status evaluation
        if ($now->lt($election->dateDebutDepot)) {
            $statut = 'À venir';
        } elseif ($now->between($election->dateDebutDepot, $election->dateFinDepot)) {
            $statut = 'Dépôt des candidatures';
        } elseif ($now->between($election->dateDebutCampagne, $election->dateFinCampagne)) {
            $statut = 'Campagne électorale';
        } elseif ($now->between($election->dateOuvertureVote, $election->dateClotureVote)) {
            $statut = 'Vote en cours';
        } else {
            $statut = 'Clôturé';
        }

        $isVoteOpen = ($statut === 'Vote en cours');

        // Fetch candidate lists with office members and vote counts
        $listes = ListeCandidat::where('election_id', $election->id)
            ->with(['membres.user'])
            ->withCount('votes')
            ->get();

        $totalEmargements = $election->emergements()->count();

        return Inertia::render('Election/Show', [
            'election' => [
                'id' => $election->id,
                'title' => $election->title ?? 'Élection du bureau',
                'statut' => $statut,
                'dates' => [
                    'depot_debut' => $election->dateDebutDepot ? Carbon::parse($election->dateDebutDepot)->format('d/m/Y à H:i') : null,
                    'depot_fin' => $election->dateFinDepot ? Carbon::parse($election->dateFinDepot)->format('d/m/Y à H:i') : null,
                    'campagne_debut' => $election->dateDebutCampagne ? Carbon::parse($election->dateDebutCampagne)->format('d/m/Y à H:i') : null,
                    'campagne_fin' => $election->dateFinCampagne ? Carbon::parse($election->dateFinCampagne)->format('d/m/Y à H:i') : null,
                    'vote_debut' => $election->dateOuvertureVote ? Carbon::parse($election->dateOuvertureVote)->format('d/m/Y à H:i') : null,
                    'vote_fin' => $election->dateClotureVote ? Carbon::parse($election->dateClotureVote)->format('d/m/Y à H:i') : null,
                ],
                'annee' => $election->annee ? [
                    'dateDebut' => $election->annee->dateDebut,
                    'dateFin' => $election->annee->dateFin,
                ] : null,
            ],
            'hasVoted' => $hasVoted,
            'isVoteOpen' => $isVoteOpen,
            'listes' => $listes,
            'totalEmargements' => $totalEmargements,
        ]);
    }

    public function index()
    {
        $elections = Election::with(['annee', 'listesCandidats'])
            ->latest('id')
            ->get();

        return Inertia::render('AdminPannel/Election/Index', [
            'elections' => $elections,
        ]);
    }

    public function create()
    {
        $annees = Annee::all();

        return Inertia::render('AdminPannel/Election/Create', [
            'annees' => $annees,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'annee_id'          => 'required|exists:annees,id',
            'title'             => 'required|string|max:255',
            'dateDebutDepot'    => 'required|date',
            'dateFinDepot'      => 'required|date|after:dateDebutDepot',
            'dateDebutCampagne' => 'required|date|after:dateFinDepot',
            'dateFinCampagne'   => 'required|date|after:dateDebutCampagne',
            'dateOuvertureVote' => 'required|date|after:dateFinCampagne',
            'dateClotureVote'   => 'required|date|after:dateOuvertureVote',
        ]);

        Election::create($validated);

        return redirect()->route('admin.index')
            ->with('message', 'Élection créée avec succès.');
    }

    public function destroy(Election $election)
    {
        // Si l'élection a déjà des listes de candidats, on empêche la suppression
        if ($election->listesCandidats()->exists()) {
            return redirect()->route('admin.index')
                ->with('error', 'Impossible de supprimer une élection ayant déjà des listes de candidats.');
        }

        $election->delete();

        return redirect()->route('admin.index')
            ->with('message', 'Élection supprimée avec succès.');
    }

    public function edit(Election $election)
    {
        return Inertia::render('AdminPannel/Election/Edit', [
            'election' => [
                'id' => $election->id,
                'annee_id' => $election->annee_id,
                'title' => $election->title,
                // Format dates to 'Y-m-d\TH:i' for HTML datetime-local inputs
                'dateDebutDepot' => $election->dateDebutDepot ? Carbon::parse($election->dateDebutDepot)->format('Y-m-d\TH:i') : '',
                'dateFinDepot' => $election->dateFinDepot ? Carbon::parse($election->dateFinDepot)->format('Y-m-d\TH:i') : '',
                'dateDebutCampagne' => $election->dateDebutCampagne ? Carbon::parse($election->dateDebutCampagne)->format('Y-m-d\TH:i') : '',
                'dateFinCampagne' => $election->dateFinCampagne ? Carbon::parse($election->dateFinCampagne)->format('Y-m-d\TH:i') : '',
                'dateOuvertureVote' => $election->dateOuvertureVote ? Carbon::parse($election->dateOuvertureVote)->format('Y-m-d\TH:i') : '',
                'dateClotureVote' => $election->dateClotureVote ? Carbon::parse($election->dateClotureVote)->format('Y-m-d\TH:i') : '',
            ]
        ]);
    }

    /**
     * Update the specified election in storage.
     */
    public function update(Request $request, Election $election)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'dateDebutDepot' => 'required|date',
            'dateFinDepot' => 'required|date|after_or_equal:dateDebutDepot',
            'dateDebutCampagne' => 'required|date|after_or_equal:dateFinDepot',
            'dateFinCampagne' => 'required|date|after_or_equal:dateDebutCampagne',
            'dateOuvertureVote' => 'required|date|after_or_equal:dateFinCampagne',
            'dateClotureVote' => 'required|date|after_or_equal:dateOuvertureVote',
        ]);

        $election->update($validated);

        return redirect()->route('admin.index')->with('success', 'Élection mise à jour avec succès.');
    }

    public function show(Election $election)
    {
        // Load candidate lists, members, and user details
        $election->load([
            'listesCandidats.membres.user',
        ]);

        // Get active users to populate candidate selection dropdowns
        $users = User::select('id', 'nom', 'email')->orderBy('nom')->get();

        return Inertia::render('AdminPannel/Election/Show', [
            'election' => [
                'id' => $election->id,
                'title' => $election->title,
                'statut' => $election->statut_dynamique, // Dynamic property from Election Model
                'dates' => [
                    'depot_debut' => $election->dateDebutDepot ? Carbon::parse($election->dateDebutDepot)->format('Y-m-d H:i') : Carbon::now()->format('Y-m-d H:i'),
                    'depot_fin' => $election->dateFinDepot ? Carbon::parse($election->dateFinDepot)->format('Y-m-d H:i') : Carbon::now()->format('Y-m-d H:i'),
                    'campagne_debut' => $election->dateDebutCampagne ? Carbon::parse($election->dateDebutCampagne)->format('Y-m-d H:i') : Carbon::now()->format('Y-m-d H:i'),
                    'campagne_fin' => $election->dateFinCampagne ? Carbon::parse($election->dateFinCampagne)->format('Y-m-d H:i') : Carbon::now()->format('Y-m-d H:i'),
                    'vote_debut' => $election->dateOuvertureVote ? Carbon::parse($election->dateOuvertureVote)->format('Y-m-d H:i') : Carbon::now()->format('Y-m-d H:i'),
                    'vote_fin' => $election->dateClotureVote ? Carbon::parse($election->dateClotureVote)->format('Y-m-d H:i') : Carbon::now()->format('Y-m-d H:i'),
                ],
                'listes' => $election->listesCandidats,
                'total_emargements' => $election->emergements()->count(),
            ],
            'users' => $users,
        ]);
    }
}