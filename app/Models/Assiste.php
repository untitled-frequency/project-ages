<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assiste extends Model
{
    protected $fillable = [
        'reunion_id',
        'user_id',
        'presence',
    ];

    public function reunion()
    {
        return $this->belongsTo(Reunion::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
