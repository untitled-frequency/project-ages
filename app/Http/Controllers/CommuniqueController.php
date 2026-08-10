<?php

namespace App\Http\Controllers;

use App\Models\Annonce;
use App\Models\Activite;
use App\Models\Reunion;
use App\Models\User;
use App\Models\Annee;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommuniqueController extends Controller
{
    
    public function index(Request $request)
    {   
        $tab = $request->query('tab', 'annonces');

        $users = User::select('id', 'nom', 'email')->get();

        $search = $request->input('search');

        $idEnCours = Annee::max('id');
        $dateDebut = Annee::where('id', $idEnCours)->value('dateDebut');
        $dateFin = Annee::where('id', $idEnCours)->value('dateFin');

        $reunions = Reunion::query()
            ->whereBetween('dateHeure', [$dateDebut, $dateFin])
            ->with(['user:id,nom', 'participants:id,nom'])
            ->orderBy('dateHeure', 'desc')
            ->paginate(6, ['*'], 'reunions_page')
            ->withQueryString();

        $activites = Activite::query()
            ->with('responsable:id,nom')
            ->orderBy('date', 'desc')
            ->paginate(6, ['*'], 'activites_page')
            ->withQueryString();

        $annonces = Annonce::query()
            ->when($search, function ($query) use ($search) {
                $query->where('titre', 'like', "%{$search}%")
                    ->orWhere('contenu', 'like', "%{$search}%");
            })
            ->with(['user:id,nom'])
            ->whereBetween('datePublication', [$dateDebut, $dateFin])
            ->orderBy('datePublication', 'desc')
            ->paginate(6, ['*'], 'annonces_page')
            ->withQueryString();

        
        return Inertia::render('Comminique/Index', [
            'users' => $users,
            'reunions' => $reunions,
            'activites' => $activites,
            'annonces' => $annonces,
            'activeTab' => $tab,
        ]);
    }
}
