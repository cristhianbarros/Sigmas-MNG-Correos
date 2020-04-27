<?php

namespace App\Http\Resources\Email;

use Illuminate\Http\Resources\Json\JsonResource;

class EmailResource extends JsonResource
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

        return [
            'id' => (int) $this->id,
            'from' => $this->from,
            'subject' => (string) $this->subject,
            'date' => (array) $jsonDate,
            'attachments' => $this->when(count($this->attachments) > 0, true),
        ];
    }
}
