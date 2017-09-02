import React from 'react';
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

const Lmap = (props) => {
  const { markers, viewport, currentLocation, toggledInfo, onToggleInfo } = props;
  const checkToggleInfo = () => { window.innerWidth < 600 && ( onToggleInfo() ) }

  const openInfo = (marker) => {
    console.log("opening");
    let obj = document.getElementById('nodeinfo')
    this.infobox.handleMarker(marker);
    obj.classList.add("open");

  }

  const closeInfo = (marker) => {
    console.log("closing!" + marker.accepting);
    let obj = document.getElementById('nodeinfo')
    obj.classList.remove("open");
  }

  return (
    <div className='map-container'>
      <InfoBox className='info-bar' id='nodeinfo' ref={ref => (this.infobox = ref)}/>
    <Map className='map' viewport={ viewport } zoomControl={false} ref={ref => (this.map = ref)}>
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
          location,
          accepting,
          pets,
          notes,
          lastUpdated } = marker;
        let icon;
        accepting ? icon = blueMarkerIcon : icon = greyMarkerIcon

		return (
			<Marker
			  icon={icon}
			  key={index}
			  position={[location.lat, location.lng]}
			  >
			  <Popup
          onOpen={() => {
            openInfo(marker);
            checkToggleInfo();
          }}
          onClose={() => {
            closeInfo(marker);
            checkToggleInfo();
          }}>
			    <div style={{fontSize: '14px'}}>
            <p><span style={{fontWeight: 'bold'}}>{name}</span><br/>
              {address}<br/>
              {phone ? phone : 'No Phone Number'}</p>
			    </div>
			  </Popup>
			</Marker>
		)
      })}
    </Map>
    </div>
  )
}

export default Lmap
