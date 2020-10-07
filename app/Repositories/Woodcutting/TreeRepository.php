<?php

namespace OhKannaDuh\Idle\Repositories\Woodcutting;

use Illuminate\Database\Eloquent\Collection;
use OhKannaDuh\Idle\Models\Auth\User;
use OhKannaDuh\Idle\Models\Woodcutting\Tree;

final class TreeRepository implements TreeRepositoryInterface
{


    /** @inheritDoc */
    public function getAll(): Collection
    {
        return Tree::all();
    }


    /** @inheritDoc */
    public function getById(string $identifier): Tree
    {
        return Tree::find($identifier);
    }


    /** @inheritDoc */
    public function create(array $data): Tree
    {
        if (array_key_exists("drops", $data) && is_array($data["drops"])) {
            $data["drops"] = json_encode($data["drops"]);
        }

        return Tree::create($data);
    }
}
