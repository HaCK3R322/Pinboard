import React from 'react';

import createMyPinsUniversity from "../js/api/createMyPinsUniversity";
import { getAll } from "../js/api/pins";
import BackendUrls from "../js/api/BackendUrls";
import {Button} from "react-bootstrap";

const MainPage = () => {

    let pinsToDelete = [];

    function createPins() {
        createMyPinsUniversity()
            .then((response) => {
                if (response.status === 201) {
                    console.log("Successfully created pins!");
                    fetch(BackendUrls.getAll, {
                        method: "GET",
                        mode: "cors",
                        credentials: "include"
                    }).then((resp) => {
                      return resp.json()
                    }).then((data) => {
                        data.forEach((pin) => {
                            pinsToDelete.push({id: pin.id});
                        });
                        console.log(data);
                    });
                } else {
                    alert("Something went wrong!");
                }
            });
    }

    function deleteAllPins() {
        console.log(pinsToDelete);
        fetch(BackendUrls.deleteAll, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pinsToDelete)
        }).then((response) => {
                if (response.status === 200) {
                    console.log("Successfully deleted pins! Now pins:");
                    fetch(BackendUrls.getAll, {
                        method: "GET",
                        mode: "cors",
                        credentials: "include"
                    }).then((resp) => {
                        return resp.json()
                    }).then((data) => {
                        console.log(data);
                    });
                }
            }
        );
    }

    return (
        <div>
            <Button onClick={createPins}>Create Pins</Button>
            <Button onClick={deleteAllPins}>Delete Pins</Button>
        </div>
    );
};

export { MainPage };