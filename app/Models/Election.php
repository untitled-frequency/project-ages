<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    /** @use HasFactory<\Database\Factories\ElectionFactory> */
    use HasFactory;

    protected $fillable = [
        'dateDebutDepot',
        'dateFinDepot',
        'dateDebutCampagne',
        'dateFinCampagne',
        'dateOuvertureVote',
        'dateClotureVote',
        'annee_id',
    ];

    public function annee()
    {
        return $this->belongsTo(Annee::class, 'annee_id');
    }

    public function listesCandidats()
    {
        return $this->hasMany(listeCandidat::class, 'election_id');
    }
}
