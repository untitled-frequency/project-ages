<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use App\Models\Annee;
use App\Models\Paie;
use App\Models\Contribution;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        /*
        User::factory()->create([
            'nom' => 'teufack',
            'email' => 'teufack@gmail.com',
            'password' => 'password',
            'tel' => '123456789',
        ]);

        User::factory(10)->create();

        Annonce::factory(10)->create();

        Reunion::factory(10)->create(); 
        
        Activite::factory(10)->create();
        
        
        
        Annee::factory()->create([
            "dateDebut" => "2025-10-01",
            "dateFin" => "2026-05-31",
        ]);
        
        
        Annee::factory()->create([
            "dateDebut" => "2026-10-01",
            "dateFin" => "2027-05-31",
        ]);

        
        Paie::factory()->create([
            "user_id" => 1,
            "contribution_id" => 2,
            "datePaiement" => "2026-01-01",
        ]);

        Paie::factory()->create([
            "user_id" => 1,
            "contribution_id" => 5,
            "datePaiement" => "2027-01-01",
        ]);
        

        User::factory()->create([
            'nom' => 'test',
            'email' => 'test@example.com',
            'password' => 'password',
            'tel' => '123456789',
        ]);
        */

        //Contribution::factory(10)->create();
    }
}
