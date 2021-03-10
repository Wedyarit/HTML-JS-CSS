function clock() {
    let time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds(),
        day = time.getDate(),
        month = time.getMonth(),
        year = time.getFullYear();

    document.querySelectorAll('.clock')[0].innerHTML = + harold(day) + "." + harold(month) + "." + harold(year) + " " + harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);

    function harold(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }
}
