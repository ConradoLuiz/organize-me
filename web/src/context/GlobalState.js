import React, { createContext, useReducer } from 'react';
    import { useHistory } from 'react-router-dom'

import AppReducer from './AppReducer';
import api from '../services/api';


const initialState = {
    user: {},
    isLoggingIn: false,
    hasLoginError: false,
    isSigningUp: false,
    signupError: null,
    notes: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


    async function loginAction(history, username, password) {
        
        dispatch({type: 'ATTEMPT_LOGIN'});

        try{
            const response = await api.post('auth/login', {
                username,
                password
            });

            const user = {
                username: response.data.username,
                id: response.data.id,
                token: response.data.token
            }

            localStorage.setItem('JWT', response.data.token);

            dispatch({
                type: 'LOGIN',
                payload: user
            })

            history.push('/notes');

        } catch(error){
            console.log(error.response);
            dispatch({type: 'FAILED_LOGIN'});
        }

    }

    async function signupAction(history, username, name, password) {

        dispatch({type: 'ATTEMPT_SIGNUP'});

        try{
            const response = await api.post('auth/signup',{
                username,
                name,
                password
            });

            const user = {
                username: response.data.username,
                id: response.data.id,
                token: response.data.token
            }

            dispatch({
                type: 'LOGIN',
                payload: user
            });

            localStorage.setItem('JWT', response.data.token);

            setTimeout(() => {
                return
            }, 2000)
            
            history.push('/notes');

        } catch(error){

            console.log(error.response);
            console.log(error.response.data.message);
            
            let error_message = '';

            if(error.response.data.message.includes('password')){
                error_message = 'A senha deve ter pelo menos 10 caracteres'
            }

            if(error.response.data.message.includes('Username')){
                error_message = 'Esse nome de usuário não está disponível'
            }

            dispatch({
                type: 'FAILED_SIGNUP',
                payload: error_message
            });

        }
    }

    return (
        <GlobalContext.Provider value={{
            dispatch,
            notes: state.notes,
            user: state.user,
            isLoggingIn: state.isLoggingIn,
            hasLoginError: state.hasLoginError,
            loginAction,
            isSigningUp: state.isSigningUp,
            signupError: state.signupError,
            signupAction
        }}>
            {children}
        </GlobalContext.Provider>
    );
}