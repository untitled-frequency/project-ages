<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paie extends Model
{
    protected $fillable = [
        'montant',
        'date',
        'user_id',
    ];

    public $timestamps = false;
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function contribution()
    {
        return $this->belongsTo(Contribution::class);
    }
}
