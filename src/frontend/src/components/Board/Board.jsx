import React, {useCallback, useEffect, useState} from 'react';

import cl from './Board.module.css';
import Pin from "../Pin/Pin";
import {fetchDelete, fetchGetAll, fetchUpdatePin} from "../../js/api/pins";
import NewPinForm from "../Pin/PinForm/NewPinForm";
import {getFormattedDate} from "../../js/util/date";
import {useDrop} from "react-dnd";
import PinOrderForm from "../Pin/PinOrderForm/PinOrderForm";
import {getSortedGroups, sortGroupsByPriority} from "../../js/util/pins";

let sequence = 0;
const getSequence = () => {
    return sequence++;
}

const Board = ({newPinFormVisible, setNewPinFormVisible}) => {
    ///////////////////////////////////////////////////
    //////////// only needs to fix after-dragging delay
    const [_, bodyDropRef] = useDrop(() => ({
        accept: 'PIN',
        drop: () => {
            // do nothing
        }
    }));

    useEffect(() => {
        bodyDropRef(document.body);
        return () => {
            bodyDropRef(null);
        };
    }, []);
    ///////////////////////////////////////////////////
    ///////////////////////////////////////////////////

    let [pins, setPins] = React.useState([]);
    let [groups, setGroups] = React.useState([]);

    function addPinToState(pin) {
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

    React.useEffect(() => {
        fetchGetAll()
            .then(response => {
                return response.json();
            })
            .then(data => {
                setPins(data);
                setGroups(getSortedGroups(data, sortGroupsByPriority));
            });
    }, []);

    function onDeleteHandler(pin) {
        // agreement form
        if(window.confirm('Are you sure you want to delete this pin?')) {
            console.log('Trying to delete pin: ' + pin.id);
            setPins(pins.filter(p => p.id !== pin.id));
            let ignored = fetchDelete([pin]);
        }
    }

    function onDoneHandler(pin) {
        console.log('Trying to done pin: ' + pin.id);

        if(pin.status === "done") {
            pin.status = "undone";
            pin.dateCompletion = null;
        } else {
            pin.status = "done";
            pin.dateCompletion = getFormattedDate(new Date());
        }

        let ignored = fetchUpdatePin(pin);
    }

    return(
        <div>
            <div className={cl.Board}>
                {getSortedGroups(pins, sortGroupsByPriority).map((group) =>
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
            <NewPinForm visible={newPinFormVisible} pins={pins} setVisible={setNewPinFormVisible} addPinToState={addPinToState}/>
            <PinOrderForm pins={pins} setPinsState={setPins} />
        </div>
    );
};

export default Board;