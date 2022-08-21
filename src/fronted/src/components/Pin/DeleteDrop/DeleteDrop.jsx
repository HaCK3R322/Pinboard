import React, {useEffect} from 'react';
import cl from './DeleteDrop.module.css';

import { useDrop } from 'react-dnd'

function DeleteDrop({isVisible, onDrop}) {
    const rootClass = [cl.DeleteDrop];
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

export default DeleteDrop;