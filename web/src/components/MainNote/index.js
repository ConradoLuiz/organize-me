import React, { ReactFragment, useState, useContext, useEffect } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import * as draft from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import Moment from 'moment';
import 'moment/locale/pt-br';

import { FiMoreVertical, FiPenTool, FiSave, FiCheck, FiX } from 'react-icons/fi';

import styles from './styles.css';

import { GlobalContext } from '../../context/GlobalState';


export default function MainNote() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty);

    const [editedMainNote, setEditedMainNote] = useState(null);
    const [createdDate, setCreatedDate] = useState('');
    const [updatedDate, setUpdatedDate] = useState('');

    const [menuAchor, setMenuAchor] = useState(null);

    const { dispatch, openCreateNote, mainNote, saveNote, saveNoteChangeState, logoutAction, hasSavedNote, resetSavedStatus, saveMainNoteStatus, completeNoteAction } = useContext(GlobalContext);
    
    
    useEffect( () => {
        if(!mainNote){
            return
        }

        // if(editedMainNote && (editedMainNote.id == mainNote.id)){
        //     return
        // }

        if (editedMainNote && editedMainNote.id != mainNote.id){
            saveNote(editedMainNote, convertToRaw( editorState.getCurrentContent() ));
        }

        Moment.locale('pt-br');
        const created_at_date = Moment.unix(mainNote.created_at._seconds).format('LLL');
        const updated_at_date = Moment.unix(mainNote.updated_at._seconds).format('LLL');
        
        setCreatedDate(created_at_date);
        setUpdatedDate(updated_at_date);
        let newEditorState;
        try {
            
            newEditorState = EditorState.createWithContent( convertFromRaw( JSON.parse(mainNote.content) ) );
        } catch (error) {
            newEditorState = EditorState.createEmpty();
        }
        setEditorState(newEditorState);
        
        setEditedMainNote(mainNote);

    }, [mainNote]);

    function handleSave() {
        saveNoteChangeState(mainNote, convertToRaw( editorState.getCurrentContent() ));
    }

    function handleNoteStatus() {
        setEditedMainNote({
            ...editedMainNote,
            is_completed: !editedMainNote.is_completed
        });
        
        completeNoteAction(mainNote.id, !mainNote.is_completed);
        
    }

    function handleMenuClose(e) {
        const id = e.currentTarget.id;
        switch (id) {
            case 'save-note-btn':
                handleSave();
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
                    <div className="actions-wrapper">
                        {/* {mainNote.is_completed ? <FiX size={24} className='more-menu' onClick={handleNoteStatus} /> : <FiCheck size={24} className='more-menu' onClick={handleNoteStatus} />} */}
                        <Switch
                            checked={mainNote.is_completed}
                            onChange={handleNoteStatus}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        <FiSave size={24} className='save-btn' onClick={handleSave} />
                        <FiMoreVertical className='more-menu' size={24} onClick={e => setMenuAchor(e.currentTarget)}/>
                    </div>
                </div>
                
                <Editor
                wrapperClassName='main-editor-wrapper'
                toolbarClassName='main-editor-toolbar'
                editorClassName='main-editor'

                editorState={editorState}
                onEditorStateChange={e => setEditorState(e)}
                
                /> 

                <Snackbar 
                open={hasSavedNote}  
                autoHideDuration={3000} 
                onClose={resetSavedStatus}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                >
                    <Alert  severity="success">
                        Nota salva com sucesso
                    </Alert>
                </Snackbar>
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
