import React, { useContext } from 'react';
import Moment from 'moment';
import { FiTrash, FiCheck } from 'react-icons/fi';
import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';

export default function Note({ id, title, content, text_content, created_at, updated_at, object}) {
    
    const { deleteNoteAction, setMainNote } = useContext(GlobalContext);

    Moment.locale();
    const created_at_date = Moment.unix(created_at._seconds);
    const updated_at_date = Moment.unix(updated_at._seconds);
    
    function handleDelete() {
        
        deleteNoteAction(id);
    }

    return (
        <div className='note' onClick={() => setMainNote(object)}>
            <h4 className='note-title'>
                <strong>
                    { title }
                </strong>
            </h4>
            
            <h5 className='note-description'>{ text_content }</h5>
            <h6 className='note-created'>Atualizada em { updated_at_date.format('LLL') }</h6>

            <div className="buttons">
                <button className='note-delete' onClick={handleDelete}>
                    <FiTrash size={18} />
                </button>
                <button className='note-complete'>
                    <FiCheck size={18} />
                </button>
            </div>
        </div>
    )
}
