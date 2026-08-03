<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Annonce;
use App\Models\Reunion;
use App\Models\Activite;
use App\Models\Annee;
use App\Models\Contribution;
use App\Models\Election;
use App\Models\listeCandidat;
use App\Models\Mandat;
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

        User::factory()->create([
            'nom' => 'test',
            'email' => 'test@example.com',
            'password' => 'password',
            'tel' => '123456789',
        ]);

        User::factory(99)->create();

        
        Annonce::factory(10)->create();
        
        Reunion::factory(10)->create();
        
        
        Activite::factory(10)->create();
        
        Annee::factory()->create([
            "dateDebut" => "2024-10-01",
            "dateFin" => "2025-05-31",
        ]);
        
        
        Annee::factory()->create([
            "dateDebut" => "2025-10-01",
            "dateFin" => "2026-05-31",
        ]);

        Annee::factory()->create([
            "dateDebut" => "2026-10-01",
            "dateFin" => "2027-05-31",
        ]);
        */

        Contribution::factory(10)->create();
        
        Election::factory()->create([
            "debutDepot" => "2024-10-01",
            "finDepot" => "2024-10-01",
            "debutCampagne" => "2024-10-20",
            "finCampagne" => "2024-10-25",
            "debutVote" => "2024-10-26",
            "finVote" => "2024-10-26",
            "annee_id" => 1,
        ]);
        
        
        Election::factory()->create([
            "debutDepot" => "2025-10-01",
            "finDepot" => "2025-10-01",
            "debutCampagne" => "2025-10-20",
            "finCampagne" => "2025-10-25",
            "debutVote" => "2025-10-26",
            "finVote" => "2025-10-26",
            "annee_id" => 2,
        ]);
        
        Election::factory()->create([
            "debutDepot" => "2026-10-01",
            "finDepot" => "2026-10-01",
            "debutCampagne" => "2026-10-20",
            "finCampagne" => "2026-10-25",
            "debutVote" => "2026-10-26",
            "finVote" => "2026-10-26",
            "annee_id" => 3,
        ]);
        

        ListeCandidat::factory(25)->create();
        

        Mandat::factory()->create([
            "dateDebut" => "2024-10-01",
            "dateFin" => "2025-05-31",
            "status" => "inactif",
            "annee_id" => 1,
        ]);

        Mandat::factory()->create([
            "dateDebut" => "2025-10-01",
            "dateFin" => "2026-05-31",
            "status" => "inactif",
            "annee_id" => 2,
        ]);

        Mandat::factory()->create([
            "dateDebut" => "2026-10-01",
            "dateFin" => "2027-05-31",
            "status" => "actif",
            "annee_id" => 3,
        ]);
    
    }
}
