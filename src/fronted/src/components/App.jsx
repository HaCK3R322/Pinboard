import React, {useCallback} from 'react';

import PinForm from "./Pin/PinForm/PinForm.jsx";
import Header from "./Header/Header.jsx";
import Board from "./Board/Board";
import {fetchGetAll} from "../js/api/pins";

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
    let [formVisible, setFormVisible] = React.useState(false);
    return (
        <div>
            <DndProvider options={HTML5toTouch}>
                <Header openForm={() => {setFormVisible(true)}} />
                <Board
                    formVisible={formVisible}
                    setFormVisible={setFormVisible}
                />
            </DndProvider>
        </div>
    );
};

export { App };