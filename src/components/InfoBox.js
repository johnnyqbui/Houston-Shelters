import React from 'react'
import '../App.css';

const InfoBox = (props) => {

  const { selectedMarker, toggledInfo } = props;
  const {
    shelter,
    address,
    city,
    phone,
    location, //May be needed for debugging issues related to coords
    accepting,
    pets,
    notes,
    supplyNeeds,
    volunteerNeeds,
    lastUpdated } = selectedMarker;

  const concatAddress = encodeURI(`${address} ${city}`)

  return (
    <div id="nodeinfo" className={ toggledInfo ? 'info-bar open' : 'info-bar'}>
      <h2>{shelter}</h2>
      <h4>{phone ? <a href={`tel:${phone.replace(/\D/g,'')}`}>{phone}</a> : 'No Phone Number'}</h4>
      <h4><a href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">Get Directions</a></h4>
      <br/>
      <p><span style={{fontWeight: 'bold'}}>Updated:</span> {lastUpdated}</p>
        <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> {accepting ? 'Yes' : 'No' }</p>
        <p><span style={{fontWeight: 'bold'}}>Pets Allowed?</span> {pets ? pets : 'Unknown'}</p>
        <p><span style={{fontWeight: 'bold'}}>Notes:</span> {notes}</p>
        <p><span style={{fontWeight: 'bold'}}>Supply Needs:</span> {supplyNeeds}</p>
        <p><span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {volunteerNeeds}</p>
    </div>
  )

}

export default InfoBox