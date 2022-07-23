
const timeElement = document.querySelector(".time");
const dateElement = document.querySelector(".date");

/**
 * @param {Date} date
 */
function formateTime(date) {
	var sunRise = document.getElementById("myTime").value;
	const hours = date.getUTCHours() ;
	const minutes = date.getUTCMinutes();
	const seconds = date.getUTCSeconds();
	
   

	return `UTC ${hours}:
	            ${minutes.toString().padStart(2, "0")}
		         ${seconds.toString().padStart(2, "0")}
	`;
}

/**
 * @param {Date} date
 */

function formateDate(date) {
	const DAYS = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"Septembar",
		"Octobar",
		"November",
		"December",
	];

	return `${DAYS[date.getDay()]} , ${
		MONTHS[date.getMonth()]
	} ${date.getDate()}  ${date.getFullYear()}`;
}

setInterval(() => {
	const now = new Date();

	timeElement.textContent = formateTime(now);
	dateElement.textContent = formateDate(now);
}, 100);


function myFunction() {
	var x = document.getElementById("myTime").value;
	document.getElementById("demo").innerHTML = x;
}

myFunction()
