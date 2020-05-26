import React, { ReactFragment, useState, useContext, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import * as draft from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Moment from 'moment';
import 'moment/locale/pt-br';

import { FiMoreVertical, FiPenTool } from 'react-icons/fi';

import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';


export default function MainNote() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty);

    const [editedMainNote, setEditedMainNote] = useState(null);
    const [createdDate, setCreatedDate] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    const [menuAchor, setMenuAchor] = useState(null);

    const { openCreateNote, mainNote, saveNote, saveNoteChangeState, logoutAction } = useContext(GlobalContext);
    
    
    useEffect( () => {
        if(!mainNote){
            return
        }

        if (editedMainNote){
            saveNote(editedMainNote, convertToRaw( editorState.getCurrentContent() ));
        }

        Moment.locale('pt-br');
        const created_at_date = Moment.unix(mainNote.created_at._seconds).format('LLL');
        const updated_at_date = Moment.unix(mainNote.updated_at._seconds).format('LLL');
        
        setCreatedDate(created_at_date);
        setUpdatedDate(updated_at_date);
        let newEditorState
        try {
            
            newEditorState = EditorState.createWithContent( convertFromRaw( JSON.parse(mainNote.content) ) );
        } catch (error) {
            newEditorState = EditorState.createEmpty();
        }
        setEditorState(newEditorState);
        
        setEditedMainNote(mainNote);

    }, [mainNote]);

    function handleMenuClose(e) {
        const id = e.currentTarget.id;
        switch (id) {
            case 'save-note-btn':
                saveNoteChangeState(mainNote, convertToRaw( editorState.getCurrentContent() ));
                break;
            case 'logout-btn':
                logoutAction();
                break
            default:
                break;
        }
        setMenuAchor(null);
    }
    return (
        <div className={mainNote? 'main-note': 'main-note' + ' flex-column'}>

            {(mainNote) ? 
            <>
                <div className="main-note-header">
                    <div className="text-wrapper">
                        <h2>{mainNote.title}</h2>
                        <span>Criada em {createdDate}, atualizada em { updatedDate }</span>
                    </div>
                    <FiMoreVertical className='more-menu' size={24} onClick={e => setMenuAchor(e.currentTarget)}/>
                </div>
                
                <Editor
                wrapperClassName='main-editor-wrapper'
                toolbarClassName='main-editor-toolbar'
                editorClassName='main-editor'

                editorState={editorState}
                onEditorStateChange={e => setEditorState(e)}
                
                /> 
            </>:
            <div className="create-note">
                <h2>Crie uma nota para começar</h2>
                <button onClick={openCreateNote} >
                    <FiPenTool size={24} />
                </button>
            </div>
            }
            
            <Menu
                id="more-menu"
                anchorEl={menuAchor}
                keepMounted
                open={Boolean(menuAchor)}
                onClose={handleMenuClose}
            >
                <MenuItem id='save-note-btn' onClick={e => handleMenuClose(e)}>Salvar</MenuItem>
                <MenuItem id='logout-btn' onClick={e => handleMenuClose(e)}>Sair</MenuItem>
            </Menu>
        </div>
    )
}
