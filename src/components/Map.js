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
    let redIcon = new Icon({
      iconUrl: '../images/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [12, -10],
    });
    let greenIcon = new Icon({
      iconUrl: '../images/marker-icon-green.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -45],
    });



    let greyIcon = new Icon({
      iconUrl: '../images/marker-icon-grey.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [12, -10],
    });

    if (accepting === 'TRUE') {
      return greenIcon;
    } else if (accepting === 'FALSE') {
      return redIcon;
    } else {
      return greyIcon;
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

  const openInfo = (marker) => {
    // this is NOT the react way to do things
    // but I'm learning react on the fly and don't understand the binding mechanism
    console.log("opening");
    let obj = document.getElementById('nodeinfo')
    let result = "";

    result += "<strong>" + marker.name + "<br>" + marker.address + "</strong><br><br>";
    result += "<table>";
    result += "<tr><td>Accepting People?</td><td>" + checkAccepting(marker.accepting) + "</td></tr>";
    result += "<tr><td>Pets OK?</td><td>" + (currentMarker.pets ? currentMarker.pets : 'Unknown') + "</td></tr></table>";


    obj.innerHTML = result;

    /*
    props.currentMarker.county = marker.county;

    currentMarker.accepting = marker.accepting;
    currentMarker.pets = marker.pets;
    currentMarker.notes = marker.notes;
    */


    console.log(marker.county);

    obj.classList.add("open");



  }

  const closeInfo = (marker) => {
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
                  openInfo(marker);
                }}
                onClose={() => {
                  closeInfo(marker);
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