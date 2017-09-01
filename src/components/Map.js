import React from 'react';
import {Map, Marker, Popup, TileLayer, CircleMarker} from 'react-leaflet';
import {Icon} from 'leaflet'

const Lmap = (props) => {
  const {markers, viewport, currentLocation, currentMarker} = props;

  const checkAccepting = (accepting) => {
    if (accepting === 'TRUE') {
      return 'Yes'
    } else if (accepting === 'FALSE') {
      return 'No'
    } else {
      return 'Did Not Respond/Unknown'
    }
  }
  const checkAcceptingIcon = (accepting) => {
    let myIcon = new Icon({
      iconUrl: '../images/marker-icon-black.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });
    let myIcon2 = new Icon({
      iconUrl: '../images/marker-icon-blue.png',
      iconSize: [38, 95],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    });

    if (accepting === 'TRUE') {
      return myIcon;
    } else if (accepting === 'FALSE') {
      return myIcon2;
    } else {
      return myIcon2;
    }
  }

  const applyFilter = (marker) => {

    // const {
    // 	accepting,
    // 	pets,
    // 	supplyNeeds,
    // 	volunteerNeeds,
    // 	lastUpdated } = marker;

    // accepting === 'TRUE'
  }

  const doAction = (marker) => {
    console.log("opening");
    let obj = document.getElementById('nodeinfo')

    props.currentMarker.county = marker.county;
    currentMarker.accepting = marker.accepting;
    currentMarker.pets = marker.pets;
    currentMarker.notes = marker.notes;

    console.log(marker.county);

    obj.classList.add("open");



  }

  const doClose = (marker) => {
    console.log("closing!" + marker.accepting);
    let obj = document.getElementById('nodeinfo')
    obj.classList.remove("open");


  }

  return (
    <div className='map-container'>
      <div id='nodeinfo' className='info-bar'>
        <p><span style={{fontWeight: 'bold'}}>County:</span> {props.currentMarker.county}<br/><br/>
        </p>
        <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> {checkAccepting(props.currentMarker.accepting)}<br/>
          <span style={{fontWeight: 'bold'}}>Pets?</span> {currentMarker.pets ? currentMarker.pets : 'Unknown'}<br/><br/>
          <span style={{fontWeight: 'bold'}}>Notes:</span> {currentMarker.notes}<br/>
          <span style={{fontWeight: 'bold'}}>Supply Needs:</span> {currentMarker.supplyNeeds}<br/>
          <span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {currentMarker.volunteerNeeds}<br/><br/>
          <span style={{fontWeight: 'bold'}}>Lat:</span> {currentMarker.location ? currentMarker.location.lat : ''},
          <span style={{fontWeight: 'bold'}}> Lng:</span> {currentMarker.location ? currentMarker.location.lng : ''}<br/>
          <span style={{fontWeight: 'bold'}}>Last Updated:</span> {currentMarker.lastUpdated}<br/><br/>
        </p>
      </div>
      <Map className='map' viewport={viewport} animate={true}>
        <TileLayer
          url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentLocation.length > 0 ? <CircleMarker center={currentLocation} radius={15}/> : ''}
        {markers.map((marker, index) => {
          const {
            county,
            name,
            address,
            phone,
            location,
            accepting,
            pets,
            notes,
            supplyNeeds,
            volunteerNeeds,
            lastUpdated
          } = marker;

          return (
            <Marker
              key={index}
              position={[location.lat, location.lng]}
              icon={checkAcceptingIcon(accepting)}
            >
              <Popup
                onOpen={() => {
                  applyFilter(marker);
                  doAction(marker);
                }}
                onClose={() => {
                  doClose(marker);
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