<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
                Rule::unique('roles', 'user_id')->where(function ($query) {
                    return $query->where('mandat_id', $this->mandat_id);
                }),
            ],
            'mandat_id' => 'required|exists:mandats,id',
            'role' => [
                'required',
                'string',
                Rule::unique('roles', 'role')->where(function ($query) {
                    return $query->where('mandat_id', $this->mandat_id);
                }),
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.unique' => 'Ce membre possède déjà un rôle attribué pour ce mandat.',
            'role.unique' => 'Ce rôle a déjà été attribué à un autre membre pour ce mandat.',
        ];
    }
}