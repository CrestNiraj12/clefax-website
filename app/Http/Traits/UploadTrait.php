<?php 

namespace App\Http\Traits;

use Carbon\Carbon;

trait UploadTrait {
    public function imageUpload($image, $folderName) {
        $imageName = time().'.'.$image->extension(); 
        $date = Carbon::now();
        $year = $date->format('Y');
        $monthName = $date->format('F');
        $image->move(public_path("storage/$folderName/$monthName$year"), $imageName);
        return "$folderName/$monthName$year/$imageName";
    }
}
