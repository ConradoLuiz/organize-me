import React, { createContext, useReducer, useEffect } from 'react';

import AppReducer from './AppReducer';
import api from '../services/api';
import draftToText from '../utils/draft-to-text';

const initialState = {
    isLoggedIn: false,
    user: {},
    isLoggingIn: false,
    hasLoginError: false,
    isSigningUp: false,
    signupError: null,
    notes: [],
    hasSavedNote: false,
    isModalOpen: false,
    isCreatingNote: false,
    isLoadingNotes: false,
    mainNote: null
}

export const GlobalContext = createContext(initialState);

const localState = JSON.parse(localStorage.getItem('context'));


export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, localState || initialState);

    useEffect(() => {
        localStorage.setItem('context', JSON.stringify(state));
    }, [state]);

    function resetCachedState() {
        dispatch({
            type: 'RESET_GLOBAL_CACHED_STATE',
            payload: initialState
        })
        
    }

    function openCreateNote() { dispatch({ type: 'OPEN_MODAL' }) }

    function closeCreateNote() { dispatch({ type: 'CLOSE_MODAL' }) }

    function setUser(user) {
        dispatch({
            type: 'SET_USER',
            payload: user
        })
    }

    function checkLoginStatus() {
        return state.isLoggedIn;
    }

    async function loginAction( username, password ) {
        
        dispatch({type: 'ATTEMPT_LOGIN'});

        try{
            const response = await api.post('auth/login', {
                username,
                password
            });

            const user = {
                username: response.data.username,
                name: response.data.name,
                id: response.data.id,
                token: response.data.token
            }

            localStorage.setItem('JWT', response.data.token);

            dispatch({
                type: 'LOGIN',
                payload: user
            })

            

        } catch(error){
            
            dispatch({type: 'FAILED_LOGIN'});
        }

    }

    async function signupAction(username, name, password) {

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
                name,
                token: response.data.token
            }

            dispatch({
                type: 'LOGIN',
                payload: user
            });

            localStorage.setItem('JWT', response.data.token);
            
            
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

    function logoutAction() {
        resetCachedState();
        localStorage.removeItem('context');
        localStorage.removeItem('JWT');
    }

    async function createNoteAction(title) {
        dispatch({ type: 'ATTEMPT_CREATE_NOTE'});
        try {
            const data = { title };
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
            }
            const response = await api.post('notes/new', data, config);
            
            dispatch({
                type: 'CREATE_NOTE',
                payload: response.data
            });
            
        } catch (error) {
            if(error.response.status == 401){
                dispatch({type: 'FAILED_LOGIN'});
            }
            
        } finally{
            closeCreateNote();
        } 
    }

    async function loadNotes() {
        dispatch({type: 'LOADING_NOTES'});

        try {
            
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
            }
            const response = await api.get('notes/', config);
            
            
            dispatch({
                type: 'LOADED_NOTES',
                payload: response.data.notes
            });
            
        } catch (error) {

            if(error.response && error.response.status == 401){
                dispatch({type: 'FAILED_LOGIN'});
            }
            
        }
    }
    
    async function deleteNoteAction(id) {
        try {
            const data = { id };
            
            await api.delete('notes', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                },
                data
            });

            dispatch({
                type: 'DELETE_NOTE',
                payload: id
            });
            

        } catch (error) {
            
            if(error.response.status == 401){
                dispatch({type: 'FAILED_LOGIN'});
            }
            
            if(error.response.status == 503){
                dispatch({type: 'FAILED_DELETE_NOTE'});
            }
            
            
        }
    }

    async function completeNoteAction(id, status) {

      
        try{
            const body = {
                id,
                is_completed: status
            };

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
            }
            
            const response = await api.post('notes/save/status', body, config);
            
            dispatch({
                type: 'UPDATE_NOTE_STATUS',
                payload: {...response.data.updatedNote, id}
            });
            dispatch({
                type: 'SET_MAIN_NOTE_STATUS',
                payload: {...response.data.updatedNote, id}
            });
        } catch(error){

            if(error.response.status == 401){
                dispatch({type: 'FAILED_LOGIN'});
            }

        }
    }

    function setMainNote(note) {
        
        
        dispatch({
            type: 'SET_MAIN_NOTE',
            payload: note
        });
    }

    function resetSavedStatus() {
        dispatch({type: 'RESET_SAVED_STATUS'});
    }

    async function saveNoteChangeState(note, editorState) {
        const text_content = draftToText(editorState);
        
        const newNote = {
            ...note,
            content: JSON.stringify(editorState),
            text_content
        }
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
            }

            const response = await api.post('notes/save', newNote, config);
            dispatch({
                type: 'SET_MAIN_NOTE',
                payload: {
                    ...newNote,
                    updated_at: response.data.updatedNote.updated_at
                }
            });
            dispatch({
                type: 'UPDATE_NOTE',
                payload: {
                    ...newNote,
                    updated_at: response.data.updatedNote.updated_at
                }
            });

        } catch (error) {
            
            if(error.response.status == 401){
                dispatch({type: 'FAILED_LOGIN'});
            }
        }

    }

    async function saveNote(note, editorState) {
        const text_content = draftToText(editorState);
        
        const newNote = {
            ...note,
            content: JSON.stringify(editorState),
            text_content
        }
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('JWT')}`
                }
            }

            await api.post('notes/save', newNote, config);
            dispatch({
                type: 'SAVE_NOTE',
                payload: newNote
            });

        } catch (error) {
            
            if(error.response.status == 401){
                dispatch({type: 'FAILED_LOGIN'});
            }
        }

    }

    function saveMainNoteStatus() {
        dispatch({type: 'TOGGLE_MAIN_NOTE_STATUS'});
        // saveNoteChangeState(note, editorState);

    }

    return (
        <GlobalContext.Provider value={{
            dispatch,
            resetCachedState,
            notes: state.notes,
            hasSavedNote: state.hasSavedNote,
            resetSavedStatus,
            saveMainNoteStatus,
            completeNoteAction,
            user: state.user,
            setUser,
            checkLoginStatus,
            logoutAction,
            isLoggedIn: state.isLoggedIn,
            isLoggingIn: state.isLoggingIn,
            hasLoginError: state.hasLoginError,
            loginAction,
            isSigningUp: state.isSigningUp,
            signupError: state.signupError,
            signupAction,
            isModalOpen: state.isModalOpen,
            openCreateNote,
            closeCreateNote,
            createNoteAction,
            isCreatingNote: state.isCreatingNote,
            isLoadingNotes: state.isLoadingNotes,
            loadNotes,
            deleteNoteAction,
            mainNote: state.mainNote,
            setMainNote,
            saveNoteChangeState,
            saveNote
        }}>
            {children}
        </GlobalContext.Provider>
    );
}