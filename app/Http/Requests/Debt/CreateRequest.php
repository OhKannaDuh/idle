<?php

namespace OhKannaDuh\Idle\Http\Requests\Debt;

use Illuminate\Contracts\Auth\Guard;
use Illuminate\Foundation\Http\FormRequest;

final class CreateRequest extends FormRequest
{


    /**
     * @param Guard $guard
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }


    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            "value" => ["required", "numeric", "not_in:0"],
            "date" => ["required", "date_format:Y-m-d"],
        ];
    }
}
