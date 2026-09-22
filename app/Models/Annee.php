<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Annee extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'dateDebut',
        'dateFin',
        'status',
        'contribution_id',
    ];

    public function contribution()
    {
        return $this->belongsTo(Contribution::class);
    }
}
