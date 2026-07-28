<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Annonce;
use App\Models\Reunion;
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

        User::factory()->create([
            'nom' => 'teufack',
            'email' => 'teufack@gmail.com',
            'password' => 'password',
            'tel' => '123456789',
        ]);

        User::factory(10)->create();

        Annonce::factory(10)->create();
        
        Reunion::factory(10)->create();
    }
}
