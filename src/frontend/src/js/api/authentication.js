function fetchRegister(url, username, password) {
    console.log("Trying to register with: " + username + " " + password);

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    });
}

function fetchLogin(url, username, password) {
    console.log("Trying to login with: " + username + " " + password);

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    });
}

function fetchLogout(url) {
    console.log("Trying to logout");

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
    });
}

export { fetchRegister, fetchLogin, fetchLogout };