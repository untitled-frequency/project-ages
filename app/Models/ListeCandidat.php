<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListeCandidat extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'programme',
        'slogan',
        'election_id',
        'status',
    ];

    public function election()
    {
        return $this->belongsTo(Election::class, 'election_id');
    }

    public function membres()
    {
        return $this->hasMany(MembreListeCandidat::class, 'liste_candidat_id');
    }

    public function votes()
    {
        return $this->hasMany(Vote::class, 'liste_candidat_id');
    }
}