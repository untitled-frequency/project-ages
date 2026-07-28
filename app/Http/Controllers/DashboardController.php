<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use App\Models\Paie;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    // app/Http/Controllers/DashboardController.php
    public function index(): Response
    {
        $annonces = Annonce::orderBy('datePublication', 'desc')
            ->take(3)
            ->get()
            ->values();

        $reunions = Reunion::where('dateHeure', '>=', now())
            ->orderBy('dateHeure', 'asc')
            ->take(3)
            ->get()
            ->values();

        $activites = Activite::whereDate('datePublication', '>=', now())
            ->orderBy('datePublication', 'desc')
            ->take(3)
            ->get()
            ->values();

        $contributions = Paie::where('user_id', Auth::id())
            ->orderBy('datePaiement', 'desc')
            ->take(3)
            ->get()
            ->values();

        return Inertia::render('Dashboard', [
            'annonces' => $annonces,
            'reunions' => $reunions,
            'activites' => $activites,
            'contributions' => $contributions,
        ]);
    }
}
