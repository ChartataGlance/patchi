/** @format */
//ஊண்-30
//நடை-36
//அரசு-48
//துயில்-18
//சாவு-12

navigator.geolocation.getCurrentPosition(showPosition);
function showPosition(pos) {
	var date = new Date().sunrise(pos.coords.latitude, pos.coords.longitude);
	let srt = SunRiseTime(date);
	document.getElementById("சூரியஉதயம்").innerText = "Local Sunrise Time " + `${srt}`;

	document.getElementById("முதல்சாமம்வளர்பகல்ஊண்").innerText = "Untill " + `${convertToStamp(srt, 30)}`;
	document.getElementById("முதல்சாமம்வளர்பகல்நடை").innerText =  "Untill " + `${convertToStamp(srt, 66)}`;
	document.getElementById("முதல்சாமம்வளர்பகல்அரசு").innerText =  "Untill " + `${convertToStamp(srt, 114)}`;
	document.getElementById("முதல்சாமம்வளர்பகல்துயில்").innerText = "Untill " + `${convertToStamp(srt, 132)}`;
	document.getElementById("முதல்சாமம்வளர்பகல்சாவு").innerText =   "Untill " + `${convertToStamp(srt, 144)}`;

	document.getElementById("இரண்டாவதுசாமம்வளர்பகல்நடை").innerText = "Untill " + `${convertToStamp(srt, 180)}`;
	document.getElementById("இரண்டாவதுசாமம்வளர்பகல்அரசு").innerText = "Untill " + `${convertToStamp(srt, 228)}`;
	document.getElementById("இரண்டாவதுசாமம்வளர்பகல்துயில்").innerText = "Untill " + `${convertToStamp(srt, 246)}`;
	document.getElementById("இரண்டாவதுசாமம்வளர்பகல்சாவு").innerText = "Untill " + `${convertToStamp(srt, 258)}`;
	document.getElementById("இரண்டாவதுசாமம்வளர்பகல்ஊண்").innerText = "Untill " + `${convertToStamp(srt, 288)}`;

	
	document.getElementById("மூன்றாவதுசாமம்வளர்பகல்அரசு").innerText = "Untill " + `${convertToStamp(srt, 336)}`;
	document.getElementById("மூன்றாவதுசாமம்வளர்பகல்துயில்").innerText = "Untill " + `${convertToStamp(srt, 354)}`;
	document.getElementById("மூன்றாவதுசாமம்வளர்பகல்சாவு").innerText = "Untill " + `${convertToStamp(srt, 366)}`;
	document.getElementById("மூன்றாவதுசாமம்வளர்பகல்ஊண்").innerText = "Untill " + `${convertToStamp(srt, 396)}`;
   document.getElementById("மூன்றாவதுசாமம்வளர்பகல்நடை").innerText = "Untill " + `${convertToStamp(srt, 432)}`;


	
	document.getElementById("நான்காவதுசாமம்வளர்பகல்துயில்").innerText = "Untill " + `${convertToStamp(srt, 450)}`;
	document.getElementById("நான்காவதுசாமம்வளர்பகல்சாவு").innerText = "Untill " + `${convertToStamp(srt, 462)}`;
	document.getElementById("நான்காவதுசாமம்வளர்பகல்ஊண்").innerText = "Untill " + `${convertToStamp(srt, 492)}`;
   document.getElementById("நான்காவதுசாமம்வளர்பகல்நடை").innerText = "Untill " + `${convertToStamp(srt, 528)}`;
	document.getElementById("நான்காவதுசாமம்வளர்பகல்அரசு").innerText = "Untill " + `${convertToStamp(srt, 576)}`;

	
	document.getElementById("ஐந்தாவதுசாமம்வளர்பகல்சாவு").innerText = "Untill " + `${convertToStamp(srt, 588)}`;
	document.getElementById("ஐந்தாவதுசாமம்வளர்பகல்ஊண்").innerText = "Untill " + `${convertToStamp(srt, 618)}`;
   document.getElementById("ஐந்தாவதுசாமம்வளர்பகல்நடை").innerText = "Untill " + `${convertToStamp(srt, 654)}`;
	document.getElementById("ஐந்தாவதுசாமம்வளர்பகல்அரசு").innerText = "Untill " + `${convertToStamp(srt, 702)}`;
	document.getElementById("ஐந்தாவதுசாமம்வளர்பகல்துயில்").innerText = "Untill " + `${convertToStamp(srt, 720)}`;
	

	
	
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

	var calchours = Math.floor(total / 60) % 24 || 24;
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
