import React, {useCallback, useEffect, useState} from 'react';

import cl from './Board.module.css';
import Pin from "../Pin/Pin";
import {fetchDelete, fetchGetAll, fetchUpdate} from "../../js/api/pins";
import PinForm from "../Pin/PinForm/PinForm";
import {getFormattedDate} from "../../js/util/date";


function sortByDateCreation(groups) {
    for(let i = 0; i < groups.length; i++) {
        groups[i].sort((a, b) => {
            return Date.parse(a.dateCreation) - Date.parse(b.dateCreation);
        } );
    }

    // sort groups by dateCreation of the first pin in the group
    groups.sort((a, b) => {
        return Date.parse(a[0].dateCreation) - Date.parse(b[0].dateCreation);
    });

    return groups;
}

function sortByPriority(groups) {
    // priority is a string where before dot is a number of group and after dot is a number of pin in the group
    for(let i = 0; i < groups.length; i++) {
        groups[i].sort((a, b) => {
            let aPriority = a.priority.split('.');
            let bPriority = b.priority.split('.');
            return parseInt(aPriority[0]) - parseInt(bPriority[0]) || parseInt(aPriority[1]) - parseInt(bPriority[1]);
        } );
    }

    // sort groups by priority of the first pin in the group
    groups.sort((a, b) => {
        let aPriority = a[0].priority.split('.');
        let bPriority = b[0].priority.split('.');
        return parseInt(aPriority[0]) - parseInt(bPriority[0]);
    }
    );

    return groups;
}

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

    // sort each group by dateCreation
    //groups = sortByDateCreation(groups);

    // sort each group by priority
    groups = sortByPriority(groups);

    return groups;
}

let sequence = 0;
const getSequence = () => {
    return sequence++;
}

const Board = ({formVisible, setFormVisible}) => {
    let [pins, setPins] = React.useState([]);
    let [groups, setGroups] = React.useState([]);

    React.useEffect(() => {
        fetchGetAll()
            .then(response => {
                return response.json();
            })
            .then(data => {
                setPins(data);
                setGroups(getGroups(data));
            });
    }, []);

    function onDeleteHandler(pin) {
        console.log('Trying to delete pin: ' + pin.id);
        setPins(pins.filter(p => p.id !== pin.id));
        let ignored = fetchDelete([pin]);
    }

    function onDoneHandler(pin) {
        console.log('Trying to done pin: ' + pin.id);
        pin.status = "done";
        pin.dateCompletion = getFormattedDate(new Date());
        let ignored = fetchUpdate(pin);
    }

    function addPin(pin) {
        setPins([...pins, pin]);
        // fetching in the PinForm component
    }

    function updatePinState(pin) {
        setPins(pins.map(p => {
            if(p.id === pin.id) {
                return pin;
            }
            return p;
        }));
    }


    return(
        <div>
            <div className={cl.Board}>
                {getGroups(pins).map((group) =>
                    <div key={getSequence()} className={cl.Group}>
                        {
                            group.map(pin =>
                                {
                                    return <Pin pin={pin} key={getSequence()}
                                                onDelete={onDeleteHandler}
                                                onDone={onDoneHandler}
                                                updatePinState={updatePinState}
                                    />
                                }
                            )
                        }
                    </div>
                )}
            </div>
            <PinForm visible={formVisible} pins={pins} setVisible={setFormVisible} addPin={addPin}/>
        </div>
    );
};

export default Board;