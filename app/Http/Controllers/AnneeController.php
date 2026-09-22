<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use App\Models\Contribution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AnneeController extends Controller
{
    public function create() 
    {
        return Inertia::render('AdminPannel/Annee/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'dateDebut'           => 'required|date',
            'dateFin'             => 'required|date|after:dateDebut',
            'montantMembre'       => 'required|numeric|min:0',
            'montantMembreBureau' => 'required|numeric|min:0',
        ]);

        // Overlap check for CREATION: check against ALL existing years
        $overlapExists = Annee::where('dateDebut', '<=', $validated['dateFin'])
            ->where('dateFin', '>=', $validated['dateDebut'])
            ->exists();

        if ($overlapExists) {
            return back()->withErrors([
                'dateDebut' => 'Les dates choisies chevauchent une année académique existante.'
            ])->withInput();
        }

        DB::transaction(function () use ($validated) {
            $contribution = Contribution::create([
                'montantMembre'       => $validated['montantMembre'],
                'montantMembreBureau' => $validated['montantMembreBureau'],
            ]);

            Annee::create([
                'dateDebut'       => $validated['dateDebut'],
                'dateFin'         => $validated['dateFin'],
                'contribution_id' => $contribution->id,
                'status'          => 'en cours',
            ]);
        });

        return redirect()->route('admin.index')->with('success', 'Année académique créée avec succès.');
    }

    public function edit(Annee $annee)
    {
        return Inertia::render('AdminPannel/Annee/Edit', [
            'annee' => array_merge($annee->load('contribution')->toArray(), [
                'dateDebut' => Carbon::parse($annee->dateDebut)->toDateString(),
                'dateFin'   => Carbon::parse($annee->dateFin)->toDateString(),
            ]),
        ]);
    }
public function update(Request $request, Annee $annee)
{
    $validated = $request->validate([
        'dateDebut'           => 'required|date',
        'dateFin'             => 'required|date|after:dateDebut',
        'status'              => 'required|in:en cours,achevée',
        'montantMembre'       => 'required|numeric|min:0',
        'montantMembreBureau' => 'required|numeric|min:0',
    ]);

    $contribution = Contribution::find($annee->contribution_id);
    $contribution->update([
        'montantMembre'       => $validated['montantMembre'],
        'montantMembreBureau' => $validated['montantMembreBureau'],
    ]);

    $annee->update([
        'dateDebut'           => $validated['dateDebut'],
        'dateFin'             => $validated['dateFin'],
        'status'              => $validated['status'],
    ]);

    return redirect()->route('admin.index')->with('success', 'Année académique mise à jour avec succès.');
}
}