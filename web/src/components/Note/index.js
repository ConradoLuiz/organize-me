import React from 'react';

import styles from './styles.css';

export default function Note({ title, description, created_at}) {
    return (
        <div className='note'>
            <h4>
                <strong>
                    { title }
                </strong>
            </h4>

            <h5>{ description }</h5>
            <h6>Criada em { created_at }</h6>

        </div>
    )
}
