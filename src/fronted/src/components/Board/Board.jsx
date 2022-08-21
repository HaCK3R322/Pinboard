import React, {useCallback, useEffect, useState} from 'react';

import cl from './Board.module.css';
import Pin from "../Pin/Pin";
import {usePreview} from "react-dnd-preview";
import DoneDrop from "../Pin/DoneDrop/DoneDrop";
import DeleteDrop from "../Pin/DeleteDrop/DeleteDrop";
import {fetchCreate, fetchDelete, fetchGetAll, fetchUpdate} from "../../js/api/pins";
import PinForm from "../Pin/PinForm/PinForm";


function getGroups(pins) {
    let groupNames = []
    pins.forEach(pin => {
        if(!groupNames.includes(pin.groupName)) {
            groupNames.push(pin.groupName);
        }
    });

    let groups = [];
    for(let i = 0; i < groupNames.length; i++) {
        let gPins = [];
        pins.forEach(pin => {
            if(pin.groupName === groupNames[i]) {
                gPins.push(pin);
            }
        });
        groups.push(gPins);
    }

    return groups;
}

let sequence = 0;
const getSequence = () => {
    return sequence++;
}

const Board = ({formVisible, setFormVisible}) => {
    let [pins, setPins] = React.useState([]);
    let [groups, setGroups] = React.useState([]);

    useEffect(() => {
        setGroups(getGroups(pins));
    }, [pins]);

    React.useEffect(() => {
        // const pinUpdateTime = 500;
        fetchGetAll()
            .then(response => {
                return response.json();
            })
            .then(data => {
                // setPins(data.filter(pin => pin.status !== "done"));
                setPins(data);
                setGroups(getGroups(data));
            });
        // console.log("updatePins will be called every " + pinUpdateTime + " ms");
        // const interval = setInterval(() => {
        //     updatePins(pins, setPins);
        // }, pinUpdateTime);
        // return () => clearInterval(interval);
    }, []);

    function onDeleteHandler(pin) {
        console.log('Try to delete pin: ' + pin.id);
        setPins(pins.filter(p => p.id !== pin.id));
        let ignored = fetchDelete([pin]);
    }

    function onDoneHandler(pin) {
        console.log('Try to done pin: ' + pin.id);
        pin.status = "done";
        fetchUpdate(pin);
    }

    function addPin(pin) {
        setPins([...pins, pin]);
        // fetching in the PinForm component
    }

    return(
        <div>
            <div className={cl.Board}>
                {getGroups(pins).map((group) =>
                    <div key={getSequence()} className={cl.Group}>
                        {
                            group.map(pin =>
                                {
                                    console.log('Draw pin: ' + pin.id);
                                    console.log(pin);
                                    return <Pin pin={pin} key={getSequence()} onDelete={onDeleteHandler} onDone={onDoneHandler} />
                                }
                            )
                        }
                    </div>
                )}
            </div>
            <PinForm visible={formVisible} setVisible={setFormVisible} addPin={addPin}/>
        </div>
    );
};

export default Board;