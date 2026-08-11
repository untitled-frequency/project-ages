<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $userId = $this->route('user')->id; // Gets user ID from route binding

        return [
            'nom'      => 'required|string|max:255',
            'email'    => ['required', 'email', Rule::unique('users', 'email')->ignore($userId)],
            'tel'      => ['required', 'string', 'max:9', 'min:9', Rule::unique('users', 'tel')->ignore($userId)],
            'password' => 'nullable|string|min:8',
        ];
    }
}
