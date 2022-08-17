import React from 'react';

import createMyPinsUniversity from "../js/api/createMyPinsUniversity";
import BackendUrls from "../js/api/BackendUrls";
import {Button} from "react-bootstrap";
import {PinForm} from "./PinForm.jsx";
import Header from "./Header.jsx";

const MainPage = () => {
    let [showPinForm, setShowPinForm] = React.useState(false);
    function closeForm() {
        setShowPinForm(false);
    }

    return (
        <div>
            <Header/>
            <Button onClick={e => setShowPinForm(true)} style={{position: 'absolute', top: '50px', left: 0}}>Open form</Button>
            {showPinForm ? <PinForm closeForm={closeForm}/> : null}
        </div>
    );
};

export { MainPage };