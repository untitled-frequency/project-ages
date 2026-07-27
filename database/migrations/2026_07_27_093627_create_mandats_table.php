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
        Schema::create('mandats', function (Blueprint $table) {
            $table->id();
            $table->date("dateDebut");
            $table->date("dateFin");
            $table->foreignId("annee_id")->constrained("annees_academique");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mandats');
    }
};
