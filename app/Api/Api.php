<?php

namespace OhKannaDuh\Idle\Api;

use XIVAPI\Common\Environment;
use XIVAPI\XIVAPI;

final class Api implements ApiInterface
{
    public XIVAPI $api;


    /**
     * Initialise XIVAPI class.
     */
    public function __construct()
    {
        $this->api = new XIVAPI();
    }


    /** @inheritDoc */
    public function getKey(): string
    {
        return getenv(Environment::XIVAPI_KEY);
    }

    public function test()
    {
        return $this->api->character->search("Faye Dawnfall", "louisoix");
    }
}
