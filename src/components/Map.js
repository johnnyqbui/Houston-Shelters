import React from 'react';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

const Lmap = (props) => {
	const { markers, viewport, currentLocation } = props;
	const checkAccepting = (accepting) => {
		if (accepting === 'TRUE') {
			return 'Yes'
		} else if (accepting === 'FALSE') {
			return 'No'
		} else {
			return 'Did Not Respond/Unknown'
		}
	}

	const applyFilter = (marker) => {

		// const {
		// 	accepting,
		// 	pets,
		// 	supplyNeeds,
		// 	volunteerNeeds,
		// 	lastUpdated } = marker;

		// accepting === 'TRUE'
	}

	return (
		<Map className='map' viewport={ viewport } animate={true} >
			<TileLayer
			  url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
			  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
			/>
			{currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}
			{markers.map((marker, index) => {
        		const {
					county,
					name,
					address,
					phone,
					location,
					accepting,
					pets,
					notes,
					supplyNeeds,
					volunteerNeeds,
					lastUpdated } = marker;
        		return (
        			<Marker
	        			key={index}
	        			position={[location.lat, location.lng]}
	        		>
						<Popup onOpen={()=>{applyFilter(marker)}}>
							<div style={{fontSize: '14px'}}>
							    <p><span style={{fontWeight: 'bold'}}>County:</span> {county}<br/><br/>
							    <span style={{fontWeight: 'bold'}}>{name}</span><br/>
							    {address}<br/>
							    {phone ? phone : 'No Phone Number'}<br/></p>
							    <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> { checkAccepting(accepting) }<br/>
							    <span style={{fontWeight: 'bold'}}>Pets?</span> { pets ? pets : 'Unkonwn' }<br/><br/>
							    <span style={{fontWeight: 'bold'}}>Notes:</span> {notes}<br/>
							    <span style={{fontWeight: 'bold'}}>Supply Needs:</span> {supplyNeeds}<br/>
							    <span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {volunteerNeeds}<br/><br/>
							    <span style={{fontWeight: 'bold'}}>Lat:</span> {location.lat},
							    <span style={{fontWeight: 'bold'}}> Lng:</span> {location.lng}<br/>
							    <span style={{fontWeight: 'bold'}}>Last Updated:</span> {lastUpdated}<br/><br/>
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