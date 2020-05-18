import React, { useState, useContext } from 'react'
import styles from './styles.css';


import { GlobalContext } from '../../context/GlobalState';

export default function LoginForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { isLoggingIn, loginAction } = useContext(GlobalContext);
    
    function handleLogin(e) {
        e.preventDefault();
        
        loginAction(username, password);
    }

    return (
        <div className='form-container'>
            
            <form className='login-form'>
                <input 
                type="text" 
                placeholder='Usuário'
                value={username}
                onChange={e => {setUsername(e.target.value)}}
                />
                <input 
                type="password"  
                placeholder='Senha'
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                />

                <span>Ainda não tem uma conta?</span>
                <a href="/signup">Cadastre-se</a>

                <input 
                type="submit" 
                className='btn-login' 
                value={!isLoggingIn ? 'Login' : '...'}  
                disabled={isLoggingIn ? true : false}  
                onClick={(e) => handleLogin(e)}
                
                />
            </form>
        </div>
    )
}
