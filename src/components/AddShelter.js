import React from 'react';
import '../App.css';
import GoPlus from 'react-icons/lib/go/plus'

import config from '../config';

const AddShelter = (props) => {
    return (
        <div className='add-shelter-container'>
            <p className='controls-font-grey'>Add Shelter</p>
            <button className='controls-button add-shelter-button'>
            <a href={config.api.dataEntryPortal} target='_blank' rel='noopener noreferrer' >
                <GoPlus className="add-shelter-icon" />
            </a>
            </button>
        </div>
    )
}

export default AddShelter