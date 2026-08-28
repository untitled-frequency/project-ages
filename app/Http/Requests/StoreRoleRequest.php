<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
                Rule::unique('roles')->where(function ($query) {
                    return $query->where('mandat_id', $this->mandat_id);
                }),
            ],
            'mandat_id' => ['required', 'exists:mandats,id'],
            'role' => ['required', 'string'],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.unique' => 'Cet utilisateur possède déjà un rôle pour ce mandat.',
            'user_id.required' => 'L\'utilisateur est obligatoire.',
            'mandat_id.required' => 'Le mandat est obligatoire.',
            'role.required' => 'Le rôle est obligatoire.',
        ];
    }
}
