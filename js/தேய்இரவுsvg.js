/** @format */


navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(pos) {
	var date = new Date().sunrise(pos.coords.latitude, pos.coords.longitude);
	let srt = SunRiseTime(date);
	document.querySelector(".srt").innerText = `${srt}`;
	document.querySelector(".சூரியஉதயம்").innerText = "Local Sunrise Time " + `${srt}`;
	
	document.getElementById("முதல்சாமம்தேய்இரவுஊண்").innerText = "Untill " + `${convertToStamp(srt, 762)}`;//42
	document.getElementById("முதல்சாமம்தேய்இரவுதுயில்").innerText = "Untill " + `${convertToStamp(srt, 780)}`;//18
	document.getElementById("முதல்சாமம்தேய்இரவுநடை").innerText = "Untill " + `${convertToStamp(srt, 822)}`;//42
	document.getElementById("முதல்சாமம்தேய்இரவுசாவு").innerText =  "Untill " + `${convertToStamp(srt, 846)}`;//24
	document.getElementById("முதல்சாமம்தேய்இரவுஅரசு").innerText =  "Untill " + `${convertToStamp(srt, 864)}`;//18
	
	
	
	document.getElementById("இரண்டாவதுசாமம்தேய்இரவுதுயில்").innerText = "Untill " + `${convertToStamp(srt, 882)}`;//18
	document.getElementById("இரண்டாவதுசாமம்தேய்இரவுநடை").innerText = "Untill " + `${convertToStamp(srt, 924)}`;//42
	document.getElementById("இரண்டாவதுசாமம்தேய்இரவுசாவு").innerText = "Untill " + `${convertToStamp(srt,  948)}`;//24
	document.getElementById("இரண்டாவதுசாமம்தேய்இரவுஅரசு").innerText = "Untill " + `${convertToStamp(srt, 966)}`;//18
   document.getElementById("இரண்டாவதுசாமம்தேய்இரவுஊண்").innerText = "Untill " + `${convertToStamp(srt, 1008)}`;//42
	
	
	

  document.getElementById("மூன்றாவதுசாமம்தேய்இரவுநடை").innerText = "Untill " + `${convertToStamp(srt, 1050)}`;//42
  document.getElementById("மூன்றாவதுசாமம்தேய்இரவுசாவு").innerText = "Untill " + `${convertToStamp(srt, 1074)}`;//24
  document.getElementById("மூன்றாவதுசாமம்தேய்இரவுஅரசு").innerText = "Untill " + `${convertToStamp(srt, 1092)}`;//18
  document.getElementById("மூன்றாவதுசாமம்தேய்இரவுஊண்").innerText = "Untill " + `${convertToStamp(srt, 1134)}`;//42
  document.getElementById("மூன்றாவதுசாமம்தேய்இரவுதுயில்").innerText = "Untill " + `${convertToStamp(srt, 1152)}`;//18	
	
	
   

   document.getElementById("நான்காவதுசாமம்தேய்இரவுசாவு").innerText = "Untill " + `${convertToStamp(srt, 1176)}`;//24
	document.getElementById("நான்காவதுசாமம்தேய்இரவுஅரசு").innerText = "Untill " + `${convertToStamp(srt, 1194)}`;//18
   document.getElementById("நான்காவதுசாமம்தேய்இரவுஊண்").innerText = "Untill " + `${convertToStamp(srt, 1236)}`;//42
   document.getElementById("நான்காவதுசாமம்தேய்இரவுதுயில்").innerText = "Untill " + `${convertToStamp(srt, 1254)}`;//18
	document.getElementById("நான்காவதுசாமம்தேய்இரவுநடை").innerText = "Untill " + `${convertToStamp(srt, 1296)}`;//42
	
	
	
	document.getElementById("ஐந்தாவதுசாமம்தேய்இரவுஅரசு").innerText = "Untill " + `${convertToStamp(srt, 1314)}`;//18
   document.getElementById("ஐந்தாவதுசாமம்தேய்இரவுஊண்").innerText = "Untill " + `${convertToStamp(srt, 1356)}`;//42
   document.getElementById("ஐந்தாவதுசாமம்தேய்இரவுதுயில்").innerText = "Untill " + `${convertToStamp(srt, 1374)}`;//18
   document.getElementById("ஐந்தாவதுசாமம்தேய்இரவுநடை").innerText = "Untill " + `${convertToStamp(srt, 1416)}`;//42
	document.getElementById("ஐந்தாவதுசாமம்தேய்இரவுசாவு").innerText = "Untill " + `${convertToStamp(srt, 1440)}`;//24
  

	
}

