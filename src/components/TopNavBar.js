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
        <h2>Irma Response</h2>
        <p className="top-support">Call for help: <a href="tel:311">3-1-1</a></p>

    </div>
  )
}


export default TopNavBar