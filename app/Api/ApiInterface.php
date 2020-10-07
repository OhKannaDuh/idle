<?php

namespace OhKannaDuh\Idle\Api;

interface ApiInterface
{


    /**
     * Gets the api key.
     *
     * @return string
     */
    public function getKey(): string;

    public function test();
}
