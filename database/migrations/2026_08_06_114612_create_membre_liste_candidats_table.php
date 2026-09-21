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
        Schema::create('membre_liste_candidats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('election_id');
            $table->foreignId('liste_candidat_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('role');
            $table->unique(['election_id', 'user_id']);
            $table->unique(['liste_candidat_id', 'role']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('membre_liste_candidats');
    }
};
