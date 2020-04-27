<?php

namespace App\Http\Controllers\Email;

use App\Email;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Email\EmailDetailResource;

class EmailController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $state = $request->query('state');
        $per_page = $request->has('per_page') ? (int) $request->per_page : 25;

        if($request->gas('all')) {
            $emails = Email::where('state', '=', $state)->orderby('date', 'DESC');
        } else {
            $emails = Email::where('state', '=', $state)->orderB('date', 'DESC')->paginate($per_page);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function show(Email $email)
    {
        return EmailDetailResource($email);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Email $email)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Email  $email
     * @return \Illuminate\Http\Response
     */
    public function destroy(Email $email)
    {
        $email->destroy();

        return EmailDetailResource($email);
    }
}
