import React, { Component } from 'react';
import './App.css';
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import FilterMarkers from './components/FilterMarkers';
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
    try {
      const shelters = await SheltersApi.getAll();
      const allShelterData = shelters.map((shelter) => {
        const { County, Shelter, Address, City, Phone, Pets, Accepting, latitude, longitude, Last_updated, Notes } = shelter;
        return {
          county: County,
          name: Shelter,
          address: Address,
          city: City,
          phone: Phone,
          pets: Pets,
          accepting: Accepting,
          location: {
            lat: latitude ? parseFloat(latitude) : 0,
            lng: longitude ? parseFloat(longitude) : 0
          },
          lastUpdated: Last_updated,
          notes: Notes,
          showInfo: false
        }
      });

      this.setState({
        isLoading: false,
        OGMarkers: allShelterData,
        // Accepting shelters set to default
        markers: allShelterData.filter(marker => (marker.accepting === 'TRUE'))
      });
    }
    catch (error) {
      console.log("Error", error);
    }
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

  handleToggleInfo = () => {
    this.setState({
      toggledInfo: !this.state.toggledInfo
    })
  }

  render() {
    const { isLoading, OGMarkers, markers, viewport, currentLocation, selectedFilter, toggledInfo } = this.state;
    return (
      <div className="App">
        { isLoading ? <LoadingIcon /> : ''}
        <FilterMarkers
          OGMarkers={ OGMarkers }
          markers={ markers }
          toggledInfo={ toggledInfo }
          onClickFilter={ this.handleFilteredList }
        />
        <GeoLocate
          currentLocation={ currentLocation }
          toggledInfo={ toggledInfo }
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
          selectedFilter={selectedFilter}
          filterLength={markers.length}
        />  
      </div>
    )
  }
}

export default App;
