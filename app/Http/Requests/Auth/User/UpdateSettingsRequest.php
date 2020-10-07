<?php

namespace OhKannaDuh\Idle\Http\Requests\Auth\User;

use OhKannaDuh\Idle\Http\Requests\AuthorizedRequest;
use OhKannaDuh\Idle\Models\Currency;
use OhKannaDuh\Idle\Repositories\CurrencyRepositoryInterface;

final class UpdateSettingsRequest extends AuthorizedRequest
{
    /** @var CurrencyRepositoryInterface */
    private CurrencyRepositoryInterface $currencies;


    /**
     * @param CurrencyRepositoryInterface $currencies
     */
    public function __construct(CurrencyRepositoryInterface $currencies)
    {
        $this->currencies = $currencies;
    }


    /** @inheritDoc */
    public function rules(): array
    {
        return [
            "currency_iso" => ["required","exists:currencies,iso"],
        ];
    }


    /** @return string */
    public function getCurrencyIso(): string
    {
        return $this->get("currency_iso");
    }


    /** @return Currency */
    public function getCurrency(): Currency
    {
        return $this->currencies->getByIso($this->getCurrencyIso());
    }
}
