import BackendUrls from "./BackendUrls";

function fetchCreate(pins) {
    return fetch(BackendUrls.create, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pins)
    });
}

function fetchGetAll() {
    return fetch(BackendUrls.getAll, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    });
}

function fetchDelete(pinsToDelete) {
    return fetch(BackendUrls.deleteAll, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pinsToDelete)
    });
}

function fetchUpdate(pin) {
    return fetch(BackendUrls.update, {
        method: 'PUT',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pin)
    });
}

export {fetchCreate, fetchGetAll, fetchDelete, fetchUpdate}