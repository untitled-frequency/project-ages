<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\ListeCandidat;
use App\Models\MembreListeCandidat;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ListeCandidatController extends Controller
{
    public function store(Request $request, Election $election)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'programme' => 'nullable|string',
        ]);

        $election->listesCandidats()->create([
            'nom' => $validated['nom'],
            'slogan' => $validated['slogan'] ?? null,
            'programme' => $validated['programme'] ?? null,
            'status' => 'brouillon',
        ]);

        return back()->with('success', 'Liste de candidature créée.');
    }

    public function addMember(Request $request, Election $election, ListeCandidat $liste)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'role'    => 'required|string|max:255',
        ]);

        // 1. Enforce constraint: User can only belong to ONE list per election
        $alreadyInElection = MembreListeCandidat::where('election_id', $election->id)
            ->where('user_id', $validated['user_id'])
            ->exists();

        if ($alreadyInElection) {
            throw ValidationException::withMessages([
                'user_id' => 'Cet utilisateur est déjà membre d\'une liste pour cette élection.'
            ]);
        }

        // 2. Enforce constraint: Role must be unique per list (per migration)
        $roleTaken = MembreListeCandidat::where('liste_candidat_id', $liste->id)
            ->where('role', $validated['role'])
            ->exists();

        if ($roleTaken) {
            throw ValidationException::withMessages([
                'role' => 'Ce rôle est déjà attribué dans cette liste.'
            ]);
        }

        MembreListeCandidat::create([
            'election_id'       => $election->id,
            'liste_candidat_id' => $liste->id,
            'user_id'           => $validated['user_id'],
            'role'              => $validated['role'],
        ]);

        return back()->with('success', 'Membre ajouté à la liste avec succès.');
    }

    public function removeMember(MembreListeCandidat $membre)
    {
        $membre->delete();

        return back()->with('success', 'Membre retiré de la liste.');
    }
}