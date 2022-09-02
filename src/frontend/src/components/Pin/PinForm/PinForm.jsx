import React from 'react';
import cl from './PinForm.module.css';
import {Button} from "react-bootstrap";
import {fetchCreate, fetchDelete, fetchGetAll, fetchUpdate} from "../../../js/api/pins.js";
import {getFormattedDate} from "../../../js/util/date";
import createMyPinsUniversity from "../../../js/api/createMyPinsUniversity";
import {Autocomplete, TextareaAutosize, TextField} from "@mui/material";

function extractGroupNames(pins) {
    let groupNames = []
    pins.forEach(pin => {
        if(!groupNames.includes(pin.groupName)) {
            groupNames.push(pin.groupName);
        }
    });
    return groupNames;
}

function PinForm({visible, setVisible, pins, addPin, pinToEdit, updatePinState}) {
    const rootClasses = [cl.Wrapper];
    if(visible) {
        rootClasses.push(cl.active);
    }

    let [groupName, setGroupName] = React.useState(pinToEdit ? pinToEdit.groupName : '');
    let [description, setDescription] = React.useState(pinToEdit ? pinToEdit.description : '');

    function save(newPinGroupName, newPinDescription) {
        let isNewPin = pinToEdit === undefined;

        if(isNewPin) {
            let currentDate = getFormattedDate(new Date());

            let pin = {
                groupName: newPinGroupName,
                description: newPinDescription,
                dateCreation: currentDate,
                priority: 1,
                status: "undone"
            };
            console.log(pin);

            fetchCreate([pin])
                .then((response) => {
                    if (response.status === 201) {
                        return response.json();
                    } else {
                        throw "Something went wrong";
                    }
                })
                .then((data) => {
                    console.log("Pin created with id: " + data[0]);
                    pin.id = data[0];
                    addPin(pin);
                    setVisible(false);
                })
                .catch((error) => {
                    alert(error);
                });
        } else {
            let pin = pinToEdit;
            pin.groupName = newPinGroupName;
            pin.description = newPinDescription;

            fetchUpdate(pin)
                .then((response) => {
                    console.log(response.status);
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw "Something went wrong";
                    }
                })
                .then((data) => {
                    console.log("Updated pin with id: " + pin.id);
                    console.log(data);
                    updatePinState(pin);
                    setVisible(false);
                })
                .catch((error) => {
                    alert(error);
                });
        }
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.Form} onClick={(e) => {e.stopPropagation()}}>
                <div className={cl.FormTop}>
                    <input type="text" placeholder="Group" value={groupName} onChange={e => setGroupName(e.target.value)} style={{
                        position: "absolute",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '5px',
                        border: '0px solid',
                        backgroundColor: 'lightgreen',
                        height: '80%',
                        width: '80%',
                        textAlign: 'center',
                        fontSize: 'larger',
                    }}/>
                </div>
                <div className={cl.LineBreak} />
                <div className={cl.FormBottom}>
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={{
                        position: "absolute",
                        top: '5%',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        borderRadius: '5px',
                        border: '0px solid',
                        backgroundColor: 'lightgreen',
                        height: '85%',
                        width: '80%',
                        fontSize: 'x-large',
                    }}/>
                    <Button variant="primary" className={cl.FormSaveButton} onClick={() => save(groupName, description)} >Save</Button>
                </div>
            </div>
        </div>
    );
}

export default PinForm;