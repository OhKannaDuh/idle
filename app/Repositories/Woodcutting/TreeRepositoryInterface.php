<?php

namespace OhKannaDuh\Idle\Repositories\Woodcutting;

use OhKannaDuh\Idle\Models\Woodcutting\Tree;
use OhKannaDuh\Idle\Repositories\RepositoryInterface;

interface TreeRepositoryInterface extends RepositoryInterface
{


    /**
     * Get a Tree by their ID.
     *
     * @param string $identifier
     *
     * @return Tree
     */
    public function getById(string $identifier): Tree;


    /**
     * Create a Tree with the supplied paramters.
     *
     * @param array $data
     *
     * @return Tree
     */
    public function create(array $data): Tree;
}
