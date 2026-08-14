<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mandat extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'dateDebut',
        'dateFin',
        'status',
        'annee_id',
    ];

    // Helper attribute for display in selects: "2025-09-01 au 2026-06-30"
    protected $appends = ['label'];

    public function getLabelAttribute(): string
    {
        return "Mandat ({$this->dateDebut} - {$this->dateFin})";
    }

    public function annee(): BelongsTo
    {
        return $this->belongsTo(Annee::class);
    }

    public function roles()
    {
        return $this->hasMany(Role::class);
    }
}