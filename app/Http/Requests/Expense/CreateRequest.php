<?php

namespace OhKannaDuh\Idle\Http\Requests\Expense;

use Carbon\Carbon;
use OhKannaDuh\Idle\Http\Requests\AuthorizedRequest;

final class CreateRequest extends AuthorizedRequest
{


    /** @inheritDoc */
    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:255"],
            "category" => ["required", "exists:categories,id"],
            "value" => ["required", "numeric", "not_in:0"],
            "date" => ["required", "date_format:Y-m-d"],
            "time" => ["required", "date_format:H:i"],
        ];
    }


    /** @return string */
    public function getName(): string
    {
        return $this->get("name");
    }


    /** @return int */
    public function getCategoryId(): int
    {
        return $this->get("category");
    }


    /** @return float */
    public function getValue(): float
    {
        return $this->get("value");
    }


    /** @return string */
    private function getDate(): string
    {
        return $this->get("date");
    }


    /** @return string */
    private function getTime(): string
    {
        return $this->get("time");
    }


    /** @return Carbon */
    public function getCreatedAt(): Carbon
    {
        return Carbon::parse("{$this->getDate()}T{$this->getTime()}");
    }
}
