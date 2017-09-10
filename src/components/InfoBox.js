import React from 'react';
import moment from 'moment';
import '../App.css';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import Highlighter from 'react-highlight-words';

const InfoBox = (props) => {

    const { selectedMarker, toggledInfo, query } = props;
    let {
        shelter,
        address,
        city,
        phone,
        cleanPhone,
        // location, //May be needed for debugging issues related to coords
        accepting,
        pets,
        pets_notes,
        notes,
        supplyNeeds,
        volunteerNeeds,
        county,
        lastUpdated,
        specialNeeds
    } = selectedMarker;

    // Validate info
    shelter = shelter ? shelter : ''
    address = address ? address : ''
    city = city ? city : ''
    county = county ? county : ''
    notes = notes ? notes : ''
    supplyNeeds = supplyNeeds ? supplyNeeds : ''
    volunteerNeeds = volunteerNeeds ? volunteerNeeds : ''

    const concatAddress = encodeURI(`${address} ${city}`)

    const arrQuery = query.indexOf(' ') > -1 ? query.split(' ') : [query]

    // Highlight found text
    const highlightText = (info) => {
        return (
            <Highlighter
                searchWords = { arrQuery }
                textToHighlight = { info }
            />
        )
    }


    const notesTag = (notes) => {


        if (notes) {
          return (<p><span style={{fontWeight: 'bold'}}>Notes:</span> {highlightText(notes)}</p>)
        }
        else {
          return (<div></div>)
        }
    }

    const supplyTag = (supplyNeeds) => {
        if (supplyNeeds) {
          return (<p><span style={{fontWeight: 'bold'}}>Supply Needs:</span> {highlightText(supplyNeeds)}</p>)
        }
        else {
          return (<div></div>)
        }
    }

    const volunteerTag = (volunteerNeeds) => {
        if (volunteerNeeds) {
          return (
            <p><span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {highlightText(volunteerNeeds)}</p>
          )
        }
        else {
          return (<div></div>)
        }
    }

    return (
        <div className={ toggledInfo ? 'info-box open' : 'info-box'}>
            <h2>{highlightText(shelter)}</h2>
            <div className='info-box-content'>
                <p>
                    <FaPhone className="blueIcon" />
                    {phone ? <a href={`tel:${cleanPhone}`}>{phone}</a> : 'No Phone Number'}
                </p>
                <p>
                    <FaMapMarker className="blueIcon" />
                    <a href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">
                        {highlightText(address)}, {highlightText(city)}
                    </a> {county ? highlightText(county) : ''}
                </p>
                <br/>
                <p><span style={{fontWeight: 'bold'}}>Updated:</span> {moment(lastUpdated).format('L LT')}</p>
                <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> {accepting ? 'Yes' : 'No' }</p>
                <p><span style={{fontWeight: 'bold'}}>Pets Allowed?</span> {pets ? pets : 'Unknown'} {pets_notes ? pets_notes : ''}</p>
                <p><span style={{fontWeight: 'bold'}}>Special Needs:</span> {specialNeeds ? 'Available': 'Unavailable'}</p>
              {notesTag(notes)}
              {supplyTag(supplyNeeds)}
              {volunteerTag(volunteerNeeds)}

            </div>
        </div>
    )
}

export default InfoBox
