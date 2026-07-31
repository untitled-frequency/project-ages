<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use App\Models\Paie;
use App\Models\Annee;
use App\Models\Election;
use App\Models\ListeCandidat;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
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

<<<<<<< HEAD
        $reunions = Reunion::orderBy('dateHeure', 'desc')
            ->take(3)
=======
        $reunions = Reunion::where('dateHeure', '>=', now())
            ->orderBy('dateHeure', 'asc')
            ->take(3)
            ->get()
            ->values();

        $activites = Activite::whereDate('datePublication', '>=', now())
            ->orderBy('datePublication', 'desc')
            ->take(2)
>>>>>>> main
            ->get()
            ->reverse()
            ->values();
        
        

        $idAnneeEnCour = Annee::max('id');

        $anneeEnCourFormatted = null;
        $anneeEnCour = Annee::find($idAnneeEnCour);
        
        if ($anneeEnCour) {
            $startYear = Carbon::parse($anneeEnCour->dateDebut)->format('Y');
            $endYear   = Carbon::parse($anneeEnCour->dateFin)->format('Y');

            $anneeEnCourFormatted = "{$startYear}-{$endYear}"; 
        }
            
        $contributions = Paie::where('user_id', Auth::id())
            ->whereHas('contribution', function ($query) use ($idAnneeEnCour) {
                $query->where('annee_id', $idAnneeEnCour);
            })
            ->with('contribution')
            ->orderBy('datePaiement', 'desc')
            ->get()
            ->values();

        // --- Election Retrieval for Current Year ---
        $election = Election::where('annee_id', $idAnneeEnCour)
            ->with('listesCandidats')
            ->first();

        if ($election) {
            $now = now();
            $debutVote = Carbon::parse($election->debutVote);
            $finVote   = Carbon::parse($election->finVote);

            if ($now->lt($debutVote)) {
                $election->status = 'À venir'; 
            } elseif ($now->between($debutVote, $finVote)) {
                $election->status = 'En cours';  
            } else {
                $election->status = 'Terminé';   
            }
        }
        
        return Inertia::render('Dashboard', [
            'annonces' => $annonces,
            'reunions' => $reunions,
<<<<<<< HEAD
=======
            'activites' => $activites,
            'anneeEnCour' => $anneeEnCourFormatted,
            'contributions' => $contributions,
            'election' => $election,
>>>>>>> main
        ]);
    }
}
