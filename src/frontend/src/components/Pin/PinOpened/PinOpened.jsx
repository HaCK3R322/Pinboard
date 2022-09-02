import React from "react";
import cl from "./PinOpened.module.css";
import PinForm from "../PinForm/PinForm";


function PinOpened({visible, setVisible, pin, updatePinState}) {
    const rootClasses = [cl.Wrapper];
    if (visible) {
        rootClasses.push(cl.active);
    }
    function closePin() {
        setVisible(false);
    }

    let [isRedacting, setIsRedacting] = React.useState(false);
    function openFormForRedact() {
        setVisible(false);
        setIsRedacting(true);
    }

    return (
        <div>
            <div className={rootClasses.join(' ')} onClick={closePin}>
                <div className={cl.PinOpened} onClick={e => {e.stopPropagation()}}>
                    <div className={cl.GroupName}> <div className={cl.GroupNameText}>{pin.groupName}</div> </div>
                    <div className={cl.LineBreak}/>
                    <div className={cl.Description}>{pin.description}</div>
                    <button className={cl.RedactButton} onClick={openFormForRedact} />
                </div>
            </div>
            {isRedacting && <PinForm visible={isRedacting} setVisible={setIsRedacting} pinToEdit={pin} updatePinState={updatePinState}/>}
        </div>
    )
}

export default PinOpened;