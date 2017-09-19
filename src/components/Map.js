import React, { Component } from 'react';
import L from 'leaflet';
import { Map, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import blueMarker from '../images/shelter-blue.png';
import greyMarker from '../images/generic-grey.png';

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
		center: [],
		markers: []
	}

	getLeafletPopup = (marker, location, shelter, address, city, phone, cleanPhone, concatAddress) => {
		return (`
			<div class='popup-info'>
				<span>${shelter}</span>
				<span class="mobile-hidden">
					${address}<br/>
					${city}<br/>

					<div class='popup-button-container'>
						<a class='popup-info-button' href='tel:${cleanPhone}''>Call</a>
						<a class='popup-info-button' href='https://www.google.com/maps/dir/current+location/${concatAddress}'' target="_blank">Get Directions</a>
					</div>
				</span>
			</div>`
		)
	}

	componentWillReceiveProps(nextProps) {
		const markers = nextProps.filteredMarkers.map((marker, index) => {
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
			const icon = accepting ? blueMarkerIcon : greyMarkerIcon
			return ({
				id: index,
				lat: location.lat,
				lng: location.lng,
				popup: this.getLeafletPopup(marker, location, shelter, address, city, phone, cleanPhone, concatAddress),
				options: {
					icon: icon,
					keyboard: true,
					id: index
				}
			})
	  	})

	  	// Temp fix
	  	const newMarkers = markers.length > 0 ? markers : [null]

		this.setState({
			markers: newMarkers
		})
	}

  	centerToMarker = (location) => {
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

	render() {
		const { center, markers } = this.state;
		const {
			filteredMarkers,
			currentLocation,
			viewport,
			onSelectMarker,
			countyBounds,
			onOpenInfoBox,
			onCloseInfoBox,
			onClosePanel,
			onCloseSearchBox,
			onClearCounties,
			updateUrlParams } = this.props;

		const markerClusterOptions = {
			showCoverageOnHover: false,
			disableClusteringAtZoom:11,
			maxClusterRadius:150
		}

		return (
			<Map
				ref='map'
			    className='map'
			    center={ center }
			    bounds={ countyBounds.length > 0 ? countyBounds : undefined }
			    boundsOptions={{ padding: [120, 120] }}
			    viewport={ viewport }
			    onClick={() => {
			    	onClearCounties()
			    	onClosePanel()
			    	onCloseSearchBox()
			    	onCloseInfoBox()
			    }}
			    doubleClickZoom={ true }
			    zoomSnap={ false }
			    trackResize={ true }
			    zoomControl={ false }
			    animate={ true }>

				<TileLayer
					url='https://api.mapbox.com/styles/v1/jnolasco/cj75zemih4wc02srs353jlu05/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam5vbGFzY28iLCJhIjoiY2oyYmVwNXViMDB1NjJxbXB2aHFlZnAzZyJ9.dY4H7Hzre0GJOeHBrkzIpg'
					attribution='Supported by <a target="_blank" href="https://www.mapbox.com/humanitarian/">Mapbox</a> and <a href="https://www.openstreetmap.org/" target="_blank">OSM</a> | <a href="mailto:jason@irmashelters.org">Contact Us</a>'
				/>

				<ZoomControl position= 'bottomright' />
				{currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}

				<MarkerClusterGroup
					markers={markers}
					options={markerClusterOptions}
					wrapperOptions={{enableDefaultStyle: true}}
					onMarkerClick={(marker) => {
						const selectedMarker = filteredMarkers[marker.options.id]
						onOpenInfoBox()
						onClosePanel()
						onCloseSearchBox()
						onClearCounties()
						onSelectMarker(selectedMarker)
						updateUrlParams(selectedMarker)
						this.centerToMarker(marker.getLatLng());
					}}
				/>
		    </Map>
	  	)
	}
}

export default Lmap
