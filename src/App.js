import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';

class App extends Component {
  state = {
    shelters: [],
    currentLocation: {}
  }

  componentDidMount() {
    !navigator.geolocation ?
      console.log('Browser does not support Geolocation') :
      navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        currentLocation: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
      })
    })

    const apiRequest = 'https://api.data.world/v0/sql/sya/list-of-shelters-around-texas?query=SELECT%20area%2C%20shelter%2C%20address%2C%20phone%2C%20pets%2C%20accepting%2C%20latitude%2C%20longitude%2C%20last_updated%2C%20notes%2C%20supply_needs%2C%20volunteer_needs%20FROM%20shelters_2%20&includeTableSchema=false'
    fetch(apiRequest,
      {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcm9kLXVzZXItY2xpZW50OmpvaG5ueXFidWkiLCJpc3MiOiJhZ2VudDpqb2hubnlxYnVpOjpmNjliODliYi03ZjEzLTRhZjYtYjA4YS1hM2Y3YjQ5ZjE2NDYiLCJpYXQiOjE1MDM5NTQxNTcsInJvbGUiOlsidXNlcl9hcGlfd3JpdGUiLCJ1c2VyX2FwaV9yZWFkIl0sImdlbmVyYWwtcHVycG9zZSI6dHJ1ZX0.Dv2eK2iHtoWs0D2dN-3zfid1IEjvJNc8RUF1n8RJYh0oYUFVigCMrpUL0JGUeYK3Kh3lPqBQL9LnsY2BVECZKQ"
        }
      })
    .then(result => (result.json())
    .then(data => {
      const shelterData = data.results.bindings;
      const allShelter = shelterData.map((value) => {
        return {
          county: value.hasOwnProperty('v_0') ? value.v_0.value : '',
          name: value.hasOwnProperty('v_1') ? value.v_1.value : '',
          address: value.hasOwnProperty('v_2') ? value.v_2.value : '',
          phone: value.hasOwnProperty('v_3') ? value.v_3.value : '',
          pets: value.hasOwnProperty('v_4') ? value.v_4.value : '',
          accepting: value.hasOwnProperty('v_5') ? value.v_5.value : '',
          location: {
            lat: value.hasOwnProperty('v_6') ? parseFloat(value.v_6.value) : '',
            lng: value.hasOwnProperty('v_7') ? parseFloat(value.v_7.value) : ''
          },
          lastUpdated: value.hasOwnProperty('v_8') ? value.v_8.value : '',
          notes: value.hasOwnProperty('v_9') ? value.v_9.value : '',
          supplyNeeds: value.hasOwnProperty('v_10') ? value.v_10.value : '',
          volunteerNeeds: value.hasOwnProperty('v_11') ? value.v_11.value : '',
          showInfo: false
        }
      })
      this.setState({
        shelters: allShelter
      })
    }))
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

