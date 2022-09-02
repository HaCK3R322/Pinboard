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
                    alert("Теперь можно войти.");
                } else if(response.status === 409) {
                    alert("Такой пользователь уже существует!");
                } else {
                    alert("Ошибка!");
                }
            });
    }

    function login() {
        fetchLogin(username, password)
            .then((response) => {
                if(response.status === 200) {
                    console.log("Successfully logged in!");


                    // this need to be replaced on some callback function idk
                    setCookie("username", username, 1);
                    setCookie("password", password, 1);
                    window.location.reload();


                } else if(response.status === 403) {
                    alert("Неверный пароль!");
                } else if(response.status === 404) {
                    alert("Пользователя с таким ником не существует! Зарегистрируйтесь.");
                } else {
                    alert("Ошибка!");
                }
            }).catch((error) => {
                console.log(error);
                alert("Проблемы на стороне сервера...");
            });
    }

    return (
        <div className={cl.LoginDiv}>
            <h3>Вход</h3>
            <div className="mb-3">
                <label>Username</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="сюда никнейм"
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="а сюда пароль"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid">
                <Button type="primary" className="btn btn-primary" id="submitButton" onClick={login}>
                    Войти
                </Button>
            </div>
            <br/>
            <div className="d-grid">
                <Button type="primary" className="btn btn-primary" onClick={register}>
                    Зарегистрироваться
                </Button>
            </div>
        </div>
    );
};

export { LoginForm };