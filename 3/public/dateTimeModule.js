// dateTimeModule.js

// Function to format the current time
function getCurrentTime() {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();
    let day_night = "AM";

    if (hours > 12) {
        day_night = "PM";
        hours = hours - 12;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    if (hours < 10) {
        hours = "0" + hours;
    }

    return `${hours}:${minutes}:${seconds} ${day_night}`;
}

// Function to format the current date
function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; //Months are zero-based
    const year = currentDate.getFullYear();

    let formattedDay = day < 10 ? "0" + day : day;
    let formattedMonth = month < 10 ? "0" + month : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
}

module.exports = { getCurrentTime, getCurrentDate };
