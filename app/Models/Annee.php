<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annee extends Model
{
    /** @use HasFactory<\Database\Factories\AnneeFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "dateDebut",
        "dateFin",
    ];
}
