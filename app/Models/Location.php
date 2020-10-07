<?php

namespace OhKannaDuh\Idle\Models;

use Illuminate\Database\Eloquent\Model;

final class Location extends Model
{
    /** @inheritDoc */
    protected $fillable = ["identifier", "name"];


    /**
     * @return string
     */
    public function getIdentifier(): string
    {
        return $this->getAttribute("identifier");
    }


    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->getAttribute("name");
    }
}
