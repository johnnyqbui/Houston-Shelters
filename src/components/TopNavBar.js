import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';

// will add for later

// <div className='top-navbar-dropdown'>
//     <ul>
//         <li><Link to='/'>Shelters</Link></li>
//         <li><Link to='/donations'>Donations</Link></li>
//         <li><Link to='/volunteers'>Volunteers</Link></li>
//         <li><Link to='/long-term-housing'>Long-Term Housing</Link></li>
//         <li><Link to='/credits'>About</Link></li>
//     </ul>
// </div>

// Text support to find neartes shelter
// <p className="top-support">Text for help: <a href="sms:3462140739">346-214-0739</a></p>
const TopNavBar = (props) => {

  return (
    <div className='top-navbar'>
        <h2>Irma Response</h2>
        <p className="top-support">Call for help: <a href="tel:311">3-1-1</a></p>
    </div>
  )
}


export default TopNavBar

