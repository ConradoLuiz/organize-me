import React, { useContext, useEffect, useState } from 'react';
import Moment from 'moment';
import 'moment/locale/pt-br';
import { FiTrash, FiCheck, FiX } from 'react-icons/fi';

import { useDesktop } from '../../utils/mediaQueries';
import { useHistory } from 'react-router-dom';

import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';


export default function Note({ id, title, is_completed, content, text_content, created_at, updated_at, object: noteObject}) {
    const [created_at_date, setCreated_at_date] = useState(null);
    const [updated_at_date, setUpdated_at_date] = useState(null);

    const { deleteNoteAction, setMainNote, completeNoteAction } = useContext(GlobalContext);

    const isDesktop = useDesktop();
    const history = useHistory();

    function handleDelete(e) {
        e.stopPropagation();
        
        deleteNoteAction(id);
    }

    function handleComplete(e) {
        e.stopPropagation();
        
        completeNoteAction(id, !is_completed);
    }

    function handleClick(e) {
        
        setMainNote(noteObject);

        if(!isDesktop){
            history.push('/notes/edit');
        }
    }

    useEffect( () => {
        
        Moment.locale('pt-br');
        
        if(created_at)
            setCreated_at_date(Moment.unix(created_at._seconds));

        if(updated_at)
            setUpdated_at_date(Moment.unix(updated_at._seconds));
    }, [created_at, updated_at])

    return (
        <div className='note' onClick={(e) => handleClick(e)}>
            <h4 className='note-title'>
                <strong>
                    { title }
                </strong>
            </h4>
            
            <h5 className='note-description'>{ text_content }</h5>
            <h6 className='note-created'>Atualizada em { updated_at_date && updated_at_date.format('LLL') }</h6>

            <div className="buttons">
                <button className='note-delete' onClick={e => handleDelete(e)}>
                    <FiTrash size={18} color='var(--accent-color)' />
                </button>
                <button className={is_completed ? 'note-completed ' + 'note-complete' : 'note-complete'} onClick={e => handleComplete(e)}>
                    {is_completed ? <FiX size={18} color='var(--accent-color)' /> : <FiCheck size={18} color='var(--accent-color)'/>}
                </button>
            </div>
        </div>
        
    )
}
