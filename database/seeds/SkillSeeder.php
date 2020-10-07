<?php

use Illuminate\Database\Seeder;
use OhKannaDuh\Idle\Models\Skill;

final class SkillSeeder extends Seeder
{


    /**
     * @return void
     */
    public function run(): void
    {
        Skill::create([
            "identifier" => "woodcutting",
            "name" => "Woodcutting",
        ]);
    }
}
