<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\User;
use App\Models\Participe;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    
    public function index()
    {
        $activites = Activite::query()
            ->with('responsable:id,nom')
            ->paginate(7)
            ->withQueryString();
        

        return Inertia::render('Activite/Index', [
            'activites' => $activites,
        ]);
    }

    
    public function create()
    {
        $users = User::select('id', 'nom')->orderBy('nom')->get();

        return Inertia::render('Activite/Create', [
            'users' => $users,
        ]);
    }

    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre'          => 'required|string|max:255',
            'date'           => 'required|date',
            'lieu'           => 'required|string|max:255',
            'description'    => 'required|string',
            'responsable_id' => 'required|exists:users,id',
            'budget'         => 'required|numeric',
        ]);

        Activite::create($validated);

        return redirect()->route('activites.index');
    }

    
    public function edit(string $id)
    {
        $activite = Activite::with('responsable')->findOrFail($id);
        $users = User::select('id', 'nom')->orderBy('nom')->get();

        return Inertia::render('Activite/Edit', [
            'activite' => $activite,
            'users' => $users,
        ]);
    }

    public function update(Request $request, Activite $activite)
    {
        $validated = $request->validate([
        'titre'          => 'required|string|max:255',
        'date'           => 'required|date',
        'lieu'           => 'required|string|max:255',
        'description'    => 'required|string',
        'responsable_id' => 'required|exists:users,id',
        'budget'         => 'required|numeric',
        ]);

        $activite->update($validated);

        return redirect()->route('activites.index');
    }

    
    public function destroy(string $id)
    {
        $activite = Activite::findOrFail($id);
        $activite->delete();
        return redirect()->route('activites.index');
    }
}
