<?php

namespace OhKannaDuh\Idle\Models\Woodcutting;

use Illuminate\Database\Eloquent\Model;

final class Tree extends Model
{
    /** @inheritDoc */
    protected $fillable = ["identifier", "name", "level", "drops"];


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


    /**
     * @return int
     */
    public function getLevel(): int
    {
        return $this->getAttribute("level");
    }


    /**
     * @return array
     */
    public function getDrops(): array
    {
        return $this->getAttribute("drops");
    }
}
