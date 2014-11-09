<?php

use Illuminate\Database\Eloquent\SoftDeletingTrait;

class Quote extends Eloquent {

    use SoftDeletingTrait;

    protected $dates = ['deleted_at'];

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'ol_quotes';

    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];

    protected $fillable = ['quote', 'author', 'image'];

}
