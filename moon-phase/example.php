<?php

include "moon.php";
$moon = new moon();

// if ($moon->set("date", date("2022-12-9"))) 
// {

//     $phase_name = $moon->get_phase_name();
//     $phase_at = $moon->get_phase_percent();
//     $visibility = $moon->get_visibility();
//     $next_newmoon = $moon->get_next_newmoon();
//     $next_fullmoon = $moon->get_next_fullmoon();

//     echo 

//     <<<MOON_INFO
// phase name: {$phase_name} <br>
// phase percentage: {$phase_at}% <br>
// visibility: {$visibility}% <br>
// next new moon: {$next_newmoon} <br>
// next full moon: {$next_fullmoon} <br>
// MOON_INFO;
// }

 if($moon->set("date", date("2022-12-9"))) 
 {
    echo  $moon->get_phase_name();
} ; 