<?php

use Illuminate\Database\Seeder;
use OhKannaDuh\Idle\Models\Woodcutting\Tree;
use OhKannaDuh\Idle\Repositories\Woodcutting\TreeRepositoryInterface;

final class TreeSeeder extends Seeder
{


    /**
     * @param TreeRepositoryInterface $trees
     * @return void
     */
    public function run(TreeRepositoryInterface $trees): void
    {
        $trees->create([
            "identifier" => "normal",
            "name" => "Tree",
            "level" => 1,
            "exp" => 25,
            "drops" => [],
        ]);
    }
}
