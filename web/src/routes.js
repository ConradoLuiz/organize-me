import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import api from './services/api';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';

import { GlobalContext } from './context/GlobalState';
import { useEffect } from 'react';

function PrivateRoute({component: RouteComponent, ...rest}) {   
    const { isLoggedIn, dispatch, setUser } = useContext(GlobalContext);

    useEffect(() => {
        const token = localStorage.getItem('JWT');
        const checkAuth = async () => {
            try {
                const response = await api.get(`auth/verify/${token}`);
                setUser(response.data.user);
            } catch (error) {
                dispatch({ type: 'FAILED_LOGIN' });
            }
        }

        checkAuth();
    }, []);
    
    return (
        <Route
            {...rest}
            render={routerProps => 
                isLoggedIn ?
                    <RouteComponent {...routerProps} />
                :
                    <Redirect to={'/'} />

            }
        />
    );
}

export default function Router() {

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/signup' component={Signup}/>
                <PrivateRoute path='/notes' component={Notes} />
                <Redirect to='/'/>
            </Switch>
        </BrowserRouter>
    )
}
