<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participe extends Model
{
    protected $fillable = [
        'activite_id',
        'user_id',
    ];
}
