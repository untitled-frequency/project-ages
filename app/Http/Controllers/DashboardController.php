<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $annonces = Annonce::orderBy('datePublication', 'desc')
            ->take(3)
            ->get()
            ->values();

        $reunions = Reunion::orderBy('dateHeure', 'desc')
            ->take(3)
            ->get()
            ->reverse()
            ->values();
        
        

        return Inertia::render('Dashboard', [
            'annonces' => $annonces,
            'reunions' => $reunions,
        ]);
    }
}
