import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ReactModal from 'react-modal';

import './App.css';

import config from './config';

import Meta from './components/Meta';

import LocateModal from './components/LocateModal';
import TopNavBar from './components/TopNavBar';
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import AddShelter from './components/AddShelter';
import FilterPanel from './components/FilterPanel';
import Search from './components/Search';
import LoadingIcon from './components/LoadingIcon';
import InfoBox from './components/InfoBox';

import Credits from './pages/Credits';

import * as SheltersApi from './utils/SheltersApi';

class App extends Component {
    state = {
        showModal: true,
        isLoading: true,
        allMarkers: [],
        filteredMarkers: [],
        tempFilteredMarkers: [],
        viewport: config.map,
        currentLocation: [],
        selectedFilter: 'Accepting People',
        tempSelectedFilter: 'Accepting People',
        selectedMarker: {},
        toggledInfo: false,
        toggledPanel: false,
        toggledSearchBox: false,
        query: ''
    }

    async componentDidMount() {
        // console.log('Component Mounted')
        const shelterData = await SheltersApi.getAll();
        const allMarkerData = shelterData.shelters
        .filter(shelters => shelters.latitude)
        .map((shelters) => {
            const {
                county,
                shelter,
                address,
                city,
                phone,
                cleanPhone,
                pets,
                accepting,
                latitude,
                longitude,
                updatedAt,
                supply_needs,
                volunteer_needs,
                notes
            } = shelters;
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
                    lat: latitude,
                    lng: longitude
                },
                lastUpdated: updatedAt,
                supplyNeeds: supply_needs,
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

    // // For debugging purposes
    // componentWillMount() {
    //     console.log('Component is about to mount')
    // }

    // componentWillReceiveProps(nextProps) {
    //     console.log('Component is about to receive props', nextProps)
    // }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('Should component update?')
    //     console.log('Next Props', nextProps)
    //     console.log('Next State', nextState)
    //     return true
    // }

    // componentWillUpdate() {
    //     console.log('Component is about to update')
    // }

    // componentDidUpdate() {
    //     console.log('Component has updated')
    // }

    // componentWillUnmount() {
    //     console.log('Component is about to unmount')
    // }


    handleFilteredMarkers = (selectedFilter, filteredMarkers) => {
        this.setState({
            filteredMarkers: filteredMarkers,
            tempFilteredMarkers: filteredMarkers,
            selectedFilter: selectedFilter,
            tempSelectedFilter: selectedFilter
        })
    }

    handleSelectedFilters = (selectedFilter) => {
        this.setState({
            selectedFilter: selectedFilter
        })
    }

    handleLocate = (currentLocation) => {
        this.setState({
            viewport: {
                center: currentLocation,
                zoom: 15
            },
            currentLocation: currentLocation,
            showModal: false
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

    handleOpenSearchBox = () => {
        this.setState({
            toggledSearchBox: true
        })
    }

    handleCloseSearchBox = () => {
        this.setState({
            toggledSearchBox: false
        })
    }

    handleInputSearch = (query, selectedFilter) => {
        this.setState({
            filteredMarkers: query,
            selectedFilter: selectedFilter
        })
    }

    handleCompleteSearch = (matched, query) => {
        const latLng = window.innerWidth > 960 ?
        [matched.location.lat, matched.location.lng-.02] :
        [matched.location.lat, matched.location.lng]
        this.setState({
            viewport: {
              // Dirty fixed with zoom
                center: latLng,
                zoom: 14
            },
            selectedMarker: matched,
            filteredMarkers: [matched],
            toggledInfo: true,
            query: query
        })
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
     this.setState({ showModal: false });
    }

    render() {
        const {
            showModal,
            isLoading,
            allMarkers,
            filteredMarkers,
            tempFilteredMarkers,
            selectedFilter,
            tempSelectedFilter,
            viewport,
            currentLocation,
            selectedMarker,
            toggledInfo,
            toggledPanel,
            toggledSearchBox,
            query } = this.state;
        return (
            <div className="App">
                <Meta />
                    <TopNavBar />
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Modal"
                        onRequestClose={this.handleCloseModal}
                        className="overlay-content"
                        overlayClassName="overlay"
                    >
                        <h2>Find Your Nearest Shelter</h2>
                        <div className="locate-button-container">
                        <LocateModal
                            showModal={ showModal }
                            currentLocation={ currentLocation }
                            onClickLocate={ this.handleLocate }
                        />
                        <button
                            className='skip-modal'
                            onClick={this.handleCloseModal}>
                            Skip for Now
                        </button>
                        </div>
                    </ReactModal>

                    { isLoading ? <LoadingIcon /> :
                        <div>
                            <Search
                                allMarkers={ allMarkers }
                                tempFilteredMarkers = { tempFilteredMarkers }

                                toggledInfo={ toggledInfo }
                                selectedFilter={ selectedFilter }
                                tempSelectedFilter={ tempSelectedFilter }

                                toggledSearchBox={ toggledSearchBox }

                                onSelectedFilter={ this.handleSelectedFilters }

                                onCompleteSearch={ this.handleCompleteSearch }
                                onInputSearch={ this.handleInputSearch }

                                onCloseSearchBox={ this.handleCloseSearchBox }
                                onOpenSearchBox={ this.handleOpenSearchBox }

                                onCloseInfoBox={ this.handleCloseInfoBox } >
                            </Search>

                            <FilterPanel
                                toggledPanel={ toggledPanel }
                                allMarkers={ allMarkers }
                                filterLength={ filteredMarkers.length }
                                selectedFilter={ selectedFilter }
                                toggledInfo={ toggledInfo }

                                onTogglePanel={ this.handleTogglePanel }
                                onClickFilter={ this.handleFilteredMarkers }
                                onCloseSearchBox={ this.handleCloseSearchBox }
                                onCloseInfoBox={ this.handleCloseInfoBox }
                            />
                        </div>
                    }

                    <GeoLocate
                        showModal={ showModal }
                        currentLocation={ currentLocation }
                        onClickLocate={ this.handleLocate }
                    />

                    <AddShelter />

                    <Lmap
                        currentLocation={ currentLocation }
                        filteredMarkers={ filteredMarkers }
                        viewport={ viewport }
                        selectedMarker={ selectedMarker }

                        onOpenInfoBox={ this.handleOpenInfoBox }

                        onCloseInfoBox={ this.handleCloseInfoBox }
                        onClosePanel={ this.handleClosePanel }
                        onCloseSearchBox={ this.handleCloseSearchBox }
                    />

                    <InfoBox
                        toggledInfo={ toggledInfo }
                        selectedMarker={ selectedMarker }
                        query={ query }
                    />

                <Route path='/credits' render={( history ) => (
                    <Credits />
                )} />

            </div>
        )
    }
}

export default App;