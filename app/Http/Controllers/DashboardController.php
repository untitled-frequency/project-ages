<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
<<<<<<< HEAD
=======
use App\Models\Activite;
>>>>>>> main
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
<<<<<<< HEAD
=======
    // app/Http/Controllers/DashboardController.php
>>>>>>> main
    public function index(): Response
    {
        $annonces = Annonce::orderBy('datePublication', 'desc')
            ->take(3)
            ->get()
            ->values();

<<<<<<< HEAD
        $reunions = Reunion::orderBy('dateHeure', 'desc')
            ->take(3)
            ->get()
            ->reverse()
=======
        $reunions = Reunion::where('dateHeure', '>=', now())
            ->orderBy('dateHeure', 'asc')
            ->take(3)
            ->get()
            ->values();

        $activites = Activite::whereDate('datePublication', '>=', now())
            ->orderBy('datePublication', 'desc')
            ->take(3)
            ->get()
>>>>>>> main
            ->values();

        return Inertia::render('Dashboard', [
            'annonces' => $annonces,
            'reunions' => $reunions,
<<<<<<< HEAD
=======
            'activites' => $activites,
>>>>>>> main
        ]);
    }
}
