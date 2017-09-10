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
        query: '',
        countyBounds: []
    }

    async componentDidMount() {
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

    handleInputSearch = (filteredMarkers, selectedFilter) => {
        this.setState({
            filteredMarkers: filteredMarkers,
            selectedFilter: selectedFilter
        })
    }

    handleUpdateQuery = (query) => {
        this.setState({
            query: query
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
            countyBounds: []
        })
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    handleSetBounds = (counties) => {
        const countyLatLng = counties.map((county) => {
            const countyLatLngArr = [county.location.lat, county.location.lng]
            return [countyLatLngArr];
        })

        this.setState({
            countyBounds: countyLatLng
        })
    }

    clearCounties = () => {
        this.setState({
            countyBounds: []
        })
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
            query,
            countyBounds } = this.state;
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
                                tempFilteredMarkers={ tempFilteredMarkers }
                                filteredMarkers={ filteredMarkers }

                                toggledInfo={ toggledInfo }
                                selectedFilter={ selectedFilter }
                                tempSelectedFilter={ tempSelectedFilter }

                                toggledSearchBox={ toggledSearchBox }
                                onSelectedFilter={ this.handleSelectedFilters }

                                onCompleteSearch={ this.handleCompleteSearch }
                                onInputSearch={ this.handleInputSearch }

                                onCloseSearchBox={ this.handleCloseSearchBox }
                                onOpenSearchBox={ this.handleOpenSearchBox }

                                onCloseInfoBox={ this.handleCloseInfoBox }
                                onOpenInfoBox={ this.handleOpenInfoBox }

                                onSetBounds={ this.handleSetBounds }
                                onClearCounties={ this.clearCounties}

                                onHandleUpdateQuery={ this.handleUpdateQuery }
                                >
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

                    <Lmap
                        currentLocation={ currentLocation }
                        filteredMarkers={ filteredMarkers }
                        viewport={ viewport }
                        selectedMarker={ selectedMarker }
                        toggledInfo={ toggledInfo }
                        onSelectMarker={ this.handleSelectMarker }
                        onOpenInfoBox={ this.handleOpenInfoBox }
                        onCloseInfoBox={ this.handleCloseInfoBox }
                        onClosePanel={ this.handleClosePanel }
                        onCloseSearchBox={ this.handleCloseSearchBox }

                        countyBounds={ countyBounds }
                        onClearCounties={ this.clearCounties }
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