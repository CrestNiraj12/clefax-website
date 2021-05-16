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
        \App\Models\Role::create([
            'title' => 'Admin',
        ]);

        \App\Models\Role::create([
            'title' => 'Trader',
        ]);

        \App\Models\Role::create([
            'title' => 'User',
        ]);
    }
}
