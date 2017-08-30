import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import GeoLocate from './components/GeoLocate'

class App extends Component {
  state = {
    shelters: [],
    currentLocation: {}
  }

  componentDidMount() {
    fetch('https://spreadsheets.google.com/feeds/list/14GHRHQ_7cqVrj0B7HCTVE5EbfpNFMbSI9Gi8azQyn-k/od6/public/values?alt=json')
    .then(data => data.json())
    .then(data => {
      const shelterData = data.feed.entry;
      const allShelter = shelterData.map((shelter) => {
        return {
          county: shelter.gsx$area.$t,
          name: shelter.gsx$shelter.$t,
          address: shelter.gsx$address.$t,
          phone: shelter.gsx$phone.$t,
          pets: shelter.gsx$pets.$t,
          accepting: shelter.gsx$accepting.$t,
          location: {
            lat: parseFloat(shelter.gsx$latitude.$t),
            lng: parseFloat(shelter.gsx$longitude.$t)
          },
          lastUpdated: shelter.gsx$lastupdated.$t,
          notes: shelter.gsx$notes.$t,
          supplyNeeds: shelter.gsx$supplyneeds.$t,
          volunteerNeeds: shelter.gsx$volunteerneeds.$t,
          showInfo: false
        }
      })
      this.setState({
        shelters: allShelter
      })
    })
  }

  handleMarkerClick = (targetShelter) => {
    this.setState(prevState => ({
      markers: this.state.shelters.map(shelter => {
        return shelter === targetShelter ? shelter.showInfo = true : shelter.showInfo = false
      })
    }))
  }

  handleCloseMarker = (targetShelter) => {
    this.setState(prevState => ({
      markers: this.state.shelters.map(shelter => {
        return shelter === targetShelter ? shelter.showInfo = false : ''
      })
    }))
  }

  handleLocate = (currentLocation) => {
    this.setState({
      currentLocation: currentLocation
    })
  }

  render() {
    const { shelters, currentLocation } = this.state;
    return (
      <div className="App">
        <GeoLocate onClickLocate = { this.handleLocate }/>
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCiyRP-YLCAtBPP3GnCGsUmu0vooOfoY_A"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%`}} />}

          shelters={ shelters }
          currentLocation={ currentLocation }
          onMarkerClick = { this.handleMarkerClick }
          onMarkerClose = { this.handleCloseMarker }
        />
      </div>
    )
  }
}

export default App;

