<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('fullname');
            $table->string('email')->unique();
            $table->string('role');
            $table->string('street_no')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->string('dob')->nullable();
            $table->string('gender')->nullable();
            $table->string('paypal_email')->nullable();
            $table->string('stripe_email')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('deleted_at')->nullable();
            $table->string('password');
            $table->unsignedBigInteger('sq_id');
            $table->string('sq_answer');
            $table->foreign('sq_id')->references('id')->on('security_questions');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
