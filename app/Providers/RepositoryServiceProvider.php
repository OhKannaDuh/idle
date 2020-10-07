<?php

namespace OhKannaDuh\Idle\Providers;

use OhKannaDuh\Idle\Repositories\Woodcutting\TreeRepository;
use OhKannaDuh\Idle\Repositories\Woodcutting\TreeRepositoryInterface;

final class RepositoryServiceProvider extends \Illuminate\Support\ServiceProvider
{


    /** @inheritDoc */
    public function register(): void
    {
        $this->app->bind(TreeRepositoryInterface::class, TreeRepository::class);
    }
}
