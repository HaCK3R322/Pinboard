// get cookie value by name
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

// delete cookie by name
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

// set cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days !== undefined) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; Expires=" + date.toUTCString();
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    } else {
        document.cookie = name + "=" + (value || "");
    }
}

export { getCookie, eraseCookie, setCookie };