import React, { ReactFragment, useState, useContext } from 'react';

import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import { FiMoreVertical, FiPenTool } from 'react-icons/fi';
import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';

export default function MainNote() {


    const { openCreateNote, mainNote } = useContext(GlobalContext);


    return (
        <div className={mainNote? 'main-note': 'main-note' + ' flex-column'}>

            {(mainNote) ? 
            <>
                <div className="main-note-header">
                    <div className="text-wrapper">
                        <h2>{mainNote.title}</h2>
                        <span>Criada em 22/05/2020</span>
                    </div>
                    <FiMoreVertical className='more-menu' size={24} />
                </div>
                
                <Editor
                wrapperClassName='main-editor-wrapper'
                toolbarClassName='main-editor-toolbar'
                editorClassName='main-editor'
                /> 
            </>:
            <div className="create-note">
                <h2>Crie uma nota para começar</h2>
                <button onClick={openCreateNote} >
                    <FiPenTool size={24} />
                </button>
            </div>
            }
            
        </div>
    )
}
