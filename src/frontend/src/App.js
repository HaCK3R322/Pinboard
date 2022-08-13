import React from 'react';

import BackendUrls  from "./js/api/BackendUrls";
import { LoginForm } from './components/LoginForm';
import { fetchLogout } from "./js/api/authentication";

import MainPage from "./js/MainPage";
import {Button} from "react-bootstrap";


// function that returns cookie value by name\
function getCookieValueByName(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

const LogoutButton = () => {
    return (
        <Button variant="primary" onClick={
            () => {
                fetchLogout(BackendUrls.url + BackendUrls.logout);

                document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
            }
        }>Logout</Button>
    );
}

const App = () => {
    return(
        <div>
            {
               document.cookie.includes("username")
                   ? <MainPage />
                   : <LoginForm />
            }
        </div>
    )
};

export default App;