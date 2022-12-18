<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of AstroCalendar
 * Astrological utility. Allows you to do the calculation of the lunar day, sidereal time, Julian Date, to receive the rising sign, the medium target. 
 * @author v.raskin
 */
class VsAstroCalendar {
    //put your code here
    /**
     *  Earth inclination
     */
    const E = 23.265;
    
    /**
     *
     * @var int 
     */
    public $year, $month, $day, $hour, $min, $sec, $timeZone, $geoWidth = 0, $geoHeight = 0;
    
    /**
     * Array latin zodiac names
     * @var array 
     */
    public $hashNames = array(
        'Ari mesh', 'Tau rish', 'Gem mith', 'Cnc kada', 'Leo shim', 'Vir kinn', 'Lib', 'Sco',  'Sgr',  'Cap mak', 'Aqr kum', 'Psc12',
    );
    
    
    /**
     * @param int $time
     * @return \VsAstroCalendar 
     */
    public static function instance($time = NULL) {
        if(is_null($time)){
             $time = time();
        }
        
        $inst = new VsAstroCalendar();
        $inst->year = (int)date('Y', $time);
        $inst->month = (int)date('m', $time);
        $inst->day = (int)date('d', $time);
        $inst->hour = (int)date('G', $time);
        $inst->min = (int)date('i', $time);
        $inst->sec = (int)date('s', $time);
        $inst->timeZone = -(int)date('O', $time) / 100;
        return $inst;
    }

    /**
     * Get current date
     * @param string template {Y}.{M}.{D} {H}:{MN}:{S} {Z}
     * @return string 
     */
    public function getDate($format = NULL) {
        if(is_null($format)){
            $format = '{Y}.{M}.{D} {H}:{MN}:{S} {Z}';
        }
        $ar = array(
            '{Y}'=>$this->year,
            '{M}'=>self::addZero($this->month),
            '{D}'=>self::addZero($this->day),
            '{H}'=>self::addZero($this->hour),
            '{MN}'=>self::addZero($this->min),
            '{S}'=>self::addZero($this->sec),
            '{Z}'=>$this->timeZone,
        );
        
        return str_replace(array_keys($ar), array_values($ar), $format);
    }
    
    /**
     *
     * @param numeric $i
     * @return String 
     */
    public static function addZero($i) {
        return ($i < 10) ? '0'.$i : ''.$i;
    }
    
    /**
     *
     * @param float $deg
     * @param int $fl
     * @return string 
     */
    public function getLatinNameByDeg($deg, $fl = 3) {
        $key = (int)($deg / 30);
        return $this->hashNames[$key].' '.round(fmod($deg, 30), $fl).'&deg;';
    }

    /**
     *
     * @param int $year
     * @param int $month
     * @param int $day
     * @param int $hour
     * @param int $min
     * @param int $sec
     * @param int $timeZone 
     */
    public function init($year, $month, $day, $hour, $min, $sec, $timeZone) {
        $this->year = $year;
        $this->month = $month;
        $this->day = $day;
        $this->hour = $hour;
        $this->min = $min;
        $this->sec = $sec;
        $this->timeZone = $timeZone;
    }
    
    
    
    /**
     * Get moon day 
     * @return int 
     */
    public function getMoonDay() { 
        $monthH=$this->month;
        $yearH=$this->year;
        if ($this->month <= 2) {
            $monthH = $this->month + 12;
            $yearH = $this->year - 1;
        }
        $eq=floor($yearH/100);
        $eq1=floor($eq/3)+floor($eq/4)+6-$eq;
        $eq2=(round(($yearH/$eq -floor($yearH/$eq))*209) + $monthH + $eq1 + $this->day)/ 30;  
        $moonday=round (($eq2-floor($eq2))*30 + 1)+1;
        return $moonday; 
    }
    
