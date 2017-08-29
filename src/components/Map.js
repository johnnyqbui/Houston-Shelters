import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import withScriptjs from "react-google-maps/lib/async/withScriptjs";

const Map = withScriptjs(
	withGoogleMap(props => {
		const { rescues, shelters, currentLocation, onMarkerClick, onMarkerClose } = props;
		// const missions = rescues.filter(data =>
		// 	typeof data['Longitude Coordinate'] === 'number' &&
		// 	typeof data['Latitude Coordinate'] === 'number')
		// .map((data) => {
		// 	const lat = data['Latitude Coordinate']
		// 	const lng = data['Longitude Coordinate']
		// 	return {
		// 		position: {
		// 			lat: lat,
		// 			lng: lng
		// 		}
		// 	}
		// })

		// const locateShelters = shelters.map(shelter => {
		// 	return {
		// 		location: {
		// 			position: {
		// 				lat: shelter.Lat,
		// 				lng: shelter.Lng
		// 			}
		// 			info: {
		// 				name: shelter.Name,
		// 				address: shelter.Address,

		// 			}
		// 		}

		// 	}
		// })

		const acceptingPeople = (accepting) => {
			console.log(accepting)
			if (accepting === 'TRUE') {
				return 'Yes'
			} else if (accepting === 'FALSE') {
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
        	{shelters.map((shelter, index) => (
        			<Marker
	        			key={index}
	        			position={{
	        					lat: shelter.Lat,
	        					lng: shelter.Lng
	        			}}
	        			onClick={() => onMarkerClick(shelter)}
	        		>
	        		{shelter.showInfo && (
			          <InfoWindow onCloseClick={() => onMarkerClose(shelter)}>
			            <div style={{fontSize: '14px'}}>
				            <p>{shelter.Location}<br/>
				            {shelter.Address}<br/>
				            {shelter['Phone Number'].length > 5 ? shelter['Phone Number'] : 'No Phone Number'}</p>
				            <p style={{fontWeight: 'bold'}}>Accepting People? { acceptingPeople(shelter.Accepting) }</p>
			            </div>
			          </InfoWindow>
			        )}
	        		</Marker>
        		)
        	)}
		</GoogleMap>
		)}
	)
)

export default Map