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
            $table->string("prenom");
            $table->string("email");
            $table->string("tel");
            $table->string("adresse");
            $table->string("profession");
            $table->string("fonction");
            $table->string("niveau");
            $table->string("specialite");
            $table->string("experience");
            $table->string("competence");
            $table->string("langue");
            $table->string("langue");
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
