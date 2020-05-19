import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.css';


import { GlobalContext } from '../../context/GlobalState';

export default function SignupForm () {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [hasEmptyFields, setHasEmptyFields] = useState(false);
    const [diffentPassword, setDiffentPassword] = useState(false);
    
    const history = useHistory();

    const { isSigningUp, signupAction, signupError, dispatch } = useContext(GlobalContext);

    function handleSignup(e) {
        e.preventDefault();
        
        if((username && name && password && confirmPassword).trim() == ''){
            setHasEmptyFields(true);
            return
        }

        setHasEmptyFields(false);
        
        if( password.trim() != confirmPassword.trim()){
            setDiffentPassword(true);
            return
        }

        setDiffentPassword(false);

        signupAction(history, username, name, password);
    }

    function resetForm() {
        setHasEmptyFields(false);
        setDiffentPassword(false);
        dispatch({type: 'RESET_SIGNUP'});
    }

    return (
        <div className='form-container'>
            
            <form className='signup-form' onSubmit={(e) => handleSignup(e)}>

                { signupError ? <h3 className='signup-error-message'>{signupError}</h3>: null} 
                { hasEmptyFields ? <h3 className='signup-error-message'>Todos os campos devem ser preenchidos</h3>: null} 
                { diffentPassword ? <h3 className='signup-error-message'>As senhas devem ser iguais</h3>: null} 
                <input 
                type="text" 
                placeholder='Usuário'
                value={username}
                onChange={e => {setUsername(e.target.value)}}
                onFocus={resetForm}
                />
                <input 
                type="text" 
                placeholder='Nome'
                value={name}
                onChange={e => {setName(e.target.value)}}
                onFocus={resetForm}
                />
                <input 
                type="password"  
                placeholder='Senha'
                value={password}
                onChange={e => {setPassword(e.target.value)}}
                onFocus={resetForm}
                />
                <input 
                type="password"  
                placeholder='Confirmar Senha'
                value={confirmPassword}
                onChange={e => {setConfirmPassword(e.target.value)}}
                onFocus={resetForm}
                />


                <input 
                type="submit" 
                className='btn-signup' 
                value={!isSigningUp ? 'Cadastrar' : '...'}  
                disabled={isSigningUp ? true : false}  
                
                />
            </form>
        </div>
    )
}