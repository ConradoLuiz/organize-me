import React from 'react';
import { FiTrash, FiCheck } from 'react-icons/fi';
import styles from './styles.css';

export default function Note({ title, description, created_at}) {
    return (
        <div className='note'>
            <h4 className='note-title'>
                <strong>
                    { title }
                </strong>
            </h4>

            <h5 className='note-description'>{ description }</h5>
            <h6 className='note-created'>Criada em { created_at }</h6>

            <div className="buttons">
                <button className='note-delete'>
                    <FiTrash size={18} />
                </button>
                <button className='note-complete'>
                    <FiCheck size={18} />
                </button>
            </div>
        </div>
    )
}