function SunRiseTime(date) {
	let str = date.toString();
	let sunRise = str.split(" ");
	return sunRise[4];
}
function convertToStamp(srmin, addmin) {
	let split = srmin.split(":");
	splith = split[0] * 60 * 60;
	splitm = split[1] * 60;
	var seconds = split[2];
	total = addmin + (splith + splitm) / 60;

	var calchours = Math.floor(total / 60) % 24 || 24 ;
	
	var calcminutes = total % 60;
	var hours = calchours.toString().padStart(2, "0");
	var minutes = calcminutes.toString().padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
}

Date.prototype.sunrise = function (latitude, longitude, zenith) {
	return this.sunriseSet(latitude, longitude, true, zenith);
};

Date.prototype.sunset = function (latitude, longitude, zenith) {
	return this.sunriseSet(latitude, longitude, false, zenith);
};

Date.prototype.sunriseSet = function (latitude, longitude, sunrise, zenith) {
	if (!zenith) {
		zenith = 90.8333;
	}

	var hoursFromMeridian = longitude / Date.DEGREES_PER_HOUR,
		dayOfYear = this.getDayOfYear(),
		approxTimeOfEventInDays,
		sunMeanAnomaly,
		sunTrueLongitude,
		ascension,
		rightAscension,
		lQuadrant,
		raQuadrant,
		sinDec,
		cosDec,
		localHourAngle,
		localHour,
		localMeanTime,
		time;

	if (sunrise) {
		approxTimeOfEventInDays = dayOfYear + (6 - hoursFromMeridian) / 24;
	} else {
		approxTimeOfEventInDays = dayOfYear + (18.0 - hoursFromMeridian) / 24;
	}

	sunMeanAnomaly = 0.9856 * approxTimeOfEventInDays - 3.289;

	sunTrueLongitude =
		sunMeanAnomaly +
		1.916 * Math.sinDeg(sunMeanAnomaly) +
		0.02 * Math.sinDeg(2 * sunMeanAnomaly) +
		282.634;
	sunTrueLongitude = Math.mod(sunTrueLongitude, 360);

	ascension = 0.91764 * Math.tanDeg(sunTrueLongitude);
	rightAscension = (360 / (2 * Math.PI)) * Math.atan(ascension);
	rightAscension = Math.mod(rightAscension, 360);

	lQuadrant = Math.floor(sunTrueLongitude / 90) * 90;
	raQuadrant = Math.floor(rightAscension / 90) * 90;
	rightAscension = rightAscension + (lQuadrant - raQuadrant);
	rightAscension /= Date.DEGREES_PER_HOUR;

	sinDec = 0.39782 * Math.sinDeg(sunTrueLongitude);
	cosDec = Math.cosDeg(Math.asinDeg(sinDec));
	cosLocalHourAngle =
		(Math.cosDeg(zenith) - sinDec * Math.sinDeg(latitude)) /
		(cosDec * Math.cosDeg(latitude));

	localHourAngle = Math.acosDeg(cosLocalHourAngle);

	if (sunrise) {
		localHourAngle = 360 - localHourAngle;
	}

	localHour = localHourAngle / Date.DEGREES_PER_HOUR;

	localMeanTime =
		localHour + rightAscension - 0.06571 * approxTimeOfEventInDays - 6.622;

	time = localMeanTime - longitude / Date.DEGREES_PER_HOUR;
	time = Math.mod(time, 24);

	var midnight = new Date(0);
	midnight.setUTCFullYear(this.getUTCFullYear());
	midnight.setUTCMonth(this.getUTCMonth());
	midnight.setUTCDate(this.getUTCDate());

	var milli = midnight.getTime() + time * 60 * 60 * 1000;

	return new Date(milli);
};

Date.DEGREES_PER_HOUR = 360 / 24;

// Utility functions

Date.prototype.getDayOfYear = function () {
	var onejan = new Date(this.getFullYear(), 0, 1);
	return Math.ceil((this - onejan) / 86400000);
};

Math.degToRad = function (num) {
	return (num * Math.PI) / 180;
};

Math.radToDeg = function (radians) {
	return (radians * 180.0) / Math.PI;
};

Math.sinDeg = function (deg) {
	return Math.sin((deg * 2.0 * Math.PI) / 360.0);
};

Math.acosDeg = function (x) {
	return (Math.acos(x) * 360.0) / (2 * Math.PI);
};

Math.asinDeg = function (x) {
	return (Math.asin(x) * 360.0) / (2 * Math.PI);
};

Math.tanDeg = function (deg) {
	return Math.tan((deg * 2.0 * Math.PI) / 360.0);
};

Math.cosDeg = function (deg) {
	return Math.cos((deg * 2.0 * Math.PI) / 360.0);
};

Math.mod = function (a, b) {
	var result = a % b;
	if (result < 0) {
		result += b;
	}
	return result;
};
