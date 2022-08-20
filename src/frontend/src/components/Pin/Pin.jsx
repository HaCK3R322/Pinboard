import React from 'react';
import PinOpened from "./PinOpened/PinOpened";
import cl from './Pin.module.css';

const Pin = ({pin}) => {
    let [opened, setOpened] = React.useState(false);
    let openPin = () => {
        setOpened(true);
    }

    return (
        <div>
            <div className={cl.Pin} onClick={openPin}>
                <div className={cl.GroupName}>{pin.groupName}</div>
                <div className={cl.LineBreak}/>
                <div className={cl.Description}>{pin.description}</div>
            </div>
            <PinOpened pin={pin} visible={opened} setVisible={setOpened}/>
        </div>
    )
}

export default Pin;