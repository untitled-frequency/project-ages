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
            $table->foreignId('election_id')->constrained()->cascadeOnDelete();
            $table->string('nom');
            $table->text('programme')->nullable();
            $table->string('slogan')->nullable();
            $table->unique(['election_id', 'nom']);
            $table->string('status'); //brouillon, soumise, validee, rejetee
            $table->timestamps();
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
