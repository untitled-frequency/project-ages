<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\User;
use App\Models\Annee;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CommuniqueController extends Controller
{
    
    public function index()
    {   
        $users = User::all();

        $reunions = Reunion::query()
            ->with([
                'user:id,nom',
                'participants:id,nom',
            ])
            ->paginate(7)
            ->withQueryString();

        return Inertia::render('Comminique/Index', [
            'users' => $users,
            'reunions' => $reunions,
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
