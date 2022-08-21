import React from 'react';

import cl from './header.module.css';
import {Button} from "react-bootstrap";

import createMyPinsUniversity from "../../js/api/createMyPinsUniversity";
import {fetchGetAll} from "../../js/api/pins";
import BackendUrls from "../../js/api/BackendUrls";
import {fetchDelete} from "../../js/api/pins";
import PinForm from "../Pin/PinForm/PinForm";

const Header = ({openForm}) => {

    return (
        <div className={cl.header}>
            <Button onClick={openForm}>Open form</Button>
        </div>
    );
};

export default Header;