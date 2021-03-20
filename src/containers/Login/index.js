import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import './Login.css';
import {mockUsers} from "./mock";

const cookies = new Cookies();

const doLogin = (username, password, setError) => {
    const user = mockUsers.filter((v, i, u) => {
        return v.userName === username.trim() && v.password === password.trim()
    });
    if (user.length === 0) {
        setError('Incorrect username or password')
    }
    else {
        cookies.set('currentUser', {username: username, password: password});
        window.location.href = '/posts'
    }
};

const Login = () => {
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState('');

    if (cookies.get('currentUser')) {
        window.location.href = '/posts'
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form>
                {error && (
                    <p style={{color: 'red'}}>{error}</p>
                )}
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>
                <div>
                    <button type="button" onClick={() => {
                        setError('');
                        doLogin(username, password, setError)
                    }}>Submit</button>
                </div>
            </form>
        </div>
    )
};

export default Login

