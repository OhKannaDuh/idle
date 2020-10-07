<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

final class CreateSkillsTable extends Migration
{


    /**
     * @return void
     */
    public function up(): void
    {
        Schema::create("skills", function (Blueprint $table) {
            $table->string("identifier")->primary();
            $table->string("name");
            $table->timestamps();
        });
    }
}
