<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMandatRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dateDebut' => ['required', 'date'],
            'dateFin' => ['nullable', 'date', 'after_or_equal:dateDebut'],
            'status' => ['required', 'string', 'in:actif,cloture,inactif'],
            'annee_id' => ['required', 'exists:annees,id'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'dateDebut.required' => 'La date de début est obligatoire.',
            'dateFin.after_or_equal' => 'La date de fin doit être égale ou postérieure à la date de début.',
            'status.required' => 'Le statut du mandat est obligatoire.',
            'annee_id.required' => 'L\'année académique est obligatoire.',
            'annee_id.exists' => 'L\'année académique sélectionnée n\'existe pas.',
        ];
    }
}
