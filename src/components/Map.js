import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import blueMarker from '../images/marker-icon-blue.png';
import greyMarker from '../images/marker-icon-grey.png';
import shadowMarker from '../images/marker-shadow.png'

const blueMarkerIcon = new L.icon({
	iconUrl: blueMarker,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	shadowUrl: shadowMarker,
	shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    popupAnchor: [0, -28]
})

const greyMarkerIcon = new L.icon({
	iconUrl: greyMarker,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	shadowUrl: shadowMarker,
	shadowSize: [41, 41],
    shadowAnchor: [12, 41],
    popupAnchor: [0, -28]
})

class Lmap extends Component {

	state = {
		bounds: []
	}

  	centerToMarker = (location) => {
  		this.setState({
  			bounds: location
  		})
  	}

  	resetBounds = () => {
  		this.setState({
  			bounds: []
  		})
  	}

	render() {
		const { bounds } = this.state;
		const { markers, currentLocation, viewport, onToggleInfo, onTogglePanel, onClosePanel } = this.props;
		return (
			<Map
			    className='map'
			    viewport={ viewport }
			    center={ bounds }
			    zoomControl={false}
			>
		      <TileLayer
		        url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
		        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		      />

		      <ZoomControl position= 'bottomright' />
		      {currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}
		      {markers.map((marker, index) => {
		        const {
		          county,
		          shelter,
		          address,
		          city,
		          phone,
		          accepting,
		          location } = marker;
		        const concatAddress = encodeURI(`${address} ${city}`)
		        let icon;
		        accepting ? icon = blueMarkerIcon : icon = greyMarkerIcon
					return (
					<Marker
						icon={icon}
						key={index}
						position={[location.lat, location.lng]}>
						<Popup
							onOpen={() => {
								this.centerToMarker(location);
								onToggleInfo(marker)
								onClosePanel()
							}}
							onClose={() => {
								onToggleInfo(marker)
							}}>
						    <div className='popupInfo' style={{fontSize: '14px'}}>
						      	<span style={{fontWeight: 'bold'}}>County:</span> {county}<br/><br/>
						        <span style={{fontWeight: 'bold', fontSize: '16px'}}>{shelter}</span><br/>
						        {address}<br/>
						        {city}<br/>
						        {phone && (
						        	<a className='popupButton' href={`tel:${phone.replace(/\D/g,'')}`}>Tap to Call</a> : ''
						        )}
						        {<a className='popupButton' href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">Get Directions</a>}
						    </div>
						</Popup>
					</Marker>
				)
		      })}
		    </Map>
	  	)
	}
}

export default Lmap
