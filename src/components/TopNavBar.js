import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

const TopNavBar = (props) => {

  return (
    <div className='top-navbar'>
        <h2>Harvey Relief</h2>
            <div className='top-navbar-dropdown'>
                <ul>
                    <li><Link to='/shelters'>Shelters</Link></li>
                    <li><Link to='/donations'>Donations</Link></li>
                    <li><Link to='/volunteers'>Volunteers</Link></li>
                    <li><Link to='/long-term-housing'>Long-Term Housing</Link></li>
                </ul>
            </div>
        <p className="top-support">Text for help: <a href="sms:3462140739">346-214-0739</a></p>
    </div>
  )
}


export default TopNavBar