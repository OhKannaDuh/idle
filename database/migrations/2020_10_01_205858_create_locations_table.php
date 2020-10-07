<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

final class CreateLocationsTable extends Migration
{


    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create("locations", function (Blueprint $table) {
            $table->string("identifier")->primary();
            $table->string("name");
            $table->timestamps();
        });
    }
}
