<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
            $table->jsonb('from');
            $table->text('subject');
            $table->text('html');
            $table->jsonb('attachments')->nullable();
            $table->jsonb('address');
            $table->jsonb('bcc')->nullable();
            $table->jsonb('cc')->nullable();
            $table->timestamp('date');
            $table->enum('state', ['send', 'no-send', 'queue']);
            $table->jsonb('errors')->nullable();
            $table->integer('template_id')->unsigned();
            $table->foreign('template_id')->references('id')->on('templates');
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
        Schema::dropIfExists('emails');
    }
}
