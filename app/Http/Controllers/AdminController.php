<?php

namespace App\Http\Controllers;

use App\Models\Annee;
use App\Models\Mandat;
use App\Models\Election;
use App\Models\ListeCandidat;
use Illuminate\Http\Request;
use Inertia\Inertia;


class AdminController extends Controller
{
    public function index(Request $request)
    {
        $tab = $request->query('tab', 'annees');
        $status = $request->input('status');
 
        // Each paginator gets its own page-name so tabs don't clobber each other
        $mandats = Mandat::with('annee')
            ->withCount('roles')
            ->when($status, fn ($query) => $query->where('status', $status))
            ->latest('id')
            ->paginate(10, ['*'], 'mandats_page')
            ->withQueryString();
 
        $annees = Annee::with('contribution')
            ->latest('id')
            ->paginate(10, ['*'], 'annees_page')
            ->withQueryString();
 
        // Was ->get(); now paginated so the tab badge can use `.total`
        $elections = Election::with('listesCandidats')
            ->latest()
            ->paginate(10, ['*'], 'elections_page')
            ->withQueryString();
 
        $activeAnnee = Annee::latest()->first();
 
        return Inertia::render('AdminPannel/Index', [
            'annees' => $annees,
            'mandats' => $mandats,
            'elections' => $elections,
            'activeAnnee' => $activeAnnee,
            'filters' => [
                'status' => $status,
            ],
            'activeTab' => $tab,
        ]);
    }
}