<?php

namespace App\Http\Controllers;

use App\Models\Mandat;
use App\Models\Annee;
use App\Http\Requests\StoreMandatRequest;
use App\Http\Requests\UpdateMandatRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MandatController extends Controller
{
    /**
     * Display a listing of mandats.
     */
    public function index(Request $request): Response
    {
        $query = Mandat::with('annee')->withCount('roles');

        if ($status = $request->input('status')) {
            $query->where('status', $status);
        }

        $mandats = $query->latest('id')->paginate(10)->withQueryString();

        return Inertia::render('Mandat/Index', [
            'mandats' => $mandats,
            'filters' => $request->only(['status']),
        ]);
    }

    /**
     * Show the form for creating a new mandat.
     */
    public function create(): Response
    {
        $annees = Annee::all();

        return Inertia::render('Mandat/Create', [
            'annees' => $annees,
        ]);
    }

    /**
     * Store a newly created mandat in storage.
     */
    public function store(StoreMandatRequest $request)
    {
        $validated = $request->validated();

        Mandat::create($validated);

        return redirect()->route('mandats.index')->with('success', 'Mandat créé avec succès.');
    }

    /**
     * Show the form for editing the specified mandat.
     */
    public function edit(Mandat $mandat): Response
    {
        $mandat->load('annee');
        $annees = Annee::all();

        return Inertia::render('Mandat/Edit', [
            'mandat' => $mandat,
            'annees' => $annees,
        ]);
    }

    /**
     * Update the specified mandat in storage.
     */
    public function update(UpdateMandatRequest $request, Mandat $mandat)
    {
        $validated = $request->validated();

        $mandat->update($validated);

        return redirect()->route('mandats.index')->with('success', 'Mandat mis à jour avec succès.');
    }

    /**
     * Remove the specified mandat from storage.
     */
    public function destroy(Mandat $mandat)
    {
        if ($mandat->roles()->count() > 0) {
            return redirect()->back()->with('error', 'Impossible de supprimer ce mandat car des rôles y sont associés.');
        }

        $mandat->delete();

        return redirect()->route('mandats.index')->with('success', 'Mandat supprimé avec succès.');
    }
}