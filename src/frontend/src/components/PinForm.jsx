import React from 'react';
import '../css/PinForm.css';
import { Button } from "react-bootstrap";
import { fetchCreate, getAll } from "../js/api/pins.js";
import BackendUrls from "../js/api/BackendUrls";


const PinForm = (props) => {
    let [groupName, setGroupName] = React.useState('');
    let [description, setDescription] = React.useState('');

    function savePin() {
        fetchCreate(BackendUrls.create, groupName, description)
            .then((response) => {
                if (response.status === 201) {
                    console.log("Pin created");
                }
            });
    }

    function logAllPins() {
        getAll(BackendUrls.getAll)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong");
                }
            }).then((data) => {
                console.log(data);
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <div className="pinForm">
                <div>
                    <input type="text" placeholder="Group" onChange={e => setGroupName(e.target.value)}/>
                    upper input
                </div>
                <div className="pinForm__description">
                    <input type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
                    <Button variant="primary" className="pinForm__saveButton" onClick={savePin}>Save</Button>
                    <Button variant="primary" onClick={logAllPins}>Log all</Button>
                    <Button variant="primary" onClick={props.closeForm}>Close</Button>
                </div>
            </div>
        </div>
    );
};

export {PinForm};