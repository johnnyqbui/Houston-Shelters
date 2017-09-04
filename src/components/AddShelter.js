import React from 'react';
import '../App.css';
import FontAwesome from 'react-fontawesome'

const AddShelter = (props) => {
    return (
        <div className='add-shelter-container'>
            <p className='controls-font-grey'>Add Shelter</p>
            <button className='controls-button add-shelter-button'>
            <a href='http://harveyneeds.org/' target='_blank' rel='noopener noreferrer' >
                <FontAwesome className="add-shelter-icon" name="plus" />

            </a>
            </button>
        </div>
    )
}

export default AddShelter