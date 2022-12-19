import React from 'react';
import cl from './PinForm.module.css';
import {Button} from "react-bootstrap";
import {fetchCreate, fetchDelete, fetchGetAll, fetchUpdate} from "../../../js/api/pins.js";
import {getFormattedDate} from "../../../js/util/date";
import createMyPinsUniversity from "../../../js/api/createMyPinsUniversity";
import {Autocomplete, TextareaAutosize, TextField} from "@mui/material";
import GroupName from "./GroupName/GroupName";
import Description from "./Description/Description";
import {getPriorityForNewPin} from "../../../js/util/pins";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

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
    let [newDateDeadline, setNewDateDeadline] = React.useState(pinToEdit ? pinToEdit.dateDeadline : null);

    function save(newPinGroupName, newPinDescription) {
        let isNewPin = pinToEdit === undefined;

        if(isNewPin) {
            let currentDate = getFormattedDate(new Date());
            let dateDeadLineToWrite = null;
            if(newDateDeadline !== null) {
                console.log(newDateDeadline.toDate());
                console.log(getFormattedDate(newDateDeadline.toDate()));
                dateDeadLineToWrite = getFormattedDate(newDateDeadline.toDate());
            }

            let pin = {
                groupName: newPinGroupName,
                description: newPinDescription,
                dateCreation: currentDate,
                dateDeadline: dateDeadLineToWrite,
                priority: getPriorityForNewPin(pins, newPinGroupName),
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
            if(newDateDeadline !== null) {
                pin.dateDeadline = getFormattedDate(newDateDeadline.toDate());
            }

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

    function handleDateDeadlineChange(someNewDate) {
        setNewDateDeadline(someNewDate);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.Form} onClick={(e) => {e.stopPropagation()}}>
                <div className={cl.FormTop}>
                    <GroupName
                        options={pins === undefined ? [groupName] : extractGroupNames(pins)}
                        value={pinToEdit === undefined ? groupName : pinToEdit.groupName}
                        setGroupName={setGroupName}
                    />
                </div>
                <div className={cl.LineBreak} />
                <div className={cl.FormBottom}>
                    <Description
                        description={pinToEdit === undefined ? description : pinToEdit.description}
                        setDescription={setDescription}
                    />
                    <Button variant="primary" className={cl.FormSaveButton} onClick={() => save(groupName, description)} >Save</Button>
                </div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <div style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: 'translateX(-50%)',
                    }}>
                        <DateTimePicker
                            label="Дедлайн"
                            value={newDateDeadline}
                            onChange={handleDateDeadlineChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </div>
                </LocalizationProvider>
            </div>
        </div>
    );
}

export default PinForm;