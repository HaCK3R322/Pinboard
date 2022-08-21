import BackendUrls from "./BackendUrls";

function fetchRegister(username, password) {
    console.log("Trying to register with: " + username + " " + password);

    return fetch(BackendUrls.register, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    });
}

function fetchLogin(username, password) {
    console.log("Trying to login with: " + username + " " + password);

    return fetch(BackendUrls.login, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${username}&password=${password}`
    });
}

function fetchLogout() {
    console.log("Trying to logout");

    return fetch(BackendUrls.logout, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include'
    });
}

export { fetchRegister, fetchLogin, fetchLogout };