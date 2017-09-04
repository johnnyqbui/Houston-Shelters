import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import TopNavBar from './components/TopNavBar'
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import AddShelter from './components/AddShelter'
import FilterPanel from './components/FilterPanel';
import Search from './components/Search';
import LoadingIcon from './components/LoadingIcon';
import InfoBox from './components/InfoBox'
import * as SheltersApi from './utils/SheltersApi';

class App extends Component {
  state = {
    toggledPanel: false,
    isLoading: true,
    allMarkers: [],
    filteredMarkers: [],
    tempFilteredMarkers: [],
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
        cleanPhone: cleanPhone,
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
    // Set initial markers to be accepting
    const initialMarkers = allMarkerData.filter(marker => (marker.accepting))
    this.setState({
      isLoading: false,
      allMarkers: allMarkerData,
      filteredMarkers: initialMarkers,
      tempFilteredMarkers: initialMarkers
    });
  }

  handleFilteredMarkers = (selectedFilter, filteredMarkers) => {
    this.setState({
      filteredMarkers: filteredMarkers,
      tempFilteredMarkers: filteredMarkers,
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
      toggledPanel: false
    })
  }

  handleTogglePanel = () => {
    this.setState({
      toggledPanel: !this.state.toggledPanel
    })
  }

  handleOpenInfoBox = (marker) => {
    this.setState({
      selectedMarker: marker,
      toggledInfo: true
    })
  }

  handleCloseInfoBox = () => {
    this.setState({
      toggledInfo: false
    })
  }

  handleInputSearch = (query) => {
      this.setState({
        filteredMarkers: query
      })
  }

  handleClickSearch = (matched) => {
    this.setState({
      viewport: {
        center: [matched.location.lat, matched.location.lng],
        zoom: 14
      },
      selectedMarker: matched,
      filteredMarkers: [matched],
      toggledInfo: true
    })
  }

  render() {
    const {
      toggledPanel,
      isLoading,
      allMarkers,
      filteredMarkers,
      tempFilteredMarkers,
      selectedFilter,
      viewport,
      currentLocation,
      selectedMarker,
      toggledInfo } = this.state;
    return (
      <div className="App">

        <TopNavBar />

        <Search
          allMarkers={ allMarkers }
          tempFilteredMarkers = { tempFilteredMarkers }
          onClickSearch={ this.handleClickSearch }
          onInputSearch={ this.handleInputSearch }
          onCloseInfoBox={ this.handleCloseInfoBox }
        />

        { isLoading && (<LoadingIcon />)}
        { !isLoading && (
          <FilterPanel
            toggledPanel={ toggledPanel }
            allMarkers={ allMarkers }
            filterLength={ filteredMarkers.length }
            selectedFilter={ selectedFilter }
            toggledInfo={ toggledInfo }
            onTogglePanel={ this.handleTogglePanel }
            onClickFilter={ this.handleFilteredMarkers }
          />
        )}

        <GeoLocate
          currentLocation={ currentLocation }
          onClickLocate={ this.handleLocate }
        />

        <AddShelter />

        <Lmap
          currentLocation={ currentLocation }
          filteredMarkers={ filteredMarkers }
          allMarkers={ allMarkers }
          viewport={ viewport }
          selectedMarker={ selectedMarker }

          onOpenInfoBox={ this.handleOpenInfoBox }
          onCloseInfoBox={ this.handleCloseInfoBox }

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
