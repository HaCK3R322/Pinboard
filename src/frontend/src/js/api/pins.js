function fetchCreate(url, groupName, description) {
    let pin =  [{
        groupName: groupName,
        description: description,
        color: "color",
        dateCreation: "2020-01-01",
        dateCompletion: "2020-01-01",
        dateDeadline: "2020-01-01",
        priority: 1,
        status: "status"
    }]

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pin)
    });
}
export { fetchCreate };

function getAll(url) {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    });
}

export { getAll }