import React from 'react'
import '../App.css';
import FontAwesome from 'react-fontawesome'

const InfoBox = (props) => {

  const { selectedMarker, toggledInfo } = props;
  const {
    shelter,
    address,
    city,
    phone,
    cleanPhone,
    // location, //May be needed for debugging issues related to coords
    accepting,
    pets,
    notes,
    supplyNeeds,
    volunteerNeeds,
    county,
    lastUpdated } = selectedMarker;
  const concatAddress = encodeURI(`${address} ${city}`)
  return (
    <div className={ toggledInfo ? 'info-box open' : 'info-box'}>
      <h2>{shelter}</h2>
      <div className='info-box-content'>
        <p>
          <FontAwesome className="blueIcon" name="phone" />
          {phone ? <a href={`tel:${cleanPhone}`}>{phone}</a> : 'No Phone Number'}
        </p>
        <p>
          <FontAwesome className="blueIcon" name="map-marker" />
          <a href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">{address}, {city}</a> ({county} County)
        </p>
        <br/>
        <p><span style={{fontWeight: 'bold'}}>Updated:</span> {lastUpdated}</p>
          <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> {accepting ? 'Yes' : 'No' }</p>
          <p><span style={{fontWeight: 'bold'}}>Pets Allowed?</span> {pets ? pets : 'Unknown'}</p>
          <p><span style={{fontWeight: 'bold'}}>Notes:</span> {notes}</p>
          <p><span style={{fontWeight: 'bold'}}>Supply Needs:</span> {supplyNeeds}</p>
          <p><span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {volunteerNeeds}</p>
      </div>
    </div>
  )
}

export default InfoBox