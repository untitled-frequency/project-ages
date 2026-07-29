<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Election extends Model
{
    /** @use HasFactory<\Database\Factories\ElectionFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'debutDepot',
        'finDepot',
        'debutCampagne',
        'finCampagne',
        'debutVote',
        'finVote',
        'annee_id',
    ];

    public function annee()
    {
        return $this->belongsTo(Annee::class);
    }

    public function listesCandidats()
    {
        return $this->hasMany(listeCandidat::class);
    }
}
