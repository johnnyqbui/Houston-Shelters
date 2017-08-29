import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import RescueData from './utils/Rescue.json';
import ShelterData from './utils/Shelters.json';

class App extends Component {
  state = {
    rescues: RescueData,
    shelters: [],
    currentLocation: {}
  }

  componentDidMount() {
    this.setState({
        shelters: ShelterData.map((shelter) => {
	      return {...shelter, showInfo: false}
	    })
     })

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
    const { rescues, shelters, currentLocation } = this.state;
    return (
      <div className="App">
        <Map
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyCiyRP-YLCAtBPP3GnCGsUmu0vooOfoY_A"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}

          rescues={ rescues }
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

