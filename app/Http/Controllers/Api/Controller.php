<?php

namespace OhKannaDuh\Idle\Http\Controllers\Api;

abstract class Controller extends \OhKannaDuh\Idle\Http\Controllers\Controller
{


    /** @inheritDoc */
    protected function initialise(): void
    {
        $this->middleware("auth");
    }
}
