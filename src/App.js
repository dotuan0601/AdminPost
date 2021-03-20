import React from 'react';
import Cookies from 'universal-cookie';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Posts from "./containers/Posts";
import './App.css';
import Login from "./containers/Login";

const cookies = new Cookies();

function App() {
    if (!cookies.get('currentUser')) {
        return <Login />
    }

    return (
        <div className="wrapper">
            <p style={{float: 'right', marginRight: '15px'}}><a href='javascript:void(0)' onClick={() => {
                cookies.remove('currentUser');
                window.location.href = '/login'
            }}>Logout</a></p>
            <BrowserRouter>
                <Switch>
                    <Route path="/posts">
                        <Posts/>
                    </Route>
                    <Route path="/">
                        <Login/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
