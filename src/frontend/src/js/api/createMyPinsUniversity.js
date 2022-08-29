// this is like for the first time to create all my pins for university

import BackendUrls from "./BackendUrls";
import {getFormattedDate} from "../util/date";

let addedMs = 0;
function createPinJson(groupName, description) {
    let date = new Date();
    const yyyy = date.getFullYear();
    let MM = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    let HH = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let ms = date.getMilliseconds() + addedMs;
    addedMs += 1;

    // "2022-08-23T18:07:46.000+00:00"

    if (dd < 10) dd = '0' + dd;
    if (MM < 10) MM = '0' + MM;
    if (HH < 10) HH = '0' + HH;
    if (mm < 10) mm = '0' + mm;
    if (ss < 10) ss = '0' + ss;

    let dateNow = yyyy + '-' + MM + '-' + dd + 'T' + HH + ':' + mm + ':' + ss + '.' + ms + '+00:00';

    return {
        groupName: groupName,
        description: description,
        color: "default",
        dateCreation: dateNow,
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

    pins.push(createPinJson("ДВБ", "Лаба 1"))
    pins.push(createPinJson("ДВБ", "Лаба 2"))
    pins.push(createPinJson("ДВБ", "Лаба 3"))
    pins.push(createPinJson("ДВБ", "Лаба 4"))
    pins.push(createPinJson("ДВБ", "Лаба 5"))
    pins.push(createPinJson("ДВБ", "Проект"))

    pins.push(createPinJson("БЖД", "Спросить что делать"))

    pins.push(createPinJson("Физра", "Отходить 20 пар или договориться с Трифоновым"))

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