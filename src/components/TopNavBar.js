import React from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import Logo from '../images/hurricane.png'

import config from '../config';
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

const typeToInstruction = {
  sms: 'Text',
  tel: 'Call'
};

const NumberNotice = (props) => {
  if (props.number && props.type) {
    return (<p className="top-support">
      {typeToInstruction[props.type]} for help: <a href={`${props.type}:${props.number.replace(/\D/g,'')}`}>{props.number}</a>
    </p>);
  } else {
    return null;
  }
}


const TopNavBar = (props) => {
  return (
    <div className='top-navbar'>
        <h2><img src={Logo} /> {config.about.title}</h2>
        {Object.entries(config.helpNumber).map((entry) => {
          return (<NumberNotice type={entry[0]} number={entry[1]}/>);
        })}
    </div>
  )
}


export default TopNavBar

