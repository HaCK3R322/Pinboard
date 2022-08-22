import React, {useEffect} from 'react';
import cl from './DeleteDrop.module.css';

import { useDrop } from 'react-dnd'

function DeleteDrop({isVisible, onDrop, setIsOver}) {
    const rootClass = [cl.DeleteDrop];
    if (isVisible) {
        rootClass.push(cl.active);
    }

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'PIN',
        drop: () => {
            onDrop();
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        })
    }))

    if(isOver) {
        setIsOver(true);
    } else {
        setIsOver(false);
    }

    return <div className={rootClass.join(' ')} ref={drop}></div>
}

export default DeleteDrop;