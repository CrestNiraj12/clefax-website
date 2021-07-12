<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('images');
            $table->longText('description');
            $table->longText('allergy_information');
            $table->decimal('price');
            $table->decimal('discount', 5)->default(0);
            $table->integer('qty');
            $table->longText('tags')->nullable();
            $table->integer('max_order');
            $table->string('unit')->default('pc');
            $table->unsignedBigInteger('shop_id');
            $table->unsignedBigInteger('category_id');
            $table->foreign('shop_id')->references('id')->on('shops');
            $table->foreign('category_id')->references('id')->on('categories');
            $table->timestamp('deleted_at')->nullable();
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
        Schema::dropIfExists('products');
    }
}
