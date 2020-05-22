import React from 'react';
import { FiPlusCircle } from 'react-icons/fi';

import Note from '../Note';
import styles from './styles.css';

export default function NotesList() {
    return (
        <div className='notes-list'>
            <div className="add-note">
                <p>Selecione uma tarefa ou crie uma nova</p>

                <FiPlusCircle size={24} color='#370588' />
            </div>

            <div className="notes-container">
                
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
                <Note title={'Im a note'} description={'Simple description of a note'} created_at={'21/05/2020 às 19:43h'}/>
            </div>
        </div>
    )
}
