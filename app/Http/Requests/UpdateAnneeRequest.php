<?php

namespace App\Http\Requests;

use App\Models\Annee;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAnneeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    private function currentAnnee(): ?Annee
    {
        $param = $this->route('annee');

        if ($param instanceof Annee) {
            return $param;
        }

        return $param ? Annee::find($param) : null;
    }

    public function rules(): array
    {
        return [
            'dateDebut'           => ['required', 'date_format:Y-m-d'],
            'dateFin'             => ['required', 'date_format:Y-m-d', 'after:dateDebut'],
            'status'              => ['sometimes', 'required', 'in:en cours,achevée'],
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if ($validator->errors()->isNotEmpty()) {
                return;
            }

            $current = $this->currentAnnee();
            $newStart = $this->input('dateDebut');
            $newEnd   = $this->input('dateFin');

            // Overlap check excluding current model ID
            $conflict = Annee::query()
                ->when($current, fn ($q) => $q->whereKeyNot($current->getKey()))
                ->whereDate('dateDebut', '<=', $newEnd)
                ->whereDate('dateFin', '>=', $newStart)
                ->first();

            if ($conflict) {
                $range = Carbon::parse($conflict->dateDebut)->format('d/m/Y')
                    . ' - ' . Carbon::parse($conflict->dateFin)->format('d/m/Y');

                $validator->errors()->add(
                    'dateDebut',
                    "Chevauchement avec l'année #{$conflict->id} ({$range}) - année modifiée : #" . ($current?->id ?? 'aucune')
                );
            }
        });
    }
}