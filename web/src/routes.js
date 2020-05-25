import React, { useContext } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import api from './services/api';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Notes from './pages/Notes';

import { GlobalContext } from './context/GlobalState';

export default function Router() {

    const { user, setUser, checkLoginStatus } = useContext(GlobalContext);

    const AuthRoute = (props) => {
        // let token = localStorage.getItem('JWT');
        
        // return api.get(`/auth/verify/${token}`)
        // .then(response => {
        //     console.log(response.data.user);
            
        //     setUser(response.data.user);
        //     return (<Route {...props} />)
        // })
        // .catch(err => {

        //     setUser(null);
        //     return <Redirect {...props} to={props.fallback}/>
        // });
        
        
        if(checkLoginStatus()){
            return(
                <Route {...props}/>
            )
        }

        return (
            <Redirect {...props} to={props.fallback} />
        )


    };

    
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/signup' component={Signup}/>
                <Route path='/notes' component={Notes} />
                <Redirect to='/'/>
            </Switch>
        </BrowserRouter>
    )
}
