<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ListeCandidat extends Model
{
    /** @use HasFactory<\Database\Factories\ListeCandidatFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "nom",
        "programme",
        "slogan",
        "membres",
        "election_id",
    ];

    public function election()
    {
        return $this->belongsTo(Election::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
