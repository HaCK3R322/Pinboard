import React, {useCallback, useEffect} from 'react';
import cl from './Pin.module.css';
import PinOpened from "./PinOpened/PinOpened";
import {useDrag} from "react-dnd";
import {usePreview} from "react-dnd-preview";
import {getEmptyImage} from "react-dnd-html5-backend";
import DoneDrop from "./DoneDrop/DoneDrop";
import DeleteDrop from "./DeleteDrop/DeleteDrop";
import {fetchDelete, fetchUpdate} from "../../js/api/pins";

const PinPreview = ({pin}) => {
    const {display, itemType, item, style} = usePreview()
    if (!display) {
        return null
    }

    return (
        <div style={style} itemType={itemType}>
            <div className={[cl.Pin, cl.PinPreview].join(' ')} >
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

    // render
    return (
        <div>
            <div ref={drag} className={rootClass.join(' ')} onClick={openPin} >
                <div className={cl.GroupName}> {pin.groupName} </div>
                <div className={cl.LineBreak}/>
                <div className={cl.Description}> {pin.description} </div>
            </div>
            <PinOpened pin={pin} visible={pinOpened} setVisible={setPinOpened} />
            <DoneDrop isVisible={isDragging} onDrop={onDoneDropHandler} />
            <DeleteDrop isVisible={isDragging} onDrop={onDeleteDropHandler} />
            <PinPreview pin={pin}/>
        </div>
    );
}

export default Pin;