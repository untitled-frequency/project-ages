<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnonceController extends Controller
{
    public function index(Request $request)
    {
        $selectedOption = $request->input('option');

        $annonce = Annonce::query()
            ->with('user:id,nom')
            ->when($selectedOption, fn($q) => $q->where('type', $selectedOption))
            ->orderBy('datePublication', 'desc')
            ->paginate(10)
            ->withQueryString();
        

        return Inertia::render('Annonce/Index', [
            'annonces' => $annonce,
            'selectedOption' => $selectedOption,
        ]);
    }

    public function create()
    {
        return Inertia::render('Annonce/Create');
    }

    public function store(Request $request)
    {
        
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
        $annonce = Annonce::findOrFail($id);
        $annonce->delete();

        return redirect()->route('annonces.index');
    }
}
