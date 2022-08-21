import React from 'react';
import cl from './DoneDrop.module.css';

import { useDrop } from 'react-dnd'

function DoneDrop({isVisible, onDrop}) {
    const rootClass = [cl.DoneDrop];
    if (isVisible) {
        rootClass.push(cl.active);
    }

    const [collectedProps, drop] = useDrop(() => ({
        accept: 'PIN',
        drop: () => {
            onDrop();
        }
    }))

    return <div className={rootClass.join(' ')} ref={drop}></div>
}

export default DoneDrop;