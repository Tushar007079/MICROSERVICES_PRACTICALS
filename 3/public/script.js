
setInterval(() => {
    const time = document.querySelector(".display #time");
    const dateDisplay = document.querySelector(".display #date");
    let currentdate = new Date();

    // Time
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let seconds = currentdate.getSeconds();
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
    time.textContent = hours + ":" + minutes + ":" + seconds + " " + day_night;

    // Date
    let day = currentdate.getDate();
    let month = currentdate.getMonth() + 1; //Months are zero-based
    let year = currentdate.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    dateDisplay.textContent = day + "/" + month + "/" + year;
}, 1000);