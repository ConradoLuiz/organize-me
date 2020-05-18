import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';


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

        setTimeout(() => {
            dispatch({type: 'FAILED_LOGIN'});
        }, 700);
 
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