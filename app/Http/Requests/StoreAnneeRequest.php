<?php

// app/Http/Requests/StoreAnneeRequest.php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Annee;

class StoreAnneeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'dateDebut' => ['required', 'date'],
            'dateFin' => ['required', 'date', 'after:dateDebut'],
            'montantMembre' => ['required', 'numeric', 'min:0'],
            'montantMembreBureau' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $dateDebut = $this->input('dateDebut');
            $dateFin = $this->input('dateFin');

            if ($dateDebut && $dateFin) {
                // Integrity Test: Check for overlapping dates with existing years
                $overlap = Annee::where(function ($query) use ($dateDebut, $dateFin) {
                    $query->whereBetween('dateDebut', [$dateDebut, $dateFin])
                        ->orWhereBetween('dateFin', [$dateDebut, $dateFin])
                        ->orWhere(function ($q) use ($dateDebut, $dateFin) {
                            $q->where('dateDebut', '<=', $dateDebut)
                              ->where('dateFin', '>=', $dateFin);
                        });
                })->exists();

                if ($overlap) {
                    $validator->errors()->add('dateDebut', 'Les dates choisies chevauchent une année académique existante.');
                }
            }
        });
    }
}