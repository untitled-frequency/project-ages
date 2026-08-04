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
     * Display a listing of the resource grouped by user.
     */
    public function index(Request $request)
    {   
        $idAnneeEnCours = Annee::max('id');

        $users = User::query()
            ->when($request->input('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nom', 'like', '%' . $search . '%')
                      ->orWhere('email', 'like', '%' . $search . '%');
                });
            })
            // Select user details along with aggregated contribution total and latest contribution ID
            ->select('users.*')
            ->selectRaw('SUM(contributions.montant) as montantTotal')
            ->join('paies', 'users.id', '=', 'paies.user_id')
            ->join('contributions', 'paies.contribution_id', '=', 'contributions.id')
            ->where('contributions.annee_id', $idAnneeEnCours)
            ->groupBy('users.id')
            ->paginate(10);
        
        $users->getCollection()->transform(function ($user) use ($idAnneeEnCours) {
            $user->latestContributionId = Contribution::whereHas('paie', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->where('annee_id', $idAnneeEnCours)
            ->latest('id')
            ->value('id');

            return $user;
        });
            
        return Inertia::render('Contribution/Index', [
            'users' => $users,
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
            'user'        => $paie?->user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContributionRequest $request, Contribution $contribution)
    {
        $validated = $request->validated(); 
        
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