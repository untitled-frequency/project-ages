<?php

namespace Database\Factories;

use App\Models\Annonce;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Annonce>
 */
class AnnonceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titre' => $this->faker->sentence(4),
            'datePublication' => $this->faker->date(),
            'contenu' => $this->faker->paragraphs(3, true),
            'type' => $this->faker->randomElement(['communiqué', 'activité', 'rappel_cotisation', 'election', 'convocation']),
            'user_id' => $this->faker->numberBetween(1, 10),
        ];
    }
}
