<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

final class CreateTreesTable extends Migration
{


    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create("trees", function (Blueprint $table) {
            $table->string("identifier")->primary();
            $table->string("name");
            $table->unsignedInteger("level");
            $table->json("drops");
            $table->timestamps();
        });
    }
}
