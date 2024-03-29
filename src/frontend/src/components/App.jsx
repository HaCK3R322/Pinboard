import React, {useCallback} from 'react';

import cl from './App.module.css';

import Header from "./Header/Header.jsx";
import Board from "./Board/Board";
import Menu from "./Menu/Menu";

import {HTML5Backend} from 'react-dnd-html5-backend';
import {TouchBackend} from 'react-dnd-touch-backend';
import { DndProvider } from 'react-dnd-multi-backend';
import { TouchTransition, MouseTransition } from 'react-dnd-multi-backend';
const HTML5toTouch = {
    backends: [{
        backend: HTML5Backend,
        transition: MouseTransition
    }, {
        backend: TouchBackend,
        options: {
            enableMouseEvents: false,
            delayTouchStart: 300
        },
        preview: true,
        transition: TouchTransition
    }]
};

const App = () => {
    let [newPinFormVisible, setNewPinFormVisible] = React.useState(false);
    let [pinsOrderFormVisible, setPinsOrderFormVisible] = React.useState(false)
    let [menuVisible, setMenuVisible] = React.useState(false);
    const menuClick = () => {
        setMenuVisible(!menuVisible);
    }

    return (
        <div>
            <DndProvider options={HTML5toTouch}>
                <div className={cl.headerShift} />

                <Board
                    newPinFormVisible={newPinFormVisible}
                    setNewPinFormVisible={setNewPinFormVisible}

                    pinsOrderFormVisible={pinsOrderFormVisible}
                    setPinsOrderFormVisible={setPinsOrderFormVisible}
                />
                <Header openMenu={menuClick}/>
                <Menu
                    isVisible={menuVisible}
                    setVisible={setMenuVisible}
                    openNewPinForm={() => {setNewPinFormVisible(true)}}
                    openPinsOrderForm={() => setPinsOrderFormVisible(true)}
                />
            </DndProvider>
        </div>
    );
};

export { App };