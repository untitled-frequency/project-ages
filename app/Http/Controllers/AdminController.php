<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use App\Models\Mandat;
use App\Models\Election;
use App\Models\ListeCandidat;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        $query = Mandat::with('annee')->withCount('roles');

        $mandats = $query->latest('id')->paginate(10)->withQueryString();

        $annees = Annee::latest('id')->paginate(10)->withQueryString();

        $activeAnnee = Annee::latest()->first();
        return Inertia::render('AdminPannel/Index', [
            'annees' => $annees,
            'mandats' => Mandat::with('annee')->latest()->get(),
            'elections' => Election::with('listesCandidats')->latest()->get(),
            'activeAnnee' => $activeAnnee,
        ]);
    }
}