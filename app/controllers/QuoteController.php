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
            'image' => (Input::has('image')) ? Input::get('image') : asset('res/stub.jpg')
        ]);

        // done
        return Response::json($quote);
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
            $sp = intval(Input::get('sp'));
        }
        
        return Response::json([
            'sp' => intval($sp)+10,
            'quotes' => Quote::orderBy('created_at', 'desc')->skip($sp)->take(10)->get()
        ]);
    }

    public function show($id) {
        $quote = Quote::findOrFail($id);
        return Response::json(
            $quote
        );
    }

}

