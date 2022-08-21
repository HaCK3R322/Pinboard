// this is like for the first time to create all my pins for university

import BackendUrls from "./BackendUrls";

function createPinJson(groupName, description) {
    return {
        groupName: groupName,
        description: description,
        color: "red",
        dateCreation: "2022-01-01",
        dateCompletion: "2022-01-01",
        dateDeadline: "2022-01-01",
        priority: 1,
        status: "undone"
    }
}

export default function createMyPinsUniversity() {
    let pins = []

    pins.push(createPinJson("Машинка", "Курс"))
    pins.push(createPinJson("Машинка", "Экзамен"))
    pins.push(createPinJson("Машинка", "Рубежка"))

    pins.push(createPinJson("ТИвП", "Дз 1"))
    pins.push(createPinJson("ТИвП", "Дз 2"))
    pins.push(createPinJson("ТИвП", "Дз 3"))
    pins.push(createPinJson("ТИвП", "Дз 4"))
    pins.push(createPinJson("ТИвП", "Дз 5"))
    pins.push(createPinJson("ТИвП", "Реферат"))


    pins.push(createPinJson("Теорвер", "Кр 1"))
    pins.push(createPinJson("Теорвер", "Кр 2"))
    pins.push(createPinJson("Теорвер", "Дз 1"))
    pins.push(createPinJson("Теорвер", "Практика 1"))
    pins.push(createPinJson("Теорвер", "Практика 2"))
    pins.push(createPinJson("Теорвер", "Практика 3"))
    pins.push(createPinJson("Теорвер", "Практика 4"))
    pins.push(createPinJson("Теорвер", "Практика 5"))
    pins.push(createPinJson("Теорвер", "Практика 6"))
    pins.push(createPinJson("Теорвер", "Экзамен"))

    pins.push(createPinJson("ДВБ", "Дз 1"))
    pins.push(createPinJson("ДВБ", "Дз 2"))
    pins.push(createPinJson("ДВБ", "Дз 3"))
    pins.push(createPinJson("ДВБ", "Дз 4"))
    pins.push(createPinJson("ДВБ", "Дз 5"))
    pins.push(createPinJson("ДВБ", "Проект"))

    pins.push(createPinJson("БЖД", "Спросить что делать"))

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