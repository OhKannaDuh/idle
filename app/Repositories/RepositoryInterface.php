<?php

namespace OhKannaDuh\Idle\Repositories;

use Illuminate\Database\Eloquent\Collection;

interface RepositoryInterface
{


    /**
     * Gets all of a model.
     *
     * @return Collection
     */
    public function getAll(): Collection;
}
