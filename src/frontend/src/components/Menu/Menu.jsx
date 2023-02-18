import React from 'react';
import cl from './Menu.module.css';

function Menu({isVisible, setVisible, openNewPinForm, openPinsOrderForm}) {
    let wrapperClass = isVisible ? cl.WrapperOpen : cl.WrapperClose;

    return (
        <div className={wrapperClass} onClick={e => setVisible(false)}>
            <div className={cl.Menu} onClick={e => e.stopPropagation()}>
                <button className={cl.MenuButton} onClick={() => {openNewPinForm(); setVisible(false)}}>Create new pin</button>
                <button className={cl.MenuButton} onClick={() => {openPinsOrderForm(); setVisible(false)}}>Change pins order</button>
            </div>
        </div>
    );
}

export default Menu;