import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl, Pane } from 'react-leaflet';
import blueMarker from '../images/marker-icon-blue.png';
import greyMarker from '../images/marker-icon-grey.png';

const blueMarkerIcon = new L.icon({
	iconUrl: blueMarker,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
    popupAnchor: [0, -28]
})

const greyMarkerIcon = new L.icon({
	iconUrl: greyMarker,
	iconSize: [25, 41],
	iconAnchor: [12, 41],
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

  	handleShowMarker = (ref) => {
  		if (ref) {
			ref.leafletElement._icon.style.display = ""
  		}
	}

	handleHideMarker = (ref) => {
		// if (ref) {
		// 	ref.leafletElement._icon.style.display = 'none'
		// }
	}


	render() {
		const { bounds } = this.state;
		const { markers, origMarkers, currentLocation, viewport, selectedMarker, onToggleInfo, onClosePanel } = this.props;
		return (
			<Map
			    className='map'
			    center={ bounds }
			    viewport={ viewport }
			    onClick={ onClosePanel }
			    doubleClickZoom={ true }
			    zoomSnap={ false }
			    trackResize={ true }
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
		          cleanPhone,
		          accepting,
		          location } = marker;

		        const concatAddress = encodeURI(`${address} ${city}`)
		        let icon;
		        accepting ? icon = blueMarkerIcon : icon = greyMarkerIcon
					return (
					<Marker
						ref={marker === selectedMarker ? this.handleShowMarker : this.handleHideMarker}
						icon={icon}
						key={index}
						position={[location.lat, location.lng]}
						>
						<Popup minWidth="250" autoPan={false}
							onOpen={() => {
								this.centerToMarker(location);
								onToggleInfo(marker)
								onClosePanel()
							}}
							onClose={() => {
								onToggleInfo(marker)
							}}>
						    <div className='popup-info' style={{fontSize: '14px'}}>
						        <span style={{fontWeight: 'bold', fontSize: '16px'}}>{shelter}</span><br/>
						        {address}<br/>
						        {city}<br/>
						        <div className='popup-button-container'>
							        {phone && (
							        	<a className='popup-info-button' href={`tel:${cleanPhone}`}>Tap to Call</a>
							        )}
							        <a className='popup-info-button' href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">Get Directions</a>
								</div>
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
