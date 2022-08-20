import React from 'react';
import {fetchCreate} from "../../../js/api/pins";
import {Button} from "react-bootstrap";
import cl from './PinOpened.module.css';

const PinOpened = ({pin, visible, setVisible}) => {
    const rootClasses = [cl.Wrapper];
    if(visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.PinOpened} onClick={(e) => {e.stopPropagation()}}>
                <div className={cl.PinOpenedGroupName}>{pin.groupName}</div>
                <div className={cl.PinOpenedDescriptionArea}>
                    <div className={cl.PinOpenedDescription}>{pin.description}</div>
                </div>
            </div>
        </div>
    );
};

export default PinOpened;