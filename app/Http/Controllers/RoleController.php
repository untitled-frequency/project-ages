<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Mandat;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    public function index(Request $request): Response
    {
        $mandatId = $request->input('mandat_id');
        
        // Find active mandate based on your 'status' column
        $activeMandat = Mandat::where('status', 'actif')->first();
        $selectedMandatId = $mandatId ?? $activeMandat?->id;

        $roles = Role::with(['user:id,nom,email,tel', 'mandat'])
            ->when($selectedMandatId, fn($q) => $q->where('mandat_id', $selectedMandatId))
            ->paginate(10)
            ->withQueryString();

        $users = User::select('id', 'nom', 'email', 'tel')->get();
        $mandats = Mandat::all();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'users' => $users,
            'mandats' => $mandats,
            'selectedMandatId' => $selectedMandatId ? (int) $selectedMandatId : null,
            'availableRoleTypes' => [
                'admin' => 'Administrateur',
                'president' => 'Président du bureau',
                'vice_president' => 'Vice-Président',
                'secretaire_general' => 'Secrétaire Général',
                'tresorier' => 'Trésorier',
                'commission_electorale' => 'Membre Commission Électorale',
                'president_liste' => 'Président de liste',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'mandat_id' => ['required', 'exists:mandats,id'],
            'role' => [
                'required',
                'string',
                Rule::unique('roles')->where(function ($query) use ($request) {
                    return $query->where('user_id', $request->user_id)
                                 ->where('mandat_id', $request->mandat_id);
                }),
            ],
        ], [
            'role.unique' => 'Cet utilisateur possède déjà ce rôle pour ce mandat.',
        ]);

        Role::create($validated);

        return redirect()->back()->with('success', 'Rôle attribué avec succès.');
    }

    public function destroy(Request $request)
    {
        // Supports deletion both by ID or by composite attributes
        if ($request->has('id')) {
            Role::where('id', $request->input('id'))->delete();
        } else {
            Role::where('user_id', $request->input('user_id'))
                ->where('mandat_id', $request->input('mandat_id'))
                ->where('role', $request->input('role'))
                ->delete();
        }

        return redirect()->back()->with('success', 'Rôle retiré avec succès.');
    }
}