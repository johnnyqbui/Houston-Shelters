import React from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';
import blueMarker from '../images/marker-icon-blue.png';
import redMarker from '../images/marker-icon-red.png';
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
const redMarkerIcon = new L.icon({
	iconUrl: redMarker,
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
  const { markers, viewport, currentLocation, selectedFilter, toggledInfo, onToggleInfo } = props;
  const checkAccepting = (accepting) => {
    if (accepting === 'TRUE') {
      return 'Yes'
    } else if (accepting === 'FALSE') {
      return 'No'
    } else {
      return 'Did Not Respond/Unknown'
    }
  }
  const checkToggleInfo = () => { window.innerWidth < 600 && ( onToggleInfo() ) }

  return (
    <Map className='map' viewport={ viewport } zoomControl={false}>
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
          supplyNeeds,
          volunteerNeeds,
          lastUpdated } = marker;
        let icon;
        switch(marker.accepting){
          case 'TRUE':
			icon = blueMarkerIcon
			break;
          case 'FALSE':
			icon = redMarkerIcon
			break;
          case 'DNR':
			icon = greyMarkerIcon
			break;
          default:
          	icon = greyMarkerIcon
        	break;
        };
          return (
            <Marker
              icon={icon}
              key={index}
              position={[location.lat, location.lng]}
              >
              <Popup onOpen={() => { checkToggleInfo()} } onClose={() => { checkToggleInfo() }}>
                <div style={{fontSize: '14px'}}>
                  <p><span style={{fontWeight: 'bold'}}>County:</span> {county}<br/><br/>
                    <span style={{fontWeight: 'bold'}}>{name}</span><br/>
                    {address}<br/>
                    {city}<br/>
                    Phone: {phone ? <a className='popupPhone' href={`tel:${phone}`}>{phone}</a> : 'None'}<br/></p>
                  <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> { checkAccepting(accepting) }<br/>
                    <span style={{fontWeight: 'bold'}}>Pets?</span> { pets ? pets : 'Unkonwn' }<br/><br/>
                    <span style={{fontWeight: 'bold'}}>Notes:</span> {notes}<br/><br/>
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
