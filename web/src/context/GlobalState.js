import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import api from '../services/api';


const initialState = {
    user: {},
    isLoggingIn: false,
    notes: []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);


    function loginAction(username, password) {
        
        dispatch({type: 'ATTEMPT_LOGIN'});

        try{
            // const response = api.post('auth/login', {
            //     username,
            //     password
            // });


        } catch(error){
            console.log(error);
            dispatch({type: 'FAILED_LOGIN'});
        }

    }

    return (
        <GlobalContext.Provider value={{
            user: state.user,
            isLoggingIn: state.isLoggingIn,
            notes: state.notes,
            loginAction
        }}>
            {children}
        </GlobalContext.Provider>
    );
}