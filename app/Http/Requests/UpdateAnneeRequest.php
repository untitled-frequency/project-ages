<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Annee;

class UpdateAnneeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $anneeId = $this->route('annee')?->id;

        return [
            'dateDebut' => ['required', 'date'],
            'dateFin' => ['required', 'date', 'after:dateDebut'],
            'status' => ['required', 'string', 'in:en cours,achevée'],
            'montantMembre' => ['required', 'numeric', 'min:0'],
            'montantMembreBureau' => ['required', 'numeric', 'min:0'],
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $anneeId = $this->route('annee')?->id;
            $dateDebut = $this->input('dateDebut');
            $dateFin = $this->input('dateFin');

            if ($dateDebut && $dateFin) {
                // Integrity Test: Check overlapping dates excluding current year
                $overlap = Annee::where('id', '!=', $anneeId)
                    ->where(function ($query) use ($dateDebut, $dateFin) {
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
