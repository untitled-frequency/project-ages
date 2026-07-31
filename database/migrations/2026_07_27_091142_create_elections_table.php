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
        Schema::create('elections', function (Blueprint $table) {
            $table->id();
            $table->date("debutDepot");
            $table->date("finDepot");
            $table->date("debutCampagne");
            $table->date("finCampagne");
            $table->dateTime("debutVote");
            $table->dateTime("finVote");
            $table->foreignId("annee_id")->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('elections');
    }
};
