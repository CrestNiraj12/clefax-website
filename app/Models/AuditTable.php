<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AuditTable extends Model
{
    use HasFactory;

    protected $fillable = [
        'table_name',
        'action',
        'values',
        'status',
        'reason',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getValuesAttribute($data) {
        $arr = [];
        $valuesArr = array_filter(explode(",", $data));
        foreach($valuesArr as $s) {
            if (str_contains($s, ':')) {
                $vArr = explode(":", $s);           
                $arr[$vArr[0]] = $vArr[1];
            } else {
                $arr[array_key_last($arr)] += $s;
            }
           
        }
        return $arr;
    }
}
