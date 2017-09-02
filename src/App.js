import React, { Component } from 'react';
import './App.css';
import MainUi from './components/MainUi'
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import FilterPanel from './components/FilterPanel';
import FilterInfo from './components/FilterInfo';
import LoadingIcon from './components/LoadingIcon';
import * as SheltersApi from './utils/SheltersApi';

class App extends Component {
  state = {
    isLoading: true,
    OGMarkers: [],
    markers: [],
    viewport: {
      center: [29.760427, -95.369803],
      zoom: 9
    },
    currentLocation: [],
    selectedFilter: 'Accepting People',
    toggledInfo: false
  }

  async componentDidMount() {
    const shelterData = await SheltersApi.getAll();
    const allMarkerData = shelterData.shelters.map((shelters) => {
      const { county, shelter, address, city, phone, pets, accepting, latitude, longitude, last_updated, notes } = shelters;
      return {
        county: county,
        name: shelter,
        address: address,
        city: city,
        phone: phone,
        pets: pets,
        accepting: accepting,
        location: {
          lat: latitude ? parseFloat(latitude) : 0,
          lng: longitude ? parseFloat(longitude) : 0
        },
        lastUpdated: last_updated,
        notes: notes,
        showInfo: false
      }
    });

    this.setState({
      isLoading: false,
      OGMarkers: allMarkerData,
      // Accepting shelters set to default
      markers: allMarkerData.filter(marker => (marker.accepting)),
    });

    let update = {
      filterText : "Accepting People",
      filterCount : this.state.markers.length
    }
    this.updateFilterText(update)
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

  handleFilteredList = (selectedFilter, filteredMarkers) => {
    this.setState({
      markers: filteredMarkers,
      selectedFilter: selectedFilter
    })
  }

  handleToggleInfo = () => {
    this.setState({
      toggledInfo: !this.state.toggledInfo
    })
  }

  handleFilterToggle = () => {
    this.filters.handleTogglePanel();
  }

  updateFilterText = (update) => {
    update.filterCount = this.state.markers.length
    this.mainUi.updateFilterText(update);
  }

  render() {
    const { isLoading, OGMarkers, markers, viewport, currentLocation, selectedFilter, toggledInfo } = this.state;
    return (
      <div className="App">
        <MainUi filterToggle={this.handleFilterToggle.bind(this)} ref={(ref) => { this.mainUi = ref }}>
        { isLoading ? <LoadingIcon /> : ''}
        { isLoading ? '' :
        <FilterPanel
          OGMarkers={ OGMarkers }
          toggledInfo={ toggledInfo }
          onClickFilter={ this.handleFilteredList }
          ref= {(ref) => { this.filters = ref }}
          updateFilterText={this.updateFilterText.bind(this)}
        /> }

          <GeoLocate
            currentLocation={ currentLocation }
            onClickLocate={ this.handleLocate }
          />
        <Lmap
          currentLocation={ currentLocation }
          markers={ markers }
          viewport={ viewport }
          toggledInfo={ toggledInfo }
          onToggleInfo={ this.handleToggleInfo }
        />
        <FilterInfo
          selectedFilter={ selectedFilter }
          filterLength={ markers.length }
        />
        </MainUi>
      </div>
    )
  }
}

export default App;
