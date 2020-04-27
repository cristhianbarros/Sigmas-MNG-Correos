<?php

namespace App\Jobs;

use App\Email;
use App\Template;
use App\Mail\DefaultEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Mail;

class QueueEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $mail;

    /**
     * The parameter $email
     *
     * @var Email
     */
    protected $email;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 1;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Email $email, $mail = null)
    {
        $this->email = $email;
        $this->mail = $mail;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $from = $this->email->from;
        $subject = $this->email->subject;
        $content = $this->email->html;
        $address = $this->email->address;

        $bcc = $this->email->bcc;
        $cc = $this->email->cc;
        $attachments = $this->email->attachments;

        $errors = array();
        $to = \is_null($this->mail) ? $this->email->address : $this->mail;

        $this->email->state = Email::SEND_STATUS;
        $this->email->date = \date('Y-m-d H:i:s');
        $this->email->save();

        Mail::to($to)
            ->cc($cc)
            ->bcc($bcc)
            ->send(new DefaultEmail($this->email));

    }

    /**
     * The job failed to process.
     *
     * @param  Exception  $exception
     * @return void
     */
    public function failed(\Throwable $e)
    {
        $message = $e->getMessage();

        if( $e instanceof \Swift_TransportException) {
            $message = 'Connection could not be established with host [Se produjo un error durante el intento de conexión ya que la parte conectada no respondió adecuadame
nte tras un periodo de tiempo, o bien se produjo un error en la conexión establecida ya que el host conectado no ha podido responder.';
        }

        $errors = $this->email->errors;
        $errors[] = [ 'message' => $message];

        $this->email->state = Email::NO_SEND_STATUS;
        $this->email->errors = $errors;
        $this->email->date = \date('Y-m-d H:i:s');
        $this->email->save();
    }
}
