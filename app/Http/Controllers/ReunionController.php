<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

use App\Models\Reunion;
use App\Models\User;
use App\Models\Annonce;
use App\Models\Assiste;

class ReunionController extends Controller
{
    
    public function index()
    {
        $reunions = Reunion::query()
            ->with([
                'user:id,nom',
                'participants:id,nom',
            ])
            ->paginate(7)
            ->withQueryString();
        
        $reunionsFuture = Reunion::query()
            ->where('dateHeure', '>', now())
            ->get();

        $users = User::all();

        return Inertia::render('Reunion/Index', [
            'reunions' => $reunions,
            'reunionsFuture' => $reunionsFuture,
            'users' => $users,
        ]);
    }

    
    public function create()
    {
        return Inertia::render('Reunion/Create');
    }

    public function show(Reunion $reunion)
    {
        $reunion->load('user:id,nom', 'participants:id,nom');

        return Inertia::render('Reunion/Show', [
            'reunion' => $reunion,
        ]);
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'ordreJour' => 'required',
            'dateHeure' => 'required',
            'lieu' => 'required',
        ]);

        $validated['compteRendu'] = 'En attente';

        $reunion = Reunion::create($validated);

        return redirect()->route('communique.index', ['tab' => 'reunions']);
    }

    
    public function edit(Reunion $reunion)
    {
        $users = User::all();
        $participantIds = $reunion->participants()->pluck('users.id')->toArray();

        return Inertia::render('Reunion/Edit', [
            'reunion' => $reunion,
            'users' => $users,
            'participantIds' => $participantIds,
        ]);
    }

    
    public function update(Request $request, Reunion $reunion)
    {
        $validated = $request->validate([
            'ordreJour'    => 'required|string|max:255',
            'dateHeure'    => 'required|date',
            'lieu'         => 'nullable|string|max:255',
            'compteRendu'  => 'nullable|string',
            'participants'   => 'array',
            'participants.*' => 'exists:users,id',
        ]);

    $reunion->update([
        'ordreJour'   => $validated['ordreJour'],
        'dateHeure'   => $validated['dateHeure'],
        'lieu'        => $validated['lieu'],
        'compteRendu' => $validated['compteRendu'] ?? 'En attente',
    ]);

    $participants = $request->input('participants', []);
    $reunion->participants()->sync($participants);

    return redirect()->route('communique.index', ['tab' => 'reunions']);
    }

    public function destroy(string $id)
    {
        $reunion = Reunion::findOrFail($id);
        $reunion->delete();

        
        return redirect()->route('communique.index', ['tab' => 'reunions']);
    }
}
