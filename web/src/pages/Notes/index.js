import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NotesDisplay from '../../components/NotesDisplay';
import MainNote from '../../components/MainNote';
import CreateNoteModal from '../../components/CreateNoteModal';
import Alert from '../../components/Alert';

import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';


export default function Notes() {
    const [isDesktop, setIsDesktop] = useState(true);

    const history = useHistory();

    const { loadNotes, isLoggedIn, notes } = useContext(GlobalContext);

    useEffect( () => {
        loadNotes();
    }, []);

    return (
        <div className='notes-page'>

            <div className={(isDesktop)? 'main-content main-content-desktop' : 'main-content'}>
                <NotesDisplay className='notes-selection'/>

                <MainNote className='main-note'/>
            </div>
            
            {/* MODAL TO CREATE NEW NOTE */}
            <CreateNoteModal />

            {!isLoggedIn && <Alert severity='error' text='Você precisa logar para fazer essa ação' callback={() => {history.push('/')}}/>}

        </div>
    )
}
