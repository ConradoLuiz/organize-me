import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.css';


import { GlobalContext } from '../../context/GlobalState';

export default function LoginForm () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [isLoggingIn, setIsLoggingIn] = useState(false);
    const history = useHistory();

    const { isLoggingIn, loginAction, hasLoginError } = useContext(GlobalContext);
    
    function handleLogin(e) {
        e.preventDefault();
        
        loginAction(history, username, password);
    }

    return (
        <div className='form-container'>
            
            <form className='login-form' onSubmit={(e) => handleLogin(e)}>
                {hasLoginError ? <h3 className='login-error-message'>Login inválido</h3>: null} 
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
                <Link to="/signup">Cadastre-se</Link>

                <input 
                type="submit" 
                className='btn-login' 
                value={!isLoggingIn ? 'Login' : '...'}  
                disabled={isLoggingIn ? true : false}  
                
                />
            </form>
        </div>
    )
}
