<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\OperationFinanciere;
use App\Models\Annee;
use App\Models\Paie;

class OperationFinanciereController extends Controller
{
    public function index(Request $request): Response
    {
        $annee = Annee::latest('id')->first();

        $selectedOption = $request->input('option');

        $operations = OperationFinanciere::query()
            ->where('annee_id', $annee?->id) // scope the table itself, fixes list/recap mismatch
            ->when($selectedOption, fn ($query) => $query->where('type', $selectedOption))
            ->with('user:id,nom')
            ->orderBy('date', 'desc')
            ->paginate(10)
            ->withQueryString();

        $totalContributionsPercues = Paie::whereHas(
            'contribution.annees',
            fn ($q) => $q->where('id', $annee?->id)
        )->sum('montantPaye');

        // Same relationship-based scoping as contributions, no more date range
        $totalDepenses = OperationFinanciere::where('annee_id', $annee?->id)
            ->where('type', 'depense')
            ->sum('montant');

        $totalRecettes = OperationFinanciere::where('annee_id', $annee?->id)
            ->where('type', 'recette')
            ->sum('montant');

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

        $annee = Annee::latest('id')->first();

        $validated['user_id'] = $request->user()->id;
        $validated['annee_id'] = $annee?->id; // stamp with current année, not inferred from date
        $validated['date'] = now()->format('Y-m-d');

        OperationFinanciere::create($validated);

        return redirect()->route('operationFinanciere.index')
            ->with('success', 'Opération enregistrée avec succès.');
    }

    public function destroy(OperationFinanciere $operationFinanciere)
    {
        $operationFinanciere->delete();

        return redirect()->route('operationFinanciere.index')
            ->with('success', 'Opération supprimée avec succès.');
    }
}