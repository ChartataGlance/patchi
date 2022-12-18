<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

require_once 'VsAstroCalendar.php';

$astroCalendar = VsAstroCalendar::instance(); 
//set date
$astroCalendar->init(1978,7,13,12,8,1,-4);
echo 'Date: '.$astroCalendar->getDate();
echo '<br/>';
echo 'getMoonDay '.$astroCalendar->getMoonDay().' | '; 
echo 'getMoonDayByHervi '.$astroCalendar->getMoonDayByHervi().'';

echo '<br/>';
echo 'getStarTime '.$astroCalendar->getStarTime();
echo ' getJTime '.$astroCalendar->getJTime();
echo '<br/>';
list($ASC, $MC, $DSC, $IC) = $astroCalendar->getAsc(52.0, 40.0);
echo 'ASC '.$astroCalendar->getLatinNameByDeg($ASC).', MC '.$astroCalendar->getLatinNameByDeg($MC).', DSC '.$astroCalendar->getLatinNameByDeg($DSC).', IC '.$astroCalendar->getLatinNameByDeg($IC);
?>
