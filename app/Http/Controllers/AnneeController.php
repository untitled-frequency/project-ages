<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use App\Models\Contribution;
use App\Http\Requests\StoreAnneeRequest;
use App\Http\Requests\UpdateAnneeRequest;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AnneeController extends Controller
{
    public function create() 
    {
        // Fetch latest contribution defaults if present
        $latestContribution = Contribution::latest('id')->first();

        return Inertia::render('AdminPannel/Annee/Create', [
            'defaultContribution' => $latestContribution
        ]);
    }

    public function store(StoreAnneeRequest $request)
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated) {
            // Check if latest contribution exists and is NOT attached to any academic year
            $latestContribution = Contribution::latest('id')->first();
            $isAttached = $latestContribution 
                ? Annee::where('contribution_id', $latestContribution->id)->exists()
                : true;

            if (!$latestContribution || $isAttached) {
                // Automatically create new contribution record
                $contribution = Contribution::create([
                    'montantMembre' => $validated['montantMembre'],
                    'montantMembreBureau' => $validated['montantMembreBureau'],
                ]);
            } else {
                // Use the unattached latest contribution and update amounts
                $latestContribution->update([
                    'montantMembre' => $validated['montantMembre'],
                    'montantMembreBureau' => $validated['montantMembreBureau'],
                ]);
                $contribution = $latestContribution;
            }

            // Create Academic Year linked to the contribution
            Annee::create([
                'dateDebut' => $validated['dateDebut'],
                'dateFin' => $validated['dateFin'],
                'contribution_id' => $contribution->id,
                'status' => 'en cours',
            ]);
        });

        return redirect()->route('admin.index')->with('success', 'Année académique créée avec succès.');
    }

    public function edit(Annee $annee)
    {
        // Load contribution relationship
        $annee->load('contribution');

        return Inertia::render('AdminPannel/Annee/Edit', [
            'annee' => $annee
        ]);
    }

    public function update(UpdateAnneeRequest $request, Annee $annee) 
    {
        $validated = $request->validated();

        DB::transaction(function () use ($validated, $annee) {
            // Update linked contribution amounts
            if ($annee->contribution) {
                $annee->contribution->update([
                    'montantMembre' => $validated['montantMembre'],
                    'montantMembreBureau' => $validated['montantMembreBureau'],
                ]);
            } else {
                // If missing, attach a new one dynamically
                $contribution = Contribution::create([
                    'montantMembre' => $validated['montantMembre'],
                    'montantMembreBureau' => $validated['montantMembreBureau'],
                ]);
                $annee->contribution_id = $contribution->id;
            }

            // Update academic year properties
            $annee->update([
                'dateDebut' => $validated['dateDebut'],
                'dateFin' => $validated['dateFin'],
                'status' => $validated['status'],
            ]);
        });

        return redirect()->route('admin.index')->with('success', 'Année académique mise à jour avec succès.');
    }
}