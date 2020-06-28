import React, { useContext, useEffect, useState } from 'react';
// import NotesList from '../NotesList';
import logo from '../../assets/logo.svg';
import styles from './styles.css';

import { FiPlusCircle, FiMoreVertical } from 'react-icons/fi';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import CreateNoteModal from '../CreateNoteModal';
import Note from '../Note';

import { useDesktop } from '../../utils/mediaQueries';
import { ThemeContext } from '../../context/themeContext';

import { GlobalContext } from '../../context/GlobalState';

export default function NotesDisplay() {
    const { openCreateNote, notes, setMainNote, user, logoutAction } = useContext(GlobalContext);
    
    const { setTheme } = useContext(ThemeContext);

    const isDesktop = useDesktop();

    const [menuAchor, setMenuAchor] = useState(null);

    function handleMenuClose(e) {
        const id = e.currentTarget.id;
        switch (id) {
            case 'logout-btn':
                logoutAction();
                break
            case 'change-theme':
                setTheme(
                    (localStorage.getItem('theme') == 'dark-theme' ? 'light-theme' : 'dark-theme')
                );
                break
            default:
                break;
        }
        setMenuAchor(null);
    }

    return (
        <div className='notes-display'>
            <header>
                <div className={isDesktop ? "header-top" : 'header-top ' + 'header-top-small'}>
                    <img src={logo} alt="Logo" />
                    <h1>Organize-me</h1>
                </div>

                <div className={!isDesktop && "header-bottom" || undefined}>
                    <h2>Olá, {user.name.split(' ')[0]}</h2>
                    {!isDesktop && <FiMoreVertical className='more-menu' size={24} onClick={e => setMenuAchor(e.currentTarget)} />}
                </div>
            </header>


            <div className="add-note">
                <p>Selecione uma nota ou crie uma nova</p>

                <FiPlusCircle size={24} color='var(--accent-color)' onClick={openCreateNote} />
            </div>

            <div className="notes-container">
                {notes.map((note) => {

                    return (
                        <Note
                            key={note.id}
                            id={note.id}
                            title={note.title}
                            is_completed={note.is_completed}
                            content={note.content}
                            text_content={note.text_content}
                            created_at={note.created_at}
                            updated_at={note.updated_at}

                            object={note}
                        />
                    )
                })}

            </div>

            <Menu
                id="more-menu"
                anchorEl={menuAchor}
                keepMounted
                open={Boolean(menuAchor)}
                onClose={handleMenuClose}
            >

                <MenuItem id='change-theme' onClick={e => handleMenuClose(e)}>Mudar tema</MenuItem>
                <MenuItem id='logout-btn' onClick={e => handleMenuClose(e)}>Sair</MenuItem>
            </Menu>
        </div>
    )
}
