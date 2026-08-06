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
            $table->foreignId('annee_id')->constrained('annees')->cascadeOnDelete();
            $table->string('title')->default('Election du bureau de l\'AGES');
            $table->dateTime('dateDebutDepot');
            $table->dateTime('dateFinDepot');
            $table->dateTime('dateDebutCampagne');
            $table->dateTime('dateFinCampagne');
            $table->dateTime('dateOuvertureVote');
            $table->dateTime('dateClotureVote');
            $table->timestamps();
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
