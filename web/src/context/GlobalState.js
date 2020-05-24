import React, { createContext, useReducer } from 'react';

import AppReducer from './AppReducer';
import api from '../services/api';


const initialState = {
    isLoggedIn: false,
    user: {},
    isLoggingIn: false,
    hasLoginError: false,
    isSigningUp: false,
    signupError: null,
    notes: [],
    isModalOpen: false
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


    async function loginAction( username, password ) {
        
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

            // history.push('/notes');

        } catch(error){
            
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

            let error_message = error.response.data.message;

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

    function openCreateNote() { dispatch({ type: 'OPEN_MODAL' }) }

    function closeCreateNote() { dispatch({ type: 'CLOSE_MODAL' }) }

    return (
        <GlobalContext.Provider value={{
            dispatch,
            notes: state.notes,
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            isLoggingIn: state.isLoggingIn,
            hasLoginError: state.hasLoginError,
            loginAction,
            isSigningUp: state.isSigningUp,
            signupError: state.signupError,
            signupAction,
            isModalOpen: state.isModalOpen,
            openCreateNote,
            closeCreateNote
        }}>
            {children}
        </GlobalContext.Provider>
    );
}