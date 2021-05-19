<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\UserRole::create([
            'title' => 'Admin',
        ]);

        \App\Models\UserRole::create([
            'title' => 'Trader',
        ]);

        \App\Models\UserRole::create([
            'title' => 'User',
        ]);
    }
}
