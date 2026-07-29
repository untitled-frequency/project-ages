<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('liste_candidats', function (Blueprint $table) {
            $table->id();
            $table->string("nom");
            $table->text("programme");
            $table->string("slogan");
            $table->text("membres");
            $table->foreignId("election_id")->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('liste_candidats');
    }
};
