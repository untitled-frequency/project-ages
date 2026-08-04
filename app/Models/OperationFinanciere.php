<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OperationFinanciere extends Model
{
    /** @use HasFactory<\Database\Factories\OperationFinanciereFactory> */
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'motif',
        'montant',
        'date',
        'type',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
