import React from 'react';
// import NotesList from '../NotesList';
import logo from '../../assets/logo.svg';
import styles from './styles.css';

import { FiPlusCircle } from 'react-icons/fi';

import Note from '../Note';

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

            
            <div className="add-note">
                <p>Selecione uma tarefa ou crie uma nova</p>

                <FiPlusCircle size={24} color='#370588' />
            </div>

            <div className="notes-container">
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>

                <Note 
                    title={'Im a note'} 
                    description={'Simple description of a note, but these can get very complex, very quickly and they grow'} 
                    created_at={'21/05/2020 às 19:43h'}
                />
                <Note title={'Im a note'} description={''} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                
            </div>
        
        </div>
    )
}
