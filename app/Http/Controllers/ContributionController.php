<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UpdateContributionRequest;
use App\Http\Requests\StoreContributionRequest;
use Illuminate\Support\Facades\DB;
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
        $users = User::select('id', 'nom', 'email')->get();

        return Inertia::render('Contribution/Create', [
            'users' => $users,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContributionRequest $request)
    {
        $validated = $request->validated();

        
        $idAnneeEnCours = Annee::max('id');

        DB::transaction(function () use ($validated, $idAnneeEnCours) {
            $contribution = Contribution::create([
                'user_id'  => $validated['user_id'],
                'montant'  => $validated['montant'],
                'annee_id' => $idAnneeEnCours,
                'dateContribution' => now()->format('Y-m-d'),  
            ]);

            Paie::create([
                'user_id'         => $validated['user_id'],        
                'contribution_id' => $contribution->id,                    
            ]);
        });

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
    public function edit(Contribution $contribution)
    {
        $paie = Paie::where('contribution_id', $contribution->id)
            ->with('user')
            ->first();

        return Inertia::render('Contribution/Edit', [
            'contribution' => $contribution,
            'paie'        => $paie,
            'user'        => $paie?->user, // Pass the single user directly
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContributionRequest $request, Contribution $contribution)
    {
        // 1. Use validated() on custom FormRequest
        $validated = $request->validated(); 
        
        // 2. Only update montant in contribution table
        DB::transaction(function () use ($validated, $contribution) {
            $contribution->update([
                'montant' => $validated['montant'], 
            ]);
        });

        return redirect()->route('contributions.index')
            ->with('success', 'Contribution modifiée avec succès.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contribution $contribution)
    {
        DB::transaction(function () use ($contribution) {
            $contribution->delete();
        });
        
        return redirect()->route('contributions.index')
            ->with('success', 'Contribution supprimée avec succès.');
    }
}
