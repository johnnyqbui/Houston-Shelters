import React from 'react';
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet';
import L, { Icon } from 'leaflet';

import blueIconImg from '../images/marker-icon-blue.png';
import redIconImg from '../images/marker-icon-red.png';
import greenIconImg from '../images/marker-icon-green.png';
import violetIconImg from '../images/marker-icon-violet.png';

const blueMarkerIcon = new L.icon({ iconUrl: blueIconImg })
const redMarkerIcon = new L.icon({ iconUrl: redIconImg })
const greenMarkerIcon = new L.icon({ iconUrl: greenIconImg })
const violetMarkerIcon = new L.icon({ iconUrl: violetIconImg })

const Lmap = (props) => {
	const { markers, viewport, currentLocation, selectedFilter } = props;
	const checkAccepting = (accepting) => {
		if (accepting === 'TRUE') {
			return 'Yes'
		} else if (accepting === 'FALSE') {
			return 'No'
		} else {
			return 'Did Not Respond/Unknown'
		}
	}

	const checkFilter = (selectedFilter) => {
		switch(selectedFilter) {
			case 'All Shelters':
			case 'Accepting People':
				return blueMarkerIcon
				break;

			case 'Not Accepting People':
			case 'Unknown If Accepting':
			case 'Not Opened':
			case 'Staging (Redirecting People, but can still come)':
				return redMarkerIcon
				break;

			case 'Accepting Pets':
				return violetMarkerIcon
				break;

			case 'Shelters that need Volunteers':
			case 'Shelters that need Supplies':
				return greenMarkerIcon
				break;

			case 'Added within the last 12 hours':
				return blueMarkerIcon
				break;

			default:
				break;
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
	        			icon={checkFilter(selectedFilter)}
	        		>
					<Popup>
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