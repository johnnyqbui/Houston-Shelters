import React from 'react';
import {Map, Marker, Popup, TileLayer, CircleMarker} from 'react-leaflet';
import {Icon} from 'leaflet'
import InfoBox from './InfoBox'

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

  const getIcon = (accepting) => {
    let redIcon = new Icon({
      iconUrl: '../images/marker-icon-red.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [0, -45],
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
      popupAnchor: [0, -45],
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
    console.log("opening");

    console.log(this.map);
    console.log(marker.location);
    console.log(viewport.center);

    this.setCenter(marker);

    let obj = document.getElementById('nodeinfo')
    this.infobox.handleMarker(marker);
    obj.classList.add("open");
  }

  const closeInfo = (marker) => {
    console.log("closing!" + marker.accepting);
    let obj = document.getElementById('nodeinfo')
    obj.classList.remove("open");
  }

  this.setCenter = (m) => {
    viewport.center = {lat:m.location.lat, lng:m.location.lng};
  }

  this.btnClick = () => {
    this.infobox.handleTest();
  }

  return (
    <div className='map-container'>
      <InfoBox className='info-bar' id='nodeinfo' ref={ref => (this.infobox = ref)}/>
      <Map className='map' viewport={viewport} animate={true} ref={ref => (this.map = ref)}>
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
              icon={getIcon(accepting)}
            >
              <Popup
                onOpen={() => {
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