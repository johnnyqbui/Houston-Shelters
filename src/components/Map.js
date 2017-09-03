import React, { Component } from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import blueMarker from '../images/marker-icon-blue.png';
import greyMarker from '../images/marker-icon-grey.png';
import shadowMarker from '../images/marker-shadow.png'
import InfoBox from './InfoBox'

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
		viewport: {},
		bounds: []
	}

	componentDidMount() {
		this.setState({
			viewport: this.props.viewport,
		})
	}

	checkToggleInfo = () => {
		window.innerWidth < 600 && ( this.props.onToggleInfo() )
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

	openInfo = (marker) => {
		let obj = document.getElementById('nodeinfo')
		this.infobox.handleMarker(marker);
		obj.classList.add("open");
	}

	closeInfo = (marker) => {
		let obj = document.getElementById('nodeinfo')
		obj.classList.remove("open");
	}

	render() {
		const { viewport, bounds } = this.state;
		const { markers, currentLocation, toggledInfo, onToggleInfo } = this.props;
		return (
		    <div className='map-container'>
		    <InfoBox className='info-bar' id='nodeinfo' ref={ref => (this.infobox = ref)}/>
		    <Map className='map' viewport={ viewport } center={ bounds } zoomControl={false} ref={ref => (this.map = ref)}>
		      <TileLayer
		        url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
		        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		      />

		      <ZoomControl position={toggledInfo ? 'bottomright' : 'topright'} />
		      {currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}
		      {markers.map((marker, index) => {
		        const {
		          county,
		          name,
		          address,
		          city,
		          phone,
		          accepting,
		          location,
							lastUpdated
		        } = marker;
		        let icon;
		        accepting ? icon = blueMarkerIcon : icon = greyMarkerIcon
					return (
					<Marker
						icon={icon}
						key={index}
						position={[location.lat, location.lng]}>
						<Popup
							minWidth="250"
						onOpen={() => {
							this.centerToMarker(location);
							this.openInfo(marker);
							this.checkToggleInfo();
						}}
						onClose={() => {
							this.closeInfo(marker);
							this.checkToggleInfo();
						}}>
						    <div style={{fontSize: '14px'}}>
						      <p>
						        <span style={{fontWeight: 'bold', fontSize: '16px'}}>{name}</span><br/>
						        {address}<br/>
						        {city}<br/>
										Updated {lastUpdated}
									</p>
									<p>
						        {phone ? <a className='popupPhone' href={`tel:${phone.replace(/\D/g,'')}`}>Call {phone}</a> : 'No Phone Number'}<br/></p>
						    </div>
						</Popup>
					</Marker>
				)
		      })}
		    </Map>
		    </div>
	  	)
	}
}

export default Lmap
