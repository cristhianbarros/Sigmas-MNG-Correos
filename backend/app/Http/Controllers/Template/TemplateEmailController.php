<?php

namespace App\Http\Controllers\Template;

use Throwable;
use App\Email;
use App\Template;
use App\Jobs\QueueEmail;
use App\Http\Controllers\Controller;
use App\Http\Resources\Email\EmailResource;
use Illuminate\Http\Request;

class TemplateEmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function index(Template $template)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Template  $template
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Template $template)
    {
        $request->validate([
            'emails' => 'required',
        ]);

        $emails = $request->input('emails');
        $emailsCollection = collect();

        $array_attachments = [];
        foreach ($emails as $email) {
            $from = $email['from'];
            $subject = $email['subject'];
            $content = $email['html'];
            $address = $email['address'];

            $bcc = isset($email['bcc']) && !\is_null($email['bcc']) ? $email['bcc'] : [];
            $cc = isset($email['cc']) && !\is_null($email['cc']) ? $email['cc'] : [];
            $attachments = isset($email['attachments']) && !\is_null($email['attachments']) ? $email['attachments'] : [];


            $errors = array();
            if(count($array_attachments) == 0) {
                foreach ($attachments as $attachment) {
                    try {
                        $getContent = \file_get_contents($attachment['file']);
                        $pathInfo = \pathinfo($attachment['file']);
                        $date = new \DateTime();

                        \array_push($array_attachments, [ 'id' => \base64_encode($date->format('Y-m-d H:i:s').$pathInfo['basename']), 'name' => $pathInfo['basename'], 'extension' => $pathInfo['extension'],'filetype' => mime_content_type($attachment['file']), 'server_path' => $attachment['file'], 'content' => \base64_encode($getContent)]);
                    } catch (Throwable $e) {
                        $errors[] = [ 'message' => $e->getMessage()];
                    }
                }
            }

            foreach ($address as $mail) {

                $date = new \DateTime();

                $c = new Email();
                $c->from = $from;
                $c->subject = $subject;
                $c->html = $content;
                $c->attachments = $array_attachments;
                $c->address = $address;
                $c->bcc = $bcc;
                $c->cc = $cc;
                $c->date = \date('Y-m-d H:i:s');
                $c->state = Email::QUEUE_STATUS;
                $c->errors = $errors;
                $c->template_id = $template->id;
                $c->save();

                QueueEmail::dispatch($c, $mail['email']);

                $emailsCollection->push($c);
            }
        }

        return EmailResource::collection($emailsCollection);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Template  $template
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template, Email $email)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Template  $template
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template, Email $email)
    {
        $from = $email->from;
        $subject = $email->subject;
        $content = $email->html;
        $address =$email->address;

        $bcc = $email->bcc;
        $cc = $email->cc;
        $attachments = $email->attachments;
        $errors = $email->errors;
        $args = ['content' => $content, 'from' => $from, 'subject' => $subject, 'attachmentsFiles' => $attachments];

        if($email->state != Email::QUEUE_STATUS) {

            $c = new Email();
            $c->from = $from;
            $c->subject = $subject;
            $c->html = $content;
            $c->attachments = $attachments;
            $c->address = $address;
            $c->bcc = $bcc;
            $c->cc = $cc;
            $c->date = \date('Y-m-d H:i:s');
            $c->state = Email::QUEUE_STATUS;
            $c->errors = $errors;
            $c->template_id = $template->id;
            $c->save();

            QueueEmail::dispatch($c);
        } else if ($email->state == Email::QUEUE_STATUS) {
            QueueEmail::dispatch($email);
        }

        return response()->json(['message' => ['message'=> 'El correo ha sido reenviado con exito.', 'code' => 200 ]], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Template  $template
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function destroy(Template $template, Email $email)
    {
        //
    }
}
