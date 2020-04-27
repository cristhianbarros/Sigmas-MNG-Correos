<?php

namespace App\Mail;

use App\Email;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class DefaultEmail extends Mailable
{
    use Queueable, SerializesModels;


    /**
     * The Email instance.
     *
     * @var Email
     */
    protected $email;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Email $email)
    {
        $this->email = $email;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $e = $this->from($this->email->from['email'], $this->email->from['name'])
                        ->subject($this->email->subject)
                        ->view('email.default')
                        ->with([ 'email' => $this->email ]);

        foreach ($this->email->attachments as $attachment) {
            $e->attachData(\base64_decode($attachment['content']), $attachment['name'], ['mime' => $attachment['filetype'] ]);
        }

        return $e;
    }
}
