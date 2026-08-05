<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activite extends Model
{
    /** @use HasFactory<\Database\Factories\ActiviteFactory> */
    use HasFactory;

    protected $fillable = [
        'titre',
        'date',
        'description',
        'lieu',
        'budget',
        'responsable_id',
    ];

    public $timestamps = false;

    public function responsable()
    {
        return $this->belongsTo(User::class, 'responsable_id');
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'participe', 'activite_id', 'user_id');
    }
}
