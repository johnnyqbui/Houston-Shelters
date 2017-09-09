import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import config from './config';

import Meta from './components/Meta';
import TopNavBar from './components/TopNavBar';

import Shelters from './components/Shelters';
import GenericMapUI from './components/GenericMapUI';

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
                notes,
                special_needs
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
                specialNeeds: special_needs,
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

        window.scrollTo(0,1); // attempt to autoscroll a mobile window

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
                zoom: 11
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

    handleOpenInfoBox = () => {
        this.setState({
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

    handleSelectMarker = (marker) => {
        this.setState({
            selectedMarker: marker
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
            query: query,
            toggledInfo: true
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
                <Route exact path="/" render={() => (
                    <Shelters
                        {...this.state}
                        handleSelectedFilters={this.handleSelectedFilters}
                        handleCompleteSearch={this.handleCompleteSearch}
                        handleInputSearch={this.handleInputSearch}
                        handleOpenSearchBox={this.handleOpenSearchBox}
                        handleTogglePanel={this.handleTogglePanel}
                        handleFilteredMarkers={this.handleFilteredMarkers}
                        handleLocate={this.handleLocate}
                        handleCloseModal={this.handleCloseModal}
                        handleSelectMarker={this.handleSelectMarker}
                        handleOpenInfoBox={this.handleOpenInfoBox}
                        handleCloseInfoBox={this.handleCloseInfoBox}
                        handleClosePanel={this.handleClosePanel}
                        handleCloseSearchBox={this.handleCloseSearchBox}
                    />
                )} />

                <Route path='/rescues' render={( history ) => (
                    <GenericMapUI
                        {...this.state}
                        handleSelectedFilters={this.handleSelectedFilters}
                        handleCompleteSearch={this.handleCompleteSearch}
                        handleInputSearch={this.handleInputSearch}
                        handleOpenSearchBox={this.handleOpenSearchBox}
                        handleTogglePanel={this.handleTogglePanel}
                        handleFilteredMarkers={this.handleFilteredMarkers}
                        handleLocate={this.handleLocate}
                        handleCloseModal={this.handleCloseModal}
                        handleSelectMarker={this.handleSelectMarker}
                        handleOpenInfoBox={this.handleOpenInfoBox}
                        handleCloseInfoBox={this.handleCloseInfoBox}
                        handleClosePanel={this.handleClosePanel}
                        handleCloseSearchBox={this.handleCloseSearchBox}
                    />
                )} />

                <Route path='/credits' render={( history ) => (
                    <Credits />
                )} />

            </div>
        )
    }
}

export default App;