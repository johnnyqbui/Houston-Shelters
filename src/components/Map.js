import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import blueMarker from '../images/shelter-blue.png';
import greyMarker from '../images/generic-grey.png';
// import shadowMarker from '../images/marker-shadow.png'

const blueMarkerIcon = new L.icon({
	iconUrl: blueMarker,
	iconSize: [30, 41],
	iconAnchor: [15, 41],
	popupAnchor: [0, -35]
})

const greyMarkerIcon = new L.icon({
	iconUrl: greyMarker,
	iconSize: [30, 41],
	iconAnchor: [15, 41],
	popupAnchor: [0, -35]
})

class Lmap extends Component {
	state = {
		center: []
	}

  	centerToMarker = (location, filteredMarkers) => {
  		if (window.innerWidth > 960) {
  			const mapApi = this.refs.map.leafletElement
	  		const point = mapApi.latLngToContainerPoint(location)
	  		const newPoint = L.point([point.x-250, point.y])
	  		const newLatLng = mapApi.containerPointToLatLng(newPoint)
			this.setState({
	  			center: newLatLng
	  		})
  		} else {
  			this.setState({
  				center: location
  			})
  		}
  	}
  	resetBounds = () => {
  		this.setState({
  			center: []
  		})
  	}

	render() {
		const { center, defaultBounds, bounds } = this.state;
		const {
			filteredMarkers,
			currentLocation,
			viewport,
			selectedMarker,
			onSelectMarker,
			countyBounds,
			onOpenInfoBox,
			onCloseInfoBox,
			onClosePanel,
			onCloseSearchBox,
			onClearCounties } = this.props;
		return (
			<Map
				ref='map'
			    className='map'
			    center={ center }
			    bounds={ countyBounds.length > 0 ? countyBounds : undefined }
			    boundsOptions={{ padding: [120, 120] }}
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
			>

		      <TileLayer
		        url='https://api.mapbox.com/styles/v1/jnolasco/cj75zemih4wc02srs353jlu05/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam5vbGFzY28iLCJhIjoiY2oyYmVwNXViMDB1NjJxbXB2aHFlZnAzZyJ9.dY4H7Hzre0GJOeHBrkzIpg'
						attribution='Built by Johnny Bui, <a target="_blank" href="http://twitter.com/plaintext">Jason Nolasco</a>, and Angela Shih'
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
							ref='popup'
							onOpen={() => {
								onSelectMarker(marker)
								onOpenInfoBox()
								onClosePanel()
								onCloseSearchBox()
								onClearCounties()
								this.centerToMarker(location, filteredMarkers);
							}}
							onClose={() => {
								onCloseInfoBox()
							}}

							position={location}
						>
							<div className='popup-info' style={{fontSize: '14px'}}>
								<div style={{fontWeight: 'bold', fontSize: '16px'}}>{shelter}</div>
								<span className="mobile-hidden">
                  {address}<br/>
                  {city}<br/>

						        <div className='popup-button-container'>
							        {phone && (
												<a className='popup-info-button' href={`tel:${cleanPhone}`}>Call</a>
                      )}
											<a className='popup-info-button' href={`https://www.google.com/maps/dir/current+location/${concatAddress}`} target="_blank">Get Directions</a>
									</div>
									</span>

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
