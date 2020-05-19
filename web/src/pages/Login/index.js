import React, { useEffect } from 'react';
import styles from './styles.css';
import logo from '../../assets/logo.svg';
import LoginForm from '../../components/LoginForm';

export default function Login() {

    useEffect(() => {
        localStorage.clear();

    }, [])
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
