import React from 'react';
import { Button } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/LoginForm.css';

import {fetchRegister, fetchLogin} from "../js/api/authentication";
import BackendUrls from "../js/api/BackendUrls";

const LoginForm = () => {
    let [username, setUsername] = React.useState("");
    let [password, setPassword] = React.useState("");

    function register() {
        fetchRegister(BackendUrls.url + BackendUrls.register, username, password)
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
        fetchLogin(BackendUrls.url + BackendUrls.login, username, password)
            .then((response) => {
                if(response.status === 200) {
                    console.log("Successfully logged in!");


                    // this need to be replaced on some callback function idk

                    document.cookie = "username=" + username;
                    document.cookie = "password=" + password;
                    window.location.reload();


                } else if(response.status === 403) {
                    alert("Wrong password!");
                } else if(response.status === 404) {
                    alert("Username not found!");
                } else {
                    alert("Something went wrong!");
                }
            });
    }

    function rememberMe() {
        document.cookie = "username=" + username;
        document.cookie = "password=" + password;
    }

    return (
        <div className="LoginDiv">
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
            <div className="d-grid">
                <Button type="primary" className="btn btn-primary" id="submitButton" onClick={register}>
                    Register
                </Button>
            </div>
        </div>
    );
};

export { LoginForm };