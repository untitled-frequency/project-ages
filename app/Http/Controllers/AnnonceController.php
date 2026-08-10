<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Annonce;
use App\Models\User;
use Illuminate\Http\Request;

use Inertia\Inertia;

class AnnonceController extends Controller
{
    public function index(Request $request)
    {
        $annonces = Annonce::query()
            ->with('user:id,nom')
            ->orderBy('datePublication', 'desc')
            ->paginate(3)
            ->withQueryString();

        return Inertia::render('Annonce/Index', [
            'annonces' => $annonces,
        ]);
    }

    public function create()
    {   
        return Inertia::render('Annonce/Create');
    }

    public function show(Annonce $annonce)
    {
        $annonce = Annonce::with('user:id,nom')->findOrFail($annonce->id);
        return Inertia::render('Annonce/Show', [
            'annonce' => $annonce,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'datePublication' => 'required|date',
            'contenu' => 'required|string',
            'type' => 'required|string',
        ]);

        $validated['user_id'] = Auth::id();
        Annonce::create($validated);

        return redirect()->route('communique.index');
    }

    public function edit(Annonce $annonce)
    {
        return Inertia::render('Annonce/Edit', [
            'annonce' => $annonce,
        ]);
    }

    public function update(Request $request, Annonce $annonce)
    {
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'contenu' => 'required|string',
            'type' => 'required|string',
        ]);

        unset($validated['datePublication']);
        $annonce->update($validated);

        return redirect()->route('communique.index');
    }


    public function destroy(string $id)
    {
        $annonce = Annonce::findOrFail($id);
        $annonce->delete();

        return redirect()->route('communique.index');
    }
}
