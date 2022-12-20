import React, {useCallback, useEffect, useRef} from 'react';
import cl from './Pin.module.css';
import PinOpened from "./PinOpened/PinOpened";
import {useDrag, useDrop} from "react-dnd";
import {usePreview} from "react-dnd-preview";
import {getEmptyImage} from "react-dnd-html5-backend";
import DoneDrop from "./DoneDrop/DoneDrop";
import DeleteDrop from "./DeleteDrop/DeleteDrop";
import {getFormattedTimeLeft} from "../../js/util/date";

const PinPreview = ({pin, pinStyle, timeLeftStomp}) => {
    const {display, itemType, item, style} = usePreview();
    if (!display) {
        return null;
    }

    let previewStyle = [pinStyle, cl.PinPreview];

    return (
        <div style={style} itemType={itemType}>
            <div className={previewStyle.join(' ')} >
                <div className={cl.GroupName}> {pin.groupName}</div>
                {(timeLeftStomp !== null) ? <div className={cl.Deadline}> {timeLeftStomp} </div> : <div className={cl.LineBreak}/>}
                <div className={cl.Description}> {pin.description} </div>
            </div>
        </div>
    );
}

function Pin({pin, onDelete, onDone, updatePinState}) {
    // pin opened
    let [pinOpened, setPinOpened] = React.useState(false);
    function openPin() {
        setPinOpened(true);
    }

    //// react-dnd draggable ////
    //////// delete, done
    const [{isDragging}, dragRef, preview] = useDrag({
        type: 'PIN',
        item: {pin},
        collect: monitor => ({
            isDragging: !!monitor.isDragging()
        }),
    });
    useEffect(() => {
        preview(getEmptyImage())
    }, [])

    function onDeleteDropHandler() {
        onDelete(pin);
    }

    let [pinDoneStatus, setPinDoneStatus] = React.useState(pin.status);
    function onDoneDropHandler() {
        onDone(pin); // call parent function that will react on pin dropping to done
        setPinDoneStatus(pin.status); // change pin status in this component
    }

    //// CSS ////
    const rootClass = [cl.Pin];

    // if done -> change color
    if (pinDoneStatus === 'done') {
        rootClass.push(cl.Done);
    }

    // if dragging remount component with animation (other pins shifting left)
    const borderPinStyle = [...rootClass];
    if (isDragging) {
        borderPinStyle.push(cl.Dragging);
        borderPinStyle.push(cl.JustDraggedAnimation)
    }

    // if is over delete or done drop start shaking animation
    let [isOverDropDone, setIsOverDropDone] = React.useState(false);
    let [isOverDropDelete, setIsOverDropDelete] = React.useState(false);
    if (isOverDropDone || isOverDropDelete) {
        rootClass.push(cl.Hovering);
    }

    const finalStyleClass = rootClass.join(' ');

    let [groupName, setGroupName] = React.useState(pin.groupName);
    let [description, setDescription] = React.useState(pin.description);

    // deadline time left
    let [deadline, setDeadline] = React.useState(pin.dateDeadline !== null ? getFormattedTimeLeft(pin.dateDeadline) : null);
    useEffect(() => {
        setInterval(() => {
            if(pin.dateDeadline !== null) {
                setDeadline(getFormattedTimeLeft(pin.dateDeadline));
            }
        }, 1000);
    }, [])

    // render
    return (
        <div>
            {
                !isDragging && (
                    <div ref={dragRef} className={finalStyleClass} onClick={openPin} >
                        <div className={cl.GroupName}> {groupName}</div>
                        {(deadline !== null) ? <div className={cl.Deadline}> {deadline} </div> : <div className={cl.LineBreak}/>}
                        <div className={cl.Description}> {description} </div>
                    </div>
                )
            }
            {isDragging && <div className={borderPinStyle.join(' ')}/>}
            <PinOpened pin={pin} visible={pinOpened} setVisible={setPinOpened} updatePinState={updatePinState} />
            <DoneDrop isVisible={isDragging} onDrop={onDoneDropHandler} setIsOver={setIsOverDropDone}/>
            <DeleteDrop isVisible={isDragging} onDrop={onDeleteDropHandler} setIsOver={setIsOverDropDelete} />
            {isDragging && <PinPreview pin={pin} pinStyle={finalStyleClass} timeLeftStomp={deadline}/>}
        </div>
    );
}

export default Pin;