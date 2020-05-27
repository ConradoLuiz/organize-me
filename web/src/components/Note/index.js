import React, { useContext } from 'react';
import Moment from 'moment';
import 'moment/locale/pt-br';
import { FiTrash, FiCheck, FiX } from 'react-icons/fi';
import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';

export default function Note({ id, title, is_completed, content, text_content, created_at, updated_at, object: noteObject}) {
    
    const { deleteNoteAction, setMainNote } = useContext(GlobalContext);

    Moment.locale('pt-br');
    const created_at_date = Moment.unix(created_at._seconds);
    const updated_at_date = Moment.unix(updated_at._seconds);
    
    function handleDelete(e) {
        e.stopPropagation();
        
        deleteNoteAction(id);
    }

    function handleClick(e) {
        
        setMainNote(noteObject);
    }

    return (
        <div className='note' onClick={(e) => handleClick(e)}>
            <h4 className='note-title'>
                <strong>
                    { title }
                </strong>
            </h4>
            
            <h5 className='note-description'>{ text_content }</h5>
            <h6 className='note-created'>Atualizada em { updated_at_date.format('LLL') }</h6>

            <div className="buttons">
                <button className='note-delete' onClick={e => handleDelete(e)}>
                    <FiTrash size={18} />
                </button>
                <button className={is_completed ? 'note-completed ' + 'note-complete' : 'note-complete'}>
                    {is_completed ? <FiX size={18} /> : <FiCheck size={18} />}
                </button>
            </div>
        </div>
    )
}
