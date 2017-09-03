import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

const TopNavBar = (props) => {
	       //  <div className='top-navbar-dropdown'>
        // 	<select>
        // 		<option>Shelters</option>
        // 		<option>Donations</option>
        // 		<option>Volunteers</option>
        // 		<option>Long-Term Housing</option>
        // 	</select>
        // </div>
  return (
    <div className='top-navbar'>
        <h2>Harvey Relief</h2>
        <p className="top-support">Text for help: <a href="sms:3462140739">346-214-0739</a></p>

    </div>
  )
}


export default TopNavBar