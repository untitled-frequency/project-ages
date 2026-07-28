<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use App\Models\Paie;
use App\Models\Annee;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
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

        $idAnneeEnCour = Annee::max('id');

        $anneeEnCour = Annee::find($idAnneeEnCour);
        if ($anneeEnCour) {
            $startYear = Carbon::parse($anneeEnCour->dateDebut)->format('Y');
            $endYear   = Carbon::parse($anneeEnCour->dateFin)->format('Y');

            $anneeEnCour = "{$startYear}-{$endYear}"; 
        }
            
        $contributions = Paie::where('user_id', Auth::id())
            ->whereHas('contribution', function ($query) use ($idAnneeEnCour) {
                $query->where('annee_id', $idAnneeEnCour);
            })
            ->with('contribution')
            ->orderBy('datePaiement', 'desc')
            ->get()
            ->values();

        return Inertia::render('Dashboard', [
            'annonces' => $annonces,
            'reunions' => $reunions,
            'activites' => $activites,
            'anneeEnCour' => $anneeEnCour,
            'contributions' => $contributions,
        ]);
    }
}
