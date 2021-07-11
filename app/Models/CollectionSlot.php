<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CollectionSlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'times',
        'days'
    ];

    public function getTimesAttribute($value)
    {
        $times = explode(',', $value);
        $timesArr = array_map(function ($t) {return trim($t);}, $times);
        $formattedTimes = str_pad(($timesArr[0] > 12 ? ($timesArr[0] - 12) : $timesArr[0]), 2, '0', STR_PAD_LEFT) . ':00' . ($timesArr[0] > 12 ? 'PM' : 'AM') . ' - ' . str_pad(($timesArr[1] > 12 ? ($timesArr[1] - 12) : $timesArr[1]), 2, '0', STR_PAD_LEFT) .':00' . ($timesArr[1] > 12 ? 'PM' : 'AM'); 
        return $formattedTimes;
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
