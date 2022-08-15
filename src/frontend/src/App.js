import React from 'react';

import BackendUrls from "./js/api/BackendUrls";
import { getCookie, eraseCookie, setCookie } from './js/util/cookie';
import { LoginForm } from './components/LoginForm';
import { fetchLogin}  from "./js/api/authentication";
import { MainPage } from "./components/MainPage";

const App = () => {
    let [loggedIn, setLoggedIn] = React.useState("first init");

    if (loggedIn === "first init") {
        if(document.cookie.includes("JSESSIONID")) {
            setLoggedIn("true");
        } else if (document.cookie.includes("username") && document.cookie.includes("password")) {
            let username = getCookie("username");
            let password = getCookie("password");

            fetchLogin(BackendUrls.login, username, password)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Successfully logged in by cookies!");
                        setLoggedIn("true");
                    } else {
                        alert("Something went wrong!");
                        setLoggedIn("false");
                    }
                });
        } else {
            setLoggedIn("false");
        }
    }

    return(
        <div>
            {
                loggedIn === "true"
                    ? <MainPage />
                    : <LoginForm />
            }
        </div>
    )
};

export default App;