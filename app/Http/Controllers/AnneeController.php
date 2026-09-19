<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use App\Models\Contribution;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnneeController extends Controller
{
    public function edit(Annee $annee)
    {
        return Inertia::render('AdminPannel/Annee/Edit', [
            'annee' => $annee
        ]);
    }

    public function create() 
    {
        return Inertia::render('AdminPannel/Annee/Create');
    }

    public function store(Request $request)
    {
        $contributionId = Contribution::latest('id')->first();
        
        if(!$contributionId) {
            
        }

        $validated = $request->validated([
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date',
        ]);
    }

    public function update(Request $request, Annee $annee) 
    {
        // contribution 
        $validated = $request->validated([
            'dateDebut' => 'required|date',
            'dateFin' => 'required|date',
        ]);

        $annee->update($validated);

        return redirect()->route('admin.index');
    }
}
