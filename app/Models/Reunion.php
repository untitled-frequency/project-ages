<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reunion extends Model
{
    /** @use HasFactory<\Database\Factories\ReunionFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'ordreJour',
        'dateHeure',
        'lieu',
        'compteRendu',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function participants()
    {
        return $this->belongsToMany(User::class, 'assiste', 'reunion_id', 'user_id');
    }
}
