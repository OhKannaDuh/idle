<?php

namespace OhKannaDuh\Idle\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use OhKannaDuh\Idle\Models\Auth\User;

abstract class AuthorizedRequest extends FormRequest
{


    /**
     * Ensure a user is tied to this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return $this->getUser() !== null;
    }


    /** @return User */
    public function getUser(): User
    {
        return $this->user();
    }


    /** @return int */
    public function getUserId(): int
    {
        return $this->getUser()->getId();
    }


    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(): array
    {
        return [];
    }
}
