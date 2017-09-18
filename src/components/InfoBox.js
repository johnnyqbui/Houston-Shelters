import React from 'react';
import moment from 'moment';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import FaRefresh from 'react-icons/lib/fa/refresh';
import Highlighter from 'react-highlight-words';
import FacebookProvider, { Comments } from 'react-facebook';
import config from '../config';

const InfoBox = (props) => {

    const { selectedMarker, toggledInfo, query } = props;
    let {
        id,
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
    lastUpdated = lastUpdated ? lastUpdated : ''

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

    const lastUpdatedTag = (notes) => {
        if (notes) {
          return (<p><span style={{fontWeight: 'bold'}}>Updated:</span> {moment(lastUpdated).format('L LT')}</p>)
        }
        else {
          return (<div></div>)
        }
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

    const petsNotesTag = (pets_notes) => {
      if (pets_notes) {
        return (
          <p><span style={{fontWeight: 'bold'}}>Notes about Pets:</span> {highlightText(pets_notes)}</p>
        )
      }
      else {
        return (<div></div>)
      }
    }

    const facebookUrl = (id) => {
        return(
          `${config.meta.url}shelters/${id}`
        )
    }

    const updateUrl = (id) => {
        return(
          `${config.api.dataEntryPortal}/shelters/${id}/edit`
        )
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
                    </a> {county ? highlightText(county) : ``}
                </p>
                <p><FaRefresh className="blueIcon" />
                    <a className="update-shelter-button" target="_blank"
                       href={updateUrl(id)} style={{fontWeight: 'bold'}}>Submit a Status Update</a></p>
                <br/>
                {lastUpdatedTag(lastUpdated)}
                {supplyTag(supplyNeeds)}
                {volunteerTag(volunteerNeeds)}
                {notesTag(notes)}
                <FacebookProvider appId={config.facebook.app_id}>
                    <Comments href={facebookUrl(id)} width="100%"/>
                </FacebookProvider>

                <br/>
            </div>
        </div>
    )
}

// These info are not needed at this stage of shelter map
// Shelter Info
// <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> {accepting ? 'Yes' : 'No' }</p>
// <p><span style={{fontWeight: 'bold'}}>Pets Allowed?</span> {pets ? pets : 'Unknown'}</p>
// {petsNotesTag(pets_notes)}
// <p><span style={{fontWeight: 'bold'}}>Special Needs:</span> {specialNeeds ? 'Available': 'Unavailable'}</p>


export default InfoBox
