import React from 'react'
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';

const Lmap = (props) => {
	const { markers, viewport, currentLocation } = props;
	const acceptingPeople = (accepting) => {
		if (accepting === 'TRUE') {
			return 'Yes'
		} else if (accepting === 'FALSE') {
			return 'No'
		} else {
			return 'Did Not Respond/Unknown'
		}
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
					<Popup>
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