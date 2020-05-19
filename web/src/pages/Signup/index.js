import React from 'react';
import styles from './styles.css';
import logo from '../../assets/logo.svg';
import SignupForm from '../../components/SignupForm';

export default function Signup() {
    return (
        <div className='signup-page'>
            <header>
                <img className='logo' src={logo} alt="Logo"/>
                <h1>Organize-me</h1>
            </header>
            
            <SignupForm/>
        </div>
    )
}
