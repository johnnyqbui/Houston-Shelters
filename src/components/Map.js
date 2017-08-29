import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const Map = withScriptjs(
	withGoogleMap(props => {
		const { shelters, currentLocation, onMarkerClick, onMarkerClose } = props;
		const acceptingPeople = (accepting) => {
			if (accepting === 'true') {
				return 'Yes'
			} else if (accepting === 'false') {
				return 'No'
			} else {
				return 'Did Not Respond/Unknown'
			}
		}

		return (
		<GoogleMap
			ref={props.onMapLoad}
			defaultZoom={ currentLocation ? 12 : 10 }
    		defaultCenter={ currentLocation ? currentLocation : { lat: 29.760427, lng: -95.369803 } }
    	>
        	{shelters.map((shelter, index) => {
        		const { county, name, address, phone, location, accepting, pets, notes, supplyNeeds, volunteerNeeds } = shelter;

        		return (
        			<Marker
	        			key={index}
	        			position={{
	        					lat: shelter.location.lat,
	        					lng: shelter.location.lng
	        			}}
	        			onClick={() => onMarkerClick(shelter)}
	        		>
	        		{console.log(shelter)}
	        		{shelter.showInfo && (
			          <InfoWindow onCloseClick={() => onMarkerClose(shelter)}>
			            <div style={{fontSize: '14px'}}>
				            <p><span style={{fontWeight: 'bold'}}>County:</span> {county}<br/>
				            <span style={{fontWeight: 'bold'}}>{name}</span><br/>
				            {address}<br/>
				            {phone ? phone : 'No Phone Number'}<br/></p>
				            <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> { acceptingPeople(accepting) }<br/>
				            <span style={{fontWeight: 'bold'}}>Pets?</span> { pets ? pets : 'Unkonwn' }<br/><br/>
				            <span style={{fontWeight: 'bold'}}>Notes:</span> {notes}<br/>
				            <span style={{fontWeight: 'bold'}}>Supply Needs:</span> {supplyNeeds}<br/>
				            <span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {volunteerNeeds}
				            </p>


			            </div>
			          </InfoWindow>
			        )}
	        		</Marker>
        		)
        	})}
		</GoogleMap>
		)}
	)
)

export default Map