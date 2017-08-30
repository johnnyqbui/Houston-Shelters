import React, { Component } from 'react';
import './App.css';
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate'

class App extends Component {
  state = {
    shelters: [],
    viewport: {
      center: [29.760427, -95.369803],
      zoom: 11
    },
    currentLocation: []
  }

  componentDidMount() {
    fetch('https://spreadsheets.google.com/feeds/list/14GHRHQ_7cqVrj0B7HCTVE5EbfpNFMbSI9Gi8azQyn-k/od6/public/values?alt=json')
    .then(data => data.json())
    .then(data => {
      const shelterData = data.feed.entry;
      const allShelter = shelterData.map((shelter) => {
        return {
          county: shelter.gsx$county.$t,
          name: shelter.gsx$shelter.$t,
          address: shelter.gsx$address.$t,
          phone: shelter.gsx$phone.$t,
          pets: shelter.gsx$pets.$t,
          accepting: shelter.gsx$accepting.$t,
          location: {
            lat: shelter.gsx$latitude.$t ? parseFloat(shelter.gsx$latitude.$t) : 0,
            lng: shelter.gsx$latitude.$t ? parseFloat(shelter.gsx$longitude.$t) : 0
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

  handleLocate = (currentLocation) => {
    this.setState({
      viewport: {
        center: currentLocation,
        zoom: 13
      },
      currentLocation: currentLocation
    })
  }

  render() {
    const { shelters, viewport, currentLocation } = this.state;
    return (
      <div className="App">
        <GeoLocate onClickLocate = { this.handleLocate }/>
        <Lmap
          currentLocation = { currentLocation }
          shelters={ shelters }
          viewport={ viewport }
        />
      </div>
    )
  }
}

export default App;

