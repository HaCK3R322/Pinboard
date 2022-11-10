import React from 'react';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import cl from './LoginForm.module.css';

import {fetchRegister, fetchLogin} from "../../js/api/authentication";
import { setCookie } from '../../js/util/cookie';

const LoginForm = () => {
    let [username, setUsername] = React.useState("");
    let [password, setPassword] = React.useState("");

    function register() {
        fetchRegister(username, password)
            .then((response) => {
                if(response.status === 200) {
                    alert("Successfully registered! You can now login.");
                } else if(response.status === 409) {
                    alert("Username already exists!");
                } else {
                    alert("Something went wrong!");
                }
            });
    }

    function login() {
        fetchLogin(username, password)
            .then((response) => {
                if(response.status === 200) {
                    console.log("Successfully logged in!");


                    // this need to be replaced on some callback function idk
                    setCookie("username", username, 14);
                    setCookie("password", password, 14);
                    window.location.reload();


                } else if(response.status === 403) {
                    alert("Wrong password!");
                } else if(response.status === 404) {
                    alert("Username not found!");
                } else {
                    alert("Something went wrong!");
                }
            }).catch((error) => {
                console.log(error);
                alert("Some server problems...!");
            });
    }

    return (
        <div className={cl.LoginDiv}>
            <h3>Login</h3>
            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid">
                <Button type="primary" className="btn btn-primary" id="submitButton" onClick={login}>
                    Login
                </Button>
            </div>
            <br/>
            <div className="d-grid">
                <Button type="primary" className="btn btn-primary" onClick={register}>
                    Register
                </Button>
            </div>
        </div>
    );
};

export { LoginForm };