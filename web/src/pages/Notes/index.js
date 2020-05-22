import React, { useState } from 'react';

import NotesDisplay from '../../components/NotesDisplay';
import MainNote from '../../components/MainNote';

import styles from './styles.css';

export default function Notes() {
    const [isDesktop, setIsDesktop] = useState(true);

    return (
        <div className='notes-page'>

            <div className={(isDesktop)? 'main-content main-content-desktop' : 'main-content'}>
                <NotesDisplay className='notes-selection'/>

                <MainNote className='main-note'/>
            </div>
            
        </div>
    )
}
