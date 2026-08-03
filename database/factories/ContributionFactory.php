<?php

namespace Database\Factories;

use App\Models\Contribution;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contribution>
 */
class ContributionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "montant" => $this->faker->numberBetween(10000, 30000),
            "annee_id" => $this->faker->randomElement([1, 2, 3]),
            "dateContribution" => $this->faker->dateTimeBetween('-3 year', '+1 year')->format('Y-m-d'),
        ];
    }
}