    /**
     * Get moon day. Formula Hervi
     * @return int 
     */
     public function getMoonDayByHervi() { 
         $md = $this->year / 19;
         $md = round(($md - floor($md)) * 209);  
	 $md += $this->month;
	 if($this->month == 1 || $this->month == 2) $md += 12; 
	 $md = ($md - 3 + $this->day) / 30;
	return round(($md - floor($md)) * 30) + 1;
     } 
     
     
    /**
     * Get star time
     * @return int 
     */
    public function getStarTime() { 
        $T = ($this->getJTime() - 2415020) / 36525;		 
	return 6.6460656 + 2400.051262 * $T + 0.00002581 * $T;    
    }    
     
    /**
     * Converts a Gregorian date to Julian Day Count
     * Analog gregoriantojd
     * @return int 
     */
    public function getJTime() {
       	$y1 = ($this->month == 1 || $this->month == 2) ? $this->year -1 : $this->year;
	$m1 = ($this->month == 1 || $this->month == 2) ? $this->month + 12 : $this->month;
	if($this->month > 2) {
            $m1 = $this->month;
	    $y1 = $this->year;
	}
	$A = $B = $C = $D = 0;
	if(($y1 > 1582) || ($y1 == 1582 && $m1 > 10) || ($y1 == 1582 && $m1 == 10 && $this->day >= 15)) {
	    $A = (int)($y1 / 100);
	    $B = 2 - $A + (int)($A / 4);
	}  
	$C = (int)(365.25 * $y1);
	$D = (int)(30.6001 * ($m1 + 1));	 
		
	return $B + $C + $D + $this->day + 1720994.5;     
    }
    
    /**
     * Get world time
     * @return string 
     */
    public function getWorldTime() {
         $h = ($this->hour + $this->timeZone);
	 if($h > 23) $h -= 24;
	 if($h < 0) $h += 24;
	 return $h + ':' + $this->min;
    }
    
    /**
     * Method calculate ASC, MC, DSC, IC.
     * @param float $geoWidth
     * @param float $geoHeight
     * @return array array float array($ASC, $MC, $DSC, $IC);
     */
     public function getAsc($geoWidth = NULL, $geoHeight = NULL) {
         if(is_null($geoWidth)) {
             $geoWidth = $this->geoWidth; 
         }
         if(is_null($geoHeight)) {
             $geoHeight = $this->geoHeight; 
         }
         $star = $this->getStarTime();
        
         $star = fmod($star, 24); 
         $starH = (int)($star);		
	 $starM = 60 * ($star - $starH);
	 $starS = (int)(60 * ($starM - (int)($starM)));
         $starM = (int)$starM;
          
         $LST =  $starH + $this->timeZone + $this->hour + ($geoHeight / 15) + (($starM + $this->min) / 60) + (($starS + $this->sec) / 3600);         
     
         
         if($LST > 23) $LST -= 24;
	 if($LST < 0) $LST += 24;
	   
	 $RAMC = $LST * 15;
	 $RAMCcos = cos($RAMC * M_PI / 180); 
	 $Ecos = cos(self::E * M_PI / 180);
         
         $MC = atan( tan($RAMC * M_PI / 180) / $Ecos) *  180 / M_PI;
	 if($MC < 0) $MC += 360;
         
         $ASC = atan( $RAMCcos /  - ((tan($geoWidth * M_PI / 180) *  sin(self::E * M_PI / 180))
							      + (sin($RAMC * M_PI / 180) * $Ecos))) * 180 / M_PI;
         
         //fix
         if($RAMCcos < 0 && $ASC < 0) { $ASC += 360; }									
	 else if($ASC < 0){ $ASC += 180;   } 
	 else if($RAMCcos < 0) { $ASC += 180;}
         
         $DSC = ($ASC > 180) ? $ASC - 180 : $ASC + 180;         
         if(($DSC >= 0 && $DSC <= 180) ) {
		if($MC < $DSC) $MC += 180;
		else if($MC > $ASC) $MC -= 180; 
	 }
         $IC = ($MC > 180) ? $MC - 180 : $MC + 180; 
         
         return array($ASC, $MC, $DSC, $IC);
     }
}

 
 

 
?>
