<?php

namespace App\Http\Controllers;

use App\Models\Election;
use App\Models\Emergement;
use App\Models\Vote;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class VoteController extends Controller
{
    public function store(Request $request, Election $election)
    {
        $user = Auth::user();
        $now = Carbon::now();

        // 1. Verify election timeline
        if (!$election->isVoteOpen()) {
            return back()->withErrors(['liste_candidat_id' => "Le scrutin n'est pas ouvert actuellement."]);
        }

        // 2. Validate selected list belongs to this election
        $validated = $request->validate([
            'liste_candidat_id' => [
                'required',
                'exists:liste_candidats,id',
            ],
        ]);

        try {
            DB::transaction(function () use ($election, $user, $validated) {
                // Prevent race conditions / double voting
                $alreadyVoted = Emergement::where('election_id', $election->id)
                    ->where('user_id', $user->id)
                    ->lockForUpdate()
                    ->exists();

                if ($alreadyVoted) {
                    throw new \Exception('Vous avez déjà participé à ce scrutin.');
                }

                // Record participation in Voter Ledger
                Emergement::create([
                    'election_id'   => $election->id,
                    'user_id'       => $user->id,
                    'dateHeureVote' => now(),
                ]);

                // Record isolated ballot choice
                Vote::create([
                    'election_id'       => $election->id,
                    'liste_candidat_id' => $validated['liste_candidat_id'],
                ]);
            });

            return back()->with('success', 'Votre vote a été enregistré avec succès.');

        } catch (\Exception $e) {
            return back()->withErrors(['liste_candidat_id' => $e->getMessage()]);
        }
    }
}