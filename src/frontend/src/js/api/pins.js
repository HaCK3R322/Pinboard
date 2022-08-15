function create(url, name) {
    let pin =  [{
        groupName: name,
        description: name,
        color: "color",
        dateCreation: "2020-01-01",
        dateCompletion: "2020-01-01",
        dateDeadline: "2020-01-01",
        priority: 1,
        status: "status"
    }]

    let result;

    fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pin)
    }).then((response) => {
        result = response.statusCode;
    });
}
export { create };

function getAll(url) {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include'
    });
}

export { getAll }