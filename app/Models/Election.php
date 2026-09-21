<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'dateDebutDepot',
        'dateFinDepot',
        'dateDebutCampagne',
        'dateFinCampagne',
        'dateOuvertureVote',
        'dateClotureVote',
        'annee_id',
    ];

    protected $casts = [
        'dateDebutDepot' => 'datetime',
        'dateFinDepot' => 'datetime',
        'dateDebutCampagne' => 'datetime',
        'dateFinCampagne' => 'datetime',
        'dateOuvertureVote' => 'datetime',
        'dateClotureVote' => 'datetime',
    ];

    public function getStatutDynamiqueAttribute(): string
    {
        $now = now();
        return match (true) {
            $now->lt($this->dateDebutDepot)    => 'À venir',
            $now->lt($this->dateDebutCampagne) => 'Dépôt des candidatures',
            $now->lt($this->dateOuvertureVote) => 'Campagne électorale',
            $now->lte($this->dateClotureVote)  => 'Vote en cours',
            default                            => 'Clôturé',
        };
    }

    public function isVoteOpen(): bool
    {
        return now()->between($this->dateOuvertureVote, $this->dateClotureVote);
    }

    public function annee()
    {
        return $this->belongsTo(Annee::class, 'annee_id');
    }

    public function listesCandidats()
    {
        return $this->hasMany(ListeCandidat::class, 'election_id');
    }

    public function emergements()
    {
        return $this->hasMany(Emergement::class, 'election_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'election_id');
    }
}