import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/notes' component={Notes}/>
                <Redirect to='/'/>
            </Switch>
        </BrowserRouter>
    )
}
