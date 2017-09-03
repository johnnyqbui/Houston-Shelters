import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import TopNavBar from './components/TopNavBar'
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import FilterPanel from './components/FilterPanel';
import LoadingIcon from './components/LoadingIcon';
import InfoBox from './components/InfoBox'

import * as SheltersApi from './utils/SheltersApi';

class App extends Component {
  state = {
    isActive: false,
    isLoading: true,
    markers: [],
    filteredMarkers: [],
    viewport: {
      center: [29.760427, -95.369803],
      zoom: 9
    },
    currentLocation: [],
    selectedFilter: 'Accepting People',
    selectedMarker: {},
    toggledInfo: false
  }

  async componentDidMount() {
    const shelterData = await SheltersApi.getAll();
    const allMarkerData = shelterData.shelters.map((shelters) => {
      console.log(shelters)
      const { county,
        shelter,
        address,
        city,
        phone,
        cleanPhone,
        pets,
        accepting,
        latitude,
        longitude,
        last_updated,
        supply_needs,
        volunteer_needs,
        notes } = shelters;
      return {
        county: county,
        shelter: shelter,
        address: address,
        city: city,
        phone: phone,
        accepting: accepting,
        pets: pets,
        location: {
          lat: latitude ? parseFloat(latitude) : 0,
          lng: longitude ? parseFloat(longitude) : 0
        },
        lastUpdated: last_updated,
        supplyNeeds:  supply_needs,
        volunteerNeeds: volunteer_needs,
        notes: notes,
        showInfo: false
      }
    });

    this.setState({
      isLoading: false,
      markers: allMarkerData,
      // Accepting shelters set to default
      filteredMarkers: allMarkerData.filter(marker => (marker.accepting)),
    });
  }

  handleFilteredList = (selectedFilter, filteredMarkers) => {
    this.setState({
      filteredMarkers: filteredMarkers,
      selectedFilter: selectedFilter
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

  handleClosePanel = () => {
    this.setState({
      isActive: false
    })
  }

  handleTogglePanel = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  handleToggleInfo = (marker) => {
    this.setState({
      selectedMarker: marker,
      toggledInfo: !this.state.toggledInfo
    })
  }

  render() {
    const {
      isActive,
      isLoading,
      markers,
      filteredMarkers,
      viewport,
      currentLocation,
      selectedFilter,
      selectedMarker,
      toggledInfo } = this.state;
    return (
      <div className="App">

        <TopNavBar />

        { isLoading && (<LoadingIcon />)}
        { !isLoading && (
          <FilterPanel
            isActive={ isActive }
            origMarkers={ markers }
            filterLength={ filteredMarkers.length }
            toggledInfo={ toggledInfo }
            onTogglePanel={ this.handleTogglePanel }
            onClickFilter={ this.handleFilteredList }
          />
        )}

        <GeoLocate
          currentLocation={ currentLocation }
          onClickLocate={ this.handleLocate }
        />

        <Lmap
          currentLocation={ currentLocation }
          markers={ filteredMarkers }
          viewport={ viewport }
          onToggleInfo={ this.handleToggleInfo }
          onTogglePanel={ this.handleTogglePanel }
          onClosePanel={ this.handleClosePanel }
        />

        <InfoBox
          className='info-bar'
          toggledInfo={ toggledInfo }
          selectedMarker={ selectedMarker }
        />
      </div>
    )
  }
}

export default App;
