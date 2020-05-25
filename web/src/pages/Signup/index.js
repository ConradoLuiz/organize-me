import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.css';
import logo from '../../assets/logo.svg';
import SignupForm from '../../components/SignupForm';

import { GlobalContext } from '../../context/GlobalState';

export default function Signup() {
    const { isLoggedIn } = useContext(GlobalContext);
    
    const history = useHistory();
    
    useEffect(() => {
        if(isLoggedIn){
            history.push('/notes');
        }

    }, [isLoggedIn]);

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
