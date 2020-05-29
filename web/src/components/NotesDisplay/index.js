import React, { useContext, useEffect } from 'react';
// import NotesList from '../NotesList';
import logo from '../../assets/logo.svg';
import styles from './styles.css';

import { FiPlusCircle } from 'react-icons/fi';

import CreateNoteModal from '../CreateNoteModal';
import Note from '../Note';

import { GlobalContext } from '../../context/GlobalState';

export default function NotesDisplay() {
    const { openCreateNote, notes, setMainNote, user } = useContext(GlobalContext);

    
    return (
        <div className='notes-display'>
            <header>
                <div className="header-top">
                    <img src={logo} alt="Logo"/>
                    <h1>Organize-me</h1>
                </div>

                <h2>Olá, { user.name.split(' ')[0] }</h2>
            </header>

            
            <div className="add-note">
                <p>Selecione uma nota ou crie uma nova</p>

                <FiPlusCircle size={24} color='#370588' onClick={openCreateNote} />
            </div>

            <div className="notes-container">
                { notes.map((note) =>{

                    return (
                        <Note 
                            key={note.id} 
                            id={note.id}
                            title={note.title} 
                            is_completed={note.is_completed}
                            content={note.content} 
                            text_content={note.text_content}
                            created_at={note.created_at} 
                            updated_at={note.updated_at} 

                            object={note}
                        />
                    )
                })}

            </div>


        </div>
    )
}
