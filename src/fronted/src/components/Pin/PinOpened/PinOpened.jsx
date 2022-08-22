import React from "react";
import cl from "./PinOpened.module.css";


function PinOpened({visible, setVisible, pin}) {
    const rootClasses = [cl.Wrapper];
    if (visible) {
        rootClasses.push(cl.active);
    }
    function closePin() {
        setVisible(false);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={closePin    }>
            <div className={cl.PinOpened} onClick={e => {e.stopPropagation()}}>
                <div className={cl.GroupName}> {pin.groupName} </div>
                <div className={cl.LineBreak}/>
                <div className={cl.Description}> {pin.description} </div>
            </div>
        </div>
    )
}

export default PinOpened;