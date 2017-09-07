import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import blueMarker from '../images/shelter-blue.png';
import greyMarker from '../images/shelter-grey.png';
// import shadowMarker from '../images/marker-shadow.png'

const blueMarkerIcon = new L.icon({
	iconUrl: blueMarker,
	iconSize: [30, 41],
	iconAnchor: [15, 41],
	popupAnchor: [0, -35]
	// shadowUrl: shadowMarker,
	// shadowSize: [41, 41],
	// shadowAnchor: [12, 41],


	// iconSize: [25, 41],
	// iconAnchor: [12, 41],
	// shadowUrl: shadowMarker,
	// shadowSize: [41, 41],
	// shadowAnchor: [12, 41],
	// popupAnchor: [0, -28]

})

const greyMarkerIcon = new L.icon({
	iconUrl: greyMarker,
	iconSize: [18, 23],
	iconAnchor: [9, 23],
	popupAnchor: [0, -18],
	// shadowUrl: shadowMarker,
	// shadowSize: [41, 41],
	// shadowAnchor: [12, 41]

	// iconSize: [25, 41],
	// iconAnchor: [12, 41],
	// shadowUrl: shadowMarker,
	// shadowSize: [41, 41],
	//  shadowAnchor: [12, 41],
	//  popupAnchor: [0, -28]
})

class Lmap extends Component {
	state = {
		bounds: []
	}
  	centerToMarker = (location, filteredMarkers) => {
  		const mapApi = this.refs.map.leafletElement
  		const point = mapApi.latLngToContainerPoint(location)
  		const newPoint = L.point([point.x-250, point.y])
  		const newLatLng = mapApi.containerPointToLatLng(newPoint)
		this.setState({
  			bounds: newLatLng
  		})

  	}
  	resetBounds = () => {
  		this.setState({
  			bounds: []
  		})
  	}
	render() {
		const { bounds } = this.state;
		const {
			filteredMarkers,
			currentLocation,
			viewport,
			onOpenInfoBox,
			onCloseInfoBox,
			onClosePanel,
			onCloseSearchBox } = this.props;
		return (
			<Map
			    className='map'
			    center={ bounds }
			    viewport={ viewport }
			    onClick={() => {
			    	onClosePanel()
			    	onCloseSearchBox()
			    	onCloseInfoBox()
			    }}
			    doubleClickZoom={ true }
			    zoomSnap={ false }
			    trackResize={ true }
			    zoomControl={ false }
			    ref='map'
			>

		      <TileLayer
		        url='https://api.mapbox.com/styles/v1/jnolasco/cj75zemih4wc02srs353jlu05/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam5vbGFzY28iLCJhIjoiY2oyYmVwNXViMDB1NjJxbXB2aHFlZnAzZyJ9.dY4H7Hzre0GJOeHBrkzIpg'
		        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		      />

		      <ZoomControl position= 'bottomright' />
		      {currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}
		      {filteredMarkers.map((marker, index) => {
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
						icon={icon}
						key={index}
						position={[location.lat, location.lng]}
						keyboard={true}
						ref='marker'
						>
						<Popup minWidth="250" autoPan={false}
							onOpen={() => {
								this.centerToMarker(location, filteredMarkers);
								onOpenInfoBox(marker)
								onClosePanel()

							}}
							onClose={() => {
								onCloseInfoBox()
							}}
							ref='popup'
							position={location}
							>
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
