<?php

namespace App\Http\Controllers\Template;

use App\Template;
use Illuminate\Http\Request;
use App\Http\Resources\TemplateResource;
use App\Http\Controllers\Controller;

class TemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $per_page = $request->has('per_page') ? (int) $request->per_page : 25;

        if(request()->has('all')){
            $templates = Template::all();
        } else {
            $templates = Template::paginate($per_page);
        }

        return TemplateResource::collection($templates);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'description' => 'nullable',
            'styles' => 'required',
            'footer' => 'required'
        ]);

        $template = Template::create($data);


        return new TemplateResource($template);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Templates  $templates
     * @return \Illuminate\Http\Response
     */
    public function show(Template $template)
    {
        return new TemplateResource($template);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Templates  $templates
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Template $template)
    {

        $request->validate([
            'styles' => 'required',
            'footer' => 'required'
        ]);

        if($request->has('description')) {
            $template->description = $request->description;
        }

        if($request->has('styles')) {
            $template->styles = $request->styles;
        }

        if($request->has('footer')) {
            $template->footer = $request->footer;
        }

        if(!$template->isDirty()) {
            // return $this->errorResponse('Por favor modifique los campos styles o footer.',422);
        }

        $template->save();
        return new TemplateResource($template);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Templates  $templates
     * @return \Illuminate\Http\Response
     */
    public function destroy(Template $template)
    {
        $template->delete();
        return new TemplateResource($template);
    }
}
