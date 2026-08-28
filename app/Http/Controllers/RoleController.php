<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Mandat;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

use App\Http\Requests\StoreRoleRequest;

use Inertia\Inertia;
use Inertia\Response;

class RoleController extends Controller
{
    protected function availableRoleTypes(): array
    {
        return [
            'admin' => 'Administrateur',
            'president' => 'Président du bureau',
            'vice_president' => 'Vice-Président',
            'secretaire_general' => 'Secrétaire Général',
            'tresorier' => 'Trésorier',
            'commission_electorale' => 'Membre Commission Électorale',
            'president_liste' => 'Président de liste',
        ];
    }

    public function index(Request $request): Response
    {
        Mandat::checkAndUpdateExpiredMandats();

        $mandatId = $request->input('mandat_id');

        // Find active mandate based on your 'status' column
        $activeMandat = Mandat::where('status', 'actif')->first();
        $selectedMandatId = $mandatId ?? $activeMandat?->id;

        $roles = Role::with(['user:id,nom,email,tel', 'mandat'])
            ->when($selectedMandatId, fn ($q) => $q->where('mandat_id', $selectedMandatId))
            ->paginate(10)
            ->withQueryString();

        $users = User::select('id', 'nom', 'email', 'tel')->get();
        $mandats = Mandat::all();

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'users' => $users,
            'mandats' => $mandats,
            'selectedMandatId' => $selectedMandatId ? (int) $selectedMandatId : null,
            'availableRoleTypes' => $this->availableRoleTypes(),
        ]);
    }

    public function create(): Response
{
    $users = User::select('id', 'nom', 'email', 'tel')->get();
    $mandats = Mandat::all();

    return Inertia::render('Roles/Create', [
        'users' => $users,
        'mandats' => $mandats,
        'availableRoleTypes' => $this->availableRoleTypes(),
    ]);
}
    

    public function store(StoreRoleRequest $request)
    {
        $validated = $request->validated();

        Role::create($validated);

        return redirect()->route('roles.index')->with('success', 'Rôle attribué avec succès.');
    }

    public function edit(Role $role): Response
    {
        $role->load('user:id,nom,email,tel', 'mandat');

        $users = User::select('id', 'nom', 'email', 'tel')->get();
        $mandats = Mandat::all();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'users' => $users,
            'mandats' => $mandats,
            'availableRoleTypes' => $this->availableRoleTypes(),
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'user_id' => [
                'required',
                'exists:users,id',
                Rule::unique('roles')
                    ->where(fn ($query) => $query->where('mandat_id', $request->mandat_id))
                    ->ignore($role->id),
            ],
            'mandat_id' => ['required', 'exists:mandats,id'],
            'role' => ['required', 'string'],
        ], [
            'user_id.unique' => 'Cet utilisateur possède déjà un rôle pour ce mandat.',
        ]);

        $role->update($validated);

        return redirect()->route('roles.index')->with('success', 'Rôle modifié avec succès.');
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