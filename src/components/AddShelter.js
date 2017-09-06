import React from 'react';
import '../App.css';
import GoPlus from 'react-icons/lib/go/plus'

const AddShelter = (props) => {
    return (
        <div className='add-shelter-container'>
            <p className='controls-font-grey'>Add Shelter</p>
            <button className='controls-button add-shelter-button'>
            <a href='http://harveyneeds.org/' target='_blank' rel='noopener noreferrer' >
                <GoPlus className="add-shelter-icon" />

            </a>
            </button>
        </div>
    )
}

export default AddShelter