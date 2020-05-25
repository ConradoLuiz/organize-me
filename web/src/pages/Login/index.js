import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.css';
import logo from '../../assets/logo.svg';
import LoginForm from '../../components/LoginForm';

import { GlobalContext } from '../../context/GlobalState';

export default function Login() {
    const history = useHistory();
    
    const { isLoggedIn, resetCachedState } = useContext(GlobalContext);

    useEffect(() => {
        if(isLoggedIn){
            history.push('/notes');
        }

    }, [isLoggedIn]);

    
    return (
        <div className='login-page'>
            <div className="main-text">
                <div className="title">
                    <img className='logo' src={logo} alt="Logo"/>
                    <h1>Organize-me</h1>
                </div>

                <div className="slogan">
                    <h2>Te ajudo a se organizar</h2>
                    <h3>Pode confiar</h3>
                </div>
            </div>

            <div className="login-container">
                <LoginForm/>
            </div>
        </div>
    )
}
