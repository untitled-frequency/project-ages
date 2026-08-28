<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'user_id' => 'required|exists:users,id',
            'mandat_id' => 'required|exists:mandats,id',
            'role' => [
                'required',
                'string',
                Rule::unique('roles')->where(function ($query) {
                    return $query->where('user_id', $this->user_id)
                                 ->where('mandat_id', $this->mandat_id);
                })
            ]
        ];
    }

    public function messages(): array
    {
        return [
            'role.unique' => 'Ce membre possède déjà ce rôle pour ce mandat.',
        ];
    }
}
