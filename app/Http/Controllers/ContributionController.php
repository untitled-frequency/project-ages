<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Paie;
use App\Models\Annee;
use App\Models\Contribution;
use App\Models\User;

class ContributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $idAnneeEnCours = Annee::max('id');

        $query = Paie::query();

        if($search = $request->input('search')) {
            $query->whereHas('user', function ($q) use ($search) {
                $q->where('nom', 'like', '%' . $search . '%')
                  ->orWhere('email', 'like', '%' . $search . '%');
            });
        }

        $paies = $query->with(['user', 'contribution'])
            ->whereHas('contribution', function ($q) use ($idAnneeEnCours) {
                $q->where('annee_id', $idAnneeEnCours);
            })
            ->paginate(10);

        return Inertia::render('Contribution/Index', [
            'paies' => $paies,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Fetch all users/members for the selection dropdown
        $users = User::all();

        return Inertia::render('Contribution/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'montant' => 'required|numeric|min:0',
        ]);

        // 2. Fetch the current active school year ID (Max ID)
        $idAnneeEnCours = Annee::max('id');

            
        // Step A: Create the Contribution record
        $contribution = Contribution::create([
            'user_id'  => $validated['user_id'],
            'montant'  => $validated['montant'],
            'annee_id' => $idAnneeEnCours,
            'dateContribution' => now()->format('Y-m-d'),  
        ]);

        // Step B: Create the Paie record
        Paie::create([
            'user_id'         => $validated['user_id'],        
            'contribution_id' => $contribution->id,                    
        ]);

        return redirect()->route('contributions.index')
            ->with('success', 'Contribution enregistrée avec succès.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
