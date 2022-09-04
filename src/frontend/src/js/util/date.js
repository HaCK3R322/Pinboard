function getFormattedDate(date) {
    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    let HH = date.getHours() + (date.getTimezoneOffset() / 60);
    console.log(HH);
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

export { getFormattedDate };