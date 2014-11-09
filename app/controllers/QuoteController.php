<?php

class QuoteController extends \BaseController {

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function store()
    {
        // validate input
        if (!Input::has('quote')) {
            return Response::make('Bad Request', 400);
        }

        // write records
        $quote = Quote::create([
            'quote' => Input::get('quote'),
            'author' => (Input::has('author')) ? Input::get('author') : 'John Doe',
            'image' => (Input::has('image')) ? Input::get('image') : asset('res/stub.png')
        ]);

        // done
        return Response::make($quote);
    }


    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        if (!Input::has('sp')) {
            $sp = 0;
        } else {
            $sp = intval(Input::get('sp')) * 10;
        }
        
        return Response::json([
            'sp' => $sp+10,
            'quotes' => Quote::skip($sp)->take(10)->orderBy('created_at', 'desc')->get()
        ]);
    }

}
