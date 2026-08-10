<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use App\Models\User;
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

    public function show(Activite $activite)
    {
        $activite->load('responsable');
        
        return Inertia::render('Activite/Show', [
            'activite' => $activite,
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

        // Redirect back to Communiqué with the 'activites' tab selected
        return redirect()->route('communique.index', ['tab' => 'activites']);
    }

    public function edit(Activite $activite)
    {
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

        // Redirect back to Communiqué with the 'activites' tab selected
        return redirect()->route('communique.index', ['tab' => 'activites']);
    }

    public function destroy(string $id)
    {
        $activite = Activite::findOrFail($id);
        $activite->delete();

        // Redirect back to Communiqué with the 'activites' tab selected
        return redirect()->route('communique.index', ['tab' => 'activites']);
    }
}