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
    location, //May be needed for debugging issues related to coords
    accepting,
    pets,
    notes,
    supplyNeeds,
    volunteerNeeds,
    lastUpdated } = selectedMarker;
    console.log(location)
  const concatAddress = encodeURI(`${address} ${city}`)
  return (
    <div className={ toggledInfo ? 'info-box open' : 'info-box'}>
      <h2>{shelter}</h2>
      <div className='info-box-content'>
        <h4>
          <FontAwesome className="blueIcon" name="phone" />
          {phone ? <a href={`tel:${phone.replace(/\D/g,'')}`}>{phone}</a> : 'No Phone Number'}
        </h4>
        <h4>
          <FontAwesome className="blueIcon" name="map-marker" />
          <a href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">{address}</a>
        </h4>
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