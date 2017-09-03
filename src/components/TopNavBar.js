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
        <p className="top-support">Text us for help: 713-123-1233</p>

    </div>
  )
}


export default TopNavBar