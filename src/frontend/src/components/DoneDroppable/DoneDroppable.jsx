import React from 'react';

import cl from './DoneDroppable.module.css';

function DoneDroppable({visible, onDrop, onDragOver}) {
    const rootClasses = [cl.DoneDroppable];
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onDrop={onDrop} onDragOver={onDragOver} draggable={true}>

        </div>
    );
}

export default DoneDroppable;