<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\ListeCandidat;
use App\Models\Annee;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ElectionController extends Controller
{
    public function index()
    {
        return Inertia::render('Election/Index');
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
