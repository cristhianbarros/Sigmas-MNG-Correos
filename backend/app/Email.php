<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Email extends Model
{
    const SEND_STATUS = 'send';
    const NO_SEND_STATUS = 'no-send';
    const QUEUE_STATUS = 'queue';

    public $resource = EmailResource::class;

    protected $fillable = [
        'from',
        'subject',
        'attachments',
        'html',
        'address',
        'bcc',
        'cc',
        'date',
        'state',
        'errors',
        'template_id'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'from' => 'array',
        'address' => 'array',
        'attachments' => 'array',
        'bcc' => 'array',
        'cc' => 'array',
        'errors' => 'array'
    ];

    public function template() {
        return $this->belongsTo(Template::class);
    }
}
