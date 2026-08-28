<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\OperationFinanciere;
use App\Models\Annee;
use App\Models\Paie;
use Illuminate\Support\Facades\DB;

class OperationFinanciereController extends Controller
{
    public function index(Request $request): Response
    {
        $idAnneeEnCours = Annee::max('id');
        $annee = Annee::find($idAnneeEnCours);
        $dateDebut = $annee->dateDebut;
        $dateFin = $annee->dateFin;

       
        
        $selectedOption = $request->input('option');

        
        $operations = OperationFinanciere::query()
            ->when($selectedOption, fn ($query) => $query->where('type', $selectedOption))
            ->with('user:id,nom')
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        $totalContributionsPercues = Paie::whereHas(
            'contribution.annees',
            fn ($q) => $q->where('id', $annee?->id)
        )->sum('montantPaye');

        $operationsQuery = OperationFinanciere::query();
        if ($annee?->dateDebut && $annee?->dateFin) {
            $operationsQuery->whereBetween('date', [$annee->dateDebut, $annee->dateFin]);
        }

        $totalDepenses = (clone $operationsQuery)->where('type', 'depense')->sum('montant');
        $totalRecettes = (clone $operationsQuery)->where('type', 'recette')->sum('montant');

        $solde = ($totalContributionsPercues + $totalRecettes) - $totalDepenses;
            
        return Inertia::render('OperationFinanciere/Index', [
            'operations' => $operations,
            'selectedOption' => $selectedOption,
            'recap' => [
                'totalContributions' => $totalContributionsPercues,
                'totalRecettes' => $totalRecettes,
                'totalDepenses' => $totalDepenses,
                'solde' => $solde,
            ],
        ]);
    }

    public function create()
    {   
        return Inertia::render('OperationFinanciere/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'montant' => 'required|numeric|min:0',
            'motif' => 'required|string|max:255',
            'type' => 'required|in:depense,recette',
        ]);

        // Injecte l'ID de l'utilisateur connecté côté serveur
        $validated['user_id'] = $request->user()->id;
        $validated['date'] = now()->format('Y-m-d'); 

        OperationFinanciere::create($validated);

        return redirect()->route('operationFinanciere.index')
            ->with('success', 'Opération enregistrée avec succès.');
    }

    /**
     * Supprime une opération financière.
     */
    public function destroy(OperationFinanciere $operationFinanciere)
    {
        $operationFinanciere->delete();

        return redirect()->route('operationFinanciere.index')
            ->with('success', 'Opération supprimée avec succès.');
    }
}