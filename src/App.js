import React, {Component} from 'react';
import './App.css';
import MainUi from './components/MainUi'
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import FilterMarkers from './components/FilterMarkers';
import AddAShelter from './components/AddAShelter';
import VolunteerShelterLink from './components/VolunteerShelterLink';

class App extends Component {
  state = {
    OGMarkers: [],
    markers: [],
    viewport: {
      center: [29.760427, -95.369803],
      zoom: 9
    },
    currentLocation: [],
    currentMarker: []
  }

  constructor(props) {
    super(props);
    this.changeMarker = this.changeMarker.bind(this);
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

        this.setState({
          OGMarkers: allShelterData,
          // Accepting shelters set to default
          markers: allShelterData.filter(marker => (marker.accepting === 'TRUE'))
        })

        let update = {
          filterText : "Accepting People",
          filterCount : this.state.markers.length
        }
        this.updateFilterText(update)
      })
  }

  changeMarker(e) {
    this.props.onChangeMarker(e);
  }

  handleFilterToggle = () => {
    this.filters.handleTogglePanel();
  }

  updateFilterText = (update) => {
    update.filterCount = this.state.markers.length
    this.mainUi.updateFilterText(update);
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

  handleFilteredList = (filteredMarkers) => {
    this.setState({
      markers: filteredMarkers,
    })
  }

  render() {
    const {OGMarkers, markers, viewport, currentLocation, currentMarker} = this.state;
    return (
      <div className="App">
        <MainUi filterToggle={this.handleFilterToggle.bind(this)} ref={(ref) => { this.mainUi = ref }}>
          <FilterMarkers
            OGMarkers={OGMarkers}
            markers={markers}
            onClickFilter={this.handleFilteredList}
            ref= {(ref) => { this.filters = ref }}
            updateFilterText={this.updateFilterText.bind(this)}
          />
          <Lmap
            currentLocation={currentLocation}
            markers={markers}
            viewport={viewport}
            currentMarker={currentMarker}
          />
          <GeoLocate
            currentLocation={ currentLocation }
            onClickLocate={ this.handleLocate }
          />

          <AddAShelter/>
          <VolunteerShelterLink/>
        </MainUi>
      </div>
    )
  }
}

export default App;

