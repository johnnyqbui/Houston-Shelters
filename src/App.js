import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';

class App extends Component {
  state = {
    shelters: [],
    currentLocation: {}
  }

  componentDidMount() {
    const success = (position) => {
      this.setState({
        currentLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    }

    const error = (err) => {
      console.log('Could not obtain locaiton', err)
    }

    const options = {maximumAge: 60000, timeout: 5000, enableHighAccuracy: true}

    !navigator.geolocation ?
    console.log('Browser does not support Geolocation') :
    navigator.geolocation.getCurrentPosition(success, error, options)

    const apiRequest = 'https://api.data.world/v0/sql/sya/list-of-shelters-around-texas?query=SELECT%20area%2C%20shelter%2C%20address%2C%20phone%2C%20pets%2C%20accepting%2C%20latitude%2C%20longitude%2C%20last_updated%2C%20notes%2C%20supply_needs%2C%20volunteer_needs%20FROM%20shelters_2%20&includeTableSchema=false'

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

  render() {
    const { shelters, currentLocation } = this.state;
    return (
      <div className="App">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCiyRP-YLCAtBPP3GnCGsUmu0vooOfoY_A"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}

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

