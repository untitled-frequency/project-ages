<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use App\Models\Annee;
use App\Models\Election;
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

        $reunions = Reunion::where('dateHeure', '>=', now())
            ->orderBy('dateHeure', 'asc')
            ->take(3)
            ->get()
            ->values();

        $activites = Activite::whereDate('date', '>=', now())
            ->orderBy('date', 'desc')
            ->take(2)
            ->get()
            ->reverse()
            ->values();

        $user = Auth::user();
        $idAnneeEnCour = Annee::max('id');

        $anneeEnCourFormatted = null;
        $anneeEnCour = Annee::with('contribution')->find($idAnneeEnCour);
        
        if ($anneeEnCour) {
            $startYear = Carbon::parse($anneeEnCour->dateDebut)->format('Y');
            $endYear   = Carbon::parse($anneeEnCour->dateFin)->format('Y');

            $anneeEnCourFormatted = "{$startYear}-{$endYear}"; 
        }

        $contributionConfig = $anneeEnCour?->contribution;
        $estMembreBureau = $user ? $user->roles()->exists() : false;

        $targetAmount = $estMembreBureau 
            ? ($contributionConfig?->montantMembreBureau ?? 0)
            : ($contributionConfig?->montantMembre ?? 0);

        $userPaies = [];
        if ($user && $anneeEnCour) {
            $userPaies = $user->paies()
                ->whereHas('contribution.annees', fn ($q) => $q->where('id', $anneeEnCour->id))
                ->orderBy('updated_at', 'desc')
                ->get();
        }

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
            'activites' => $activites,
            'anneeEnCour' => $anneeEnCourFormatted,
            'contributions' => $userPaies,
            'targetAmount' => $targetAmount,
            'election' => $election,
        ]);
    }
}