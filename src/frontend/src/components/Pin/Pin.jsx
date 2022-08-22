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

    let [isDone, setIsDone] = React.useState(pin.status === 'done');
    function onDoneDropHandler() {
        setIsDone(true);
        onDone(pin);
    }

    const rootClass = [cl.Pin];
    if (isDone) {
        rootClass.push(cl.Done);
    }

    let [isOverDone, setIsOverDone] = React.useState(false);
    let [isOverDelete, setIsOverDelete] = React.useState(false);
    if (isOverDone || isOverDelete) {
        rootClass.push(cl.Hovering);
    }

    // render
    const finalStyleClass = rootClass.join(' ');
    return (
        <div>
            {
                !isDragging &&
                (<div ref={drag} className={finalStyleClass} onClick={openPin} >
                    <div className={cl.GroupName}> {pin.groupName} </div>
                    <div className={cl.LineBreak}/>
                    <div className={cl.Description}> {pin.description} </div>
                </div>)
            }
            <PinOpened pin={pin} visible={pinOpened} setVisible={setPinOpened} />
            <DoneDrop isVisible={isDragging} onDrop={onDoneDropHandler} setIsOver={setIsOverDone}/>
            <DeleteDrop isVisible={isDragging} onDrop={onDeleteDropHandler} setIsOver={setIsOverDelete} />
            {isDragging && <PinPreview pin={pin} pinStyle={finalStyleClass}/>}
        </div>
    );
}

export default Pin;