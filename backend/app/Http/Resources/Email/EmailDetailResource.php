<?php

namespace App\Http\Resources\Email;

use Illuminate\Http\Resources\Json\JsonResource;

class EmailDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $date = new \DateTime($this->date);
        $jsonDate = [ 'date' => $date->format('d M'), 'hour' => $date->format('h:i a') ];
        $template = [ 'id' => $this->template_id ];

        $array_attachments = [];
        foreach ($this->attachments as $attachment) {
            $array_attachments[] = [ 'id' => $attachment['id'], 'name' => $attachment['name'], 'filetype' => $attachment['filetype'] ];
        }

        return [
            'id' => (int) $this->id,
            'from' => $this->from,
            'subject' => (string) $this->subject,
            'attachments' => $this->attachments,
            'address' => $this->address,
            'bcc' => $this->bcc,
            'cc' => $this->cc,
            'date' => (array) $jsonDate,
            'errors' => $this->errors,
            'state' => $this->state,
            'template' => (array) $template
        ];
    }
}
