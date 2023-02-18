import React from "react";
import cl from "./PinOpened.module.css";
import NewPinForm from "../PinForm/NewPinForm";
import {getFormattedDeadline} from "../../../js/util/date";


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
                    <div className={cl.Deadline} >{pin.dateDeadline !== null && getFormattedDeadline(pin.dateDeadline)}  </div>
                    <div className={cl.LineBreak2}/>
                    <div className={cl.Description}>{pin.description}</div>
                    <button className={cl.RedactButton} onClick={openFormForRedact} />
                </div>
            </div>
            {isRedacting && <NewPinForm visible={isRedacting} setVisible={setIsRedacting} pinToEdit={pin} updatePinState={updatePinState}/>}
        </div>
    )
}

export default PinOpened;