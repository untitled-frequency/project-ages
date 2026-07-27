<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
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

        return Inertia::render('Dashboard', [
            'annonces' => $annonces,
        ]);
    }
}
