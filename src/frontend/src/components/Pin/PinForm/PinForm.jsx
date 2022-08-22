import React from 'react';
import cl from './PinForm.module.css';
import {Button} from "react-bootstrap";
import {fetchCreate} from "../../../js/api/pins.js";


function PinForm({visible, setVisible, addPin}) {
    const rootClasses = [cl.Wrapper];
    if(visible) {
        rootClasses.push(cl.active);
    }

    let [groupName, setGroupName] = React.useState('');
    let [description, setDescription] = React.useState('');

    function save(newPinGroupName, newPinDescription) {
        let pin = {
            groupName: newPinGroupName,
            description: newPinDescription,
            color: "color",
            dateCreation: "2020-01-01",
            dateCompletion: "2020-01-01",
            dateDeadline: "2020-01-01",
            priority: 1,
            status: "undone"
        };

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
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.Form} onClick={(e) => {e.stopPropagation()}}>
                <div className={cl.FormTop}>
                    <input type="text" placeholder="Group" onChange={e => setGroupName(e.target.value)} style={{
                        position: "absolute",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: '5px',
                        border: '0px solid',
                        backgroundColor: 'lightgreen',
                        height: '80%',
                        width: '80%',
                    }}/>
                </div>
                <div className={cl.LineBreak} />
                <div className={cl.FormBottom}>
                    <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} style={{
                        position: "absolute",
                        top: '5%',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        borderRadius: '5px',
                        border: '0px solid',
                        backgroundColor: 'lightgreen',
                        height: '80%',
                        width: '80%'
                    }}/>
                    <Button variant="primary" className={cl.FormSaveButton} onClick={() => save(groupName, description)} >Save</Button>
                </div>
            </div>
        </div>
    );
}

export default PinForm;