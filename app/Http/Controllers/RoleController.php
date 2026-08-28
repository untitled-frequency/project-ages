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
            'commissaire_aux_comptes' => 'Commissaire aux comptes',
            'tresorier' => 'Trésorier',
            'commission_electorale' => 'Membre Commission Électorale',
            'president_liste' => 'Président de liste',
        ];
    }

    public function index(Request $request): Response
    {
        $mandatId = $request->input('mandat_id');

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
        $activeMandat = Mandat::where('status', 'actif')->first();

        return Inertia::render('Roles/Create', [
            'users' => $users,
            'mandats' => $mandats,
            'activeMandatId' => $activeMandat?->id ?? '',
            'availableRoleTypes' => $this->availableRoleTypes(),
        ]);
    }

    public function store(StoreRoleRequest $request)
    {   
        Role::create($request->validated());

        return redirect()->route('roles.index')->with('success', 'Rôle attribué avec succès.');
    }

    // Lookup using composite primary keys
    public function edit($user_id, $mandat_id, $role_type): Response
    {
        $role = Role::where('user_id', $user_id)
            ->where('mandat_id', $mandat_id)
            ->where('role', $role_type)
            ->with(['user:id,nom,email,tel', 'mandat'])
            ->firstOrFail();

        $users = User::select('id', 'nom', 'email', 'tel')->get();
        $mandats = Mandat::all();

        return Inertia::render('Roles/Edit', [
            'role' => $role,
            'users' => $users,
            'mandats' => $mandats,
            'availableRoleTypes' => $this->availableRoleTypes(),
        ]);
    }

    public function update(Request $request, $user_id, $mandat_id, $role_type)
    {
        $roleRecord = Role::where('user_id', $user_id)
            ->where('mandat_id', $mandat_id)
            ->where('role', $role_type)
            ->firstOrFail();

        // 2. Validate that the NEW role is unique for this mandate
        $validated = $request->validate([
            'role' => [
                'required',
                'string',
                Rule::unique('roles', 'role')
                    ->where(fn ($q) => $q->where('mandat_id', $mandat_id))
                    ->ignoreModel($roleRecord),
            ],
        ], [
            'role.unique' => 'Ce rôle a déjà été attribué à un autre membre pour ce mandat.',
        ]);

        // 3. Perform query-based update (prevents Eloquent from using 'where id = null')
        Role::where('user_id', $user_id)
            ->where('mandat_id', $mandat_id)
            ->where('role', $role_type)
            ->update([
                'role' => $validated['role'],
            ]);

        return redirect()->route('roles.index')->with('success', 'Rôle modifié avec succès.');
    }

    public function destroy(Request $request)
    {
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