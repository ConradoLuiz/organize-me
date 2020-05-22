import React from 'react';
import NotesList from '../NotesList';
import logo from '../../assets/logo.svg';
import styles from './styles.css';

export default function NotesDisplay() {
    return (
        <div className='notes-display'>
            <header>
                <div className="header-top">
                    <img src={logo} alt="Logo"/>
                    <h1>Organize-me</h1>
                </div>

                <h2>Olá, Conrado</h2>
            </header>

            <NotesList/>
        </div>
    )
}
