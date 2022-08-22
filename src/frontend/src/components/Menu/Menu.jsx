import React from 'react';
import cl from './Menu.module.css';

function Menu({isVisible, setVisible, openForm}) {
    let wrapperClass = isVisible ? cl.WrapperOpen : cl.WrapperClose;

    return (
        <div className={wrapperClass} onClick={e => setVisible(false)}>
            <div className={cl.Menu} onClick={e => e.stopPropagation()}>
                <button className={cl.MenuButton} onClick={() => {openForm(); setVisible(false)}}>Create new pin</button>
            </div>
        </div>
    );
}

export default Menu;