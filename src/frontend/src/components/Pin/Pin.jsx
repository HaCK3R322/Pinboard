import React, {useCallback, useEffect} from 'react';
import cl from './Pin.module.css';
import PinOpened from "./PinOpened/PinOpened";
import {useDrag} from "react-dnd";
import {usePreview} from "react-dnd-preview";
import {getEmptyImage} from "react-dnd-html5-backend";
import DoneDrop from "./DoneDrop/DoneDrop";
import DeleteDrop from "./DeleteDrop/DeleteDrop";

const PinPreview = ({pin, pinStyle}) => {
    const {display, itemType, item, style} = usePreview();
    if (!display) {
        return null;
    }

    let previewStyle = [pinStyle, cl.PinPreview];

    return (
        <div style={style} itemType={itemType}>
            <div className={previewStyle.join(' ')} >
                <div className={cl.GroupName}> {pin.groupName} </div>
                <div className={cl.LineBreak}/>
                <div className={cl.Description}> {pin.description} </div>
            </div>
        </div>
    );
}

function Pin({pin, onDelete, onDone}) {
    // pin opened
    let [pinOpened, setPinOpened] = React.useState(false);
    function openPin() {
        setPinOpened(true);
    }

    // react-dnd draggable
    const [{isDragging}, drag, preview] = useDrag({
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

    function onDoneDropHandler() {
        setIsDone(true);
        onDone(pin);
    }

    // css
    const rootClass = [cl.Pin];

    // if done change color
    let [isDone, setIsDone] = React.useState(pin.status === 'done');
    if (isDone) {
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

    // render
    return (
        <div>
            {
                !isDragging && (
                    <div ref={drag} className={finalStyleClass} onClick={openPin} >
                        <div className={cl.GroupName}> {pin.groupName} </div>
                        <div className={cl.LineBreak}/>
                        <div className={cl.Description}> {pin.description} </div>
                    </div>
                )
            }
            {
                isDragging && <div className={borderPinStyle.join(' ')}/>
            }
            <PinOpened pin={pin} visible={pinOpened} setVisible={setPinOpened} />
            <DoneDrop isVisible={isDragging} onDrop={onDoneDropHandler} setIsOver={setIsOverDropDone}/>
            <DeleteDrop isVisible={isDragging} onDrop={onDeleteDropHandler} setIsOver={setIsOverDropDelete} />
            {isDragging && <PinPreview pin={pin} pinStyle={finalStyleClass}/>}
        </div>
    );
}

export default Pin;