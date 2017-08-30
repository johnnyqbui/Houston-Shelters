import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const Lmap = (props) => {
	const { shelters, viewport, currentLocation } = props;
	return (
		<Map className='map' viewport={ viewport } animate={true}>
			<TileLayer
			  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
			  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}
			{shelters.map((shelter, index) => {
        		const { county, name, address, phone, location, accepting, pets, notes, supplyNeeds, volunteerNeeds, lastUpdated } = shelter;

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
        			<Marker
	        			key={index}
	        			position={[location.lat, location.lng]}
	        		>
					<Popup >
						<div style={{fontSize: '14px'}}>
						    <p><span style={{fontWeight: 'bold'}}>County:</span> {county}<br/><br/>
						    <span style={{fontWeight: 'bold'}}>{name}</span><br/>
						    {address}<br/>
						    {phone ? phone : 'No Phone Number'}<br/></p>
						    <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> { acceptingPeople(accepting) }<br/>
						    <span style={{fontWeight: 'bold'}}>Pets?</span> { pets ? pets : 'Unkonwn' }<br/><br/>
						    <span style={{fontWeight: 'bold'}}>Notes:</span> {notes}<br/>
						    <span style={{fontWeight: 'bold'}}>Supply Needs:</span> {supplyNeeds}<br/>
						    <span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {volunteerNeeds}<br/><br/>
						    <span style={{fontWeight: 'bold'}}>Last Updated:</span> {lastUpdated}
						    </p>
						</div>
					</Popup>
	        		</Marker>
        		)
    		})}
		</Map>
	)
}

export default Lmap