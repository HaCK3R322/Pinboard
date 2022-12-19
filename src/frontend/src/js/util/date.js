function getFormattedDate(date) {
    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    let HH = date.getHours() + (date.getTimezoneOffset() / 60);
    // if HH is more than 24, we need to add 1 day
    if(HH > 24) {
        HH -= 24;
        dd += 1;
    }
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let ms = date.getMilliseconds();

    if (dd < 10) dd = '0' + dd;
    if (MM < 10) MM = '0' + MM;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    // "2000-01-01T23:59:59.999+00:00"
    return yyyy + '-' + MM + '-' + dd + 'T' + HH + ':' + mm + ':' + ss + '.' + ms + '+00:00';
}

function getFormattedTimeLeft(deadline) {
    // we got date like "2000-01-01T23:59:59.999+00:00"
    // and we need to get "1d 23:59:59"

    let dateNow = new Date();

    // deadline parsed time
    let date = deadline.split('T')[0]; // "2000-01-01"
    let time = deadline.split('T')[1].split('.')[0]; // "23:59:59"
    let hours = parseInt(time.split(':')[0]) - dateNow.getTimezoneOffset() / 60; // "23"
    let minutes = time.split(':')[1]; // "59"
    let seconds = time.split(':')[2]; //

    let dateDeadline = new Date(date + 'T' + hours + ':' + minutes + ':' + seconds);

    let diff = dateDeadline - dateNow;

    // left days, hours, minutes, seconds
    let daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hoursLeft = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let secondsLeft = Math.floor((diff % (1000 * 60)) / 1000);

    let timeLeftString = '';
    timeLeftString += daysLeft + 'd ';

    if(hoursLeft < 10) {
        timeLeftString += '0';
    }
    timeLeftString += hoursLeft + ':';

    if(minutesLeft < 10) {
        timeLeftString += '0';
    }
    timeLeftString += minutesLeft + ':';

    if(secondsLeft < 10) {
        timeLeftString += '0';
    }
    timeLeftString += secondsLeft;


    if(diff < 0) {
        return '0d 00:00:00';
    }

    // format date
    return timeLeftString;
}

export { getFormattedDate, getFormattedTimeLeft };