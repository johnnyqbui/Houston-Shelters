import React from 'react';
import L from 'leaflet';
import { Map, Marker, Popup, TileLayer, CircleMarker, ZoomControl } from 'react-leaflet';

const Lmap = (props) => {
  const { markers, viewport, currentLocation, toggledInfo, onToggleInfo } = props;
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
        let myIcon;
        console.log(accepting);
        switch(marker.accepting){
          case 'TRUE':
          myIcon = L.icon({
            iconUrl:'../images/marker-icon-green.png'
          });
          break;
          case 'FALSE':
          myIcon = L.icon({
            iconUrl:'../images/marker-icon-red.png'
          });
          break;
          case 'DNR':
          myIcon = L.icon({
            iconUrl:'../images/marker-icon-grey.png'
          });
          break;
          default:
          myIcon = L.icon({
            iconUrl:'../images/marker-icon-grey.png'
          });
        };
          return (
            <Marker
              icon = {myIcon}
              key={index}
              position={[location.lat, location.lng]}
              >
              <Popup onOpen={() => { checkToggleInfo()} } onClose={() => { checkToggleInfo() }}>
                <div style={{fontSize: '14px'}}>
                  <p><span style={{fontWeight: 'bold'}}>County:</span> {county}<br/><br/>
                    <span style={{fontWeight: 'bold'}}>{name}</span><br/>
                    {address}<br/>
                    {city}<br/>
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
