<?php

namespace OhKannaDuh\Idle\Providers;

use OhKannaDuh\Idle\Api\Api;
use OhKannaDuh\Idle\Api\ApiInterface;

final class ApiServiceProvider extends \Illuminate\Support\ServiceProvider
{


    /** @inheritDoc */
    public function register(): void
    {
        $this->app->bind(ApiInterface::class, Api::class);
    }
}
