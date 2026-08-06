<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Activite;
use App\Models\Reunion;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommuniqueController extends Controller
{
    
    public function index(Request $request)
    {   
        $tab = $request->query('tab', 'reunions');

        $users = User::select('id', 'nom', 'email')->get();

        $reunions = Reunion::query()
            ->with(['user:id,nom', 'participants:id,nom'])
            ->paginate(7)
            ->withQueryString();

         $activites = Activite::query()
            ->with('responsable:id,nom')
            ->paginate(7)
            ->withQueryString();

        $annonces = Annonce::query()
            ->with(['user:id,nom'])
            ->paginate(7)
            ->withQueryString();

        return Inertia::render('Comminique/Index', [
            'users' => $users,
            'reunions' => $reunions,
            'activites' => $activites,
            'annonces' => $annonces,
            'activeTab' => $tab,
        ]);
    }

    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }
     
    public function destroy(string $id)
    {
        //
    }
}
