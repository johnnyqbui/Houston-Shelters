import React, { Component } from 'react';
import L from'leaflet';
import './App.css';
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import FilterMarkers from './components/FilterMarkers';
import AddAShelter from './components/AddAShelter';

import blueIconImg from './images/marker-icon-blue.png';
import redIconImg from './images/marker-icon-red.png';
import greenIconImg from './images/marker-icon-green.png';
import violetIconImg from './images/marker-icon-violet.png';
import yellowIconImg from './images/marker-icon-yellow.png';

const blueMarkerIcon = new L.icon({ iconUrl: blueIconImg })
const redMarkerIcon = new L.icon({ iconUrl: redIconImg })
const greenMarkerIcon = new L.icon({ iconUrl: greenIconImg })
const violetMarkerIcon = new L.icon({ iconUrl: violetIconImg })
const yellowMarkerIcon = new L.icon({ iconUrl: yellowIconImg })

class App extends Component {
  state = {
    OGMarkers: [],
    markers: [],
    viewport: {
      center: [29.760427, -95.369803],
      zoom: 9
    },
    currentLocation: [],
    selectedFilter: 'All Shelters'
  }

  componentDidMount() {

    fetch('https://spreadsheets.google.com/feeds/list/14GHRHQ_7cqVrj0B7HCTVE5EbfpNFMbSI9Gi8azQyn-k/od6/public/values?alt=json')
    .then(data => data.json())
    .then(data => {
      const shelterData = data.feed.entry;
      const allShelterData = shelterData.map((shelter) => {
        let latitude = parseFloat(shelter.gsx$latitude.$t)
        let longitude = parseFloat(shelter.gsx$longitude.$t)
        return {
          county: shelter.gsx$county.$t,
          name: shelter.gsx$shelter.$t,
          address: shelter.gsx$address.$t,
          phone: shelter.gsx$phone.$t,
          pets: shelter.gsx$pets.$t,
          accepting: shelter.gsx$accepting.$t,
          location: {
            lat: latitude ? parseFloat(shelter.gsx$latitude.$t) : 0,
            lng: longitude ? parseFloat(shelter.gsx$longitude.$t) : 0
          },
          lastUpdated: shelter.gsx$lastupdated.$t,
          notes: shelter.gsx$notes.$t,
          supplyNeeds: shelter.gsx$supplyneeds.$t,
          volunteerNeeds: shelter.gsx$volunteerneeds.$t,
          showInfo: false
        }
      })

      // const allShelterData = addShelterData.map((shelter) => {
      //   const { accepting, pets, lastUpdated, supplyNeeds, volunteerNeeds } = shelter;
      //   let addIcon;

      //   addIcon = {...shelter, icon: blueMarkerIcon}
      //   accepting === "TRUE" ? (addIcon = {...shelter, icon: blueMarkerIcon}) :
      //   accepting === "FALSE" && (addIcon = {...shelter, icon: redMarkerIcon})

      //   accepting === "NOTOPEN" && (addIcon = {...shelter, icon: redMarkerIcon})
      //   accepting === "DNR" && (addIcon = {...shelter, icon: redMarkerIcon})
      //   accepting === "STAGING" && (addIcon = {...shelter, icon: redMarkerIcon})


      //   return addIcon
      // })

      this.setState({
        OGMarkers: allShelterData,
        markers: allShelterData
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

  handleFilteredList = (filteredMarkers, selectedFilter) => {
    this.setState({
      markers: filteredMarkers,
      selectedFilter: selectedFilter
    })
  }

  render() {
    const { OGMarkers, markers, viewport, currentLocation, selectedFilter } = this.state;
    return (
      <div className="App">
        <FilterMarkers
          OGMarkers={ OGMarkers }
          markers={ markers }
          onClickFilter={ this.handleFilteredList }
        />
        <GeoLocate
          currentLocation={ currentLocation }
          onClickLocate={ this.handleLocate }
        />
        <Lmap
          currentLocation={ currentLocation }
          markers={ markers }
          selectedFilter={ selectedFilter }
          viewport={ viewport }
        />
        <AddAShelter />
      </div>
    )
  }
}

export default App;

