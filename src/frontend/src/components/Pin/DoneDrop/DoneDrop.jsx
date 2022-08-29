import React, {useEffect} from 'react';
import cl from './DoneDrop.module.css';

import { useDrop } from 'react-dnd'

function DoneDrop({isVisible, onDrop, setIsOver}) {
    const rootClass = [cl.DoneDrop];
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

    useEffect(() => {
        setIsOver(isOver);
    } , [isOver]);

    return <div className={rootClass.join(' ')} ref={drop}></div>
}

export default DoneDrop;