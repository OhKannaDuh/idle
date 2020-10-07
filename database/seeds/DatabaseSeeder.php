<?php

use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{


    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run(): void
    {
        $this->call([
            LocationSeeder::class,
            SkillSeeder::class,
            TreeSeeder::class,
        ]);
    }
}
