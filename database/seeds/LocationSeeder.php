<?php

use Illuminate\Database\Seeder;
use OhKannaDuh\Idle\Models\Location;

final class LocationSeeder extends Seeder
{


    /**
     * @return void
     */
    public function run(): void
    {
        Location::create([
            "identifier" => "oakbridge",
            "name" => "Oakbridge"
        ]);
    }
}
