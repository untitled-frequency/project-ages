<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    protected $fillable = [
        'election_id',
        'liste_candidat_id',
    ];

    public function election()
    {
        return $this->belongsTo(Election::class);
    }

    public function listeCandidat()
    {
        return $this->belongsTo(ListeCandidat::class);
    }
}
