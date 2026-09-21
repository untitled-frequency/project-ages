<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembreListeCandidat extends Model
{
    use HasFactory;

    protected $fillable = [
        'liste_candidat_id',
        'user_id',
        'role',
        'election_id'
    ];

    public function listeCandidat()
    {
        return $this->belongsTo(ListeCandidat::class, 'liste_candidat_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}