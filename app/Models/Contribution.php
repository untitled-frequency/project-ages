<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contribution extends Model
{
    /** @use HasFactory<\Database\Factories\ContributionFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        "montant",
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'paies', 'contribution_id', 'user_id');
    }
}
