import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import TopNavBar from './components/TopNavBar';
import Lmap from './components/Map';
import GeoLocate from './components/GeoLocate';
import AddShelter from './components/AddShelter';
import FilterPanel from './components/FilterPanel';
import Search from './components/Search';
import LoadingIcon from './components/LoadingIcon';
import InfoBox from './components/InfoBox'

import Credits from './pages/Credits';

import * as SheltersApi from './utils/SheltersApi';

class App extends Component {
    state = {
        toggledPanel: true,
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
        toggledInfo: false,
        query: ''
    }

    async componentDidMount() {
        // console.log('Component Mounted')
        const shelterData = await SheltersApi.getAll();
        const allMarkerData = shelterData.shelters.map((shelters) => {
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
                    lat: latitude ? parseFloat(latitude) : 0,
                    lng: longitude ? parseFloat(longitude) : 0
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

    // For debugging purposes
    componentWillMount() {
        // console.log('Component is about to mount')
    }

    componentWillReceiveProps(nextProps) {
        // console.log('Component is about to receive props', nextProps)
    }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log('Should component update?')
        // console.log('Next Props', nextProps)
        // console.log('Next State', nextState)
        return true
    }

    componentWillUpdate() {
        // console.log('Component is about to update')
    }

    componentDidUpdate() {
        // console.log('Component has updated')
    }

    componentWillUnmount() {
        // console.log('Component is about to unmount')
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

    handleClickSearch = (matched, query) => {
        this.setState({
            viewport: {
                center: [matched.location.lat, matched.location.lng],
                zoom: 14
            },
            selectedMarker: matched,
            filteredMarkers: [matched],
            toggledInfo: true,
            query: query
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
            toggledInfo,
            query } = this.state;
        return (
            <div className="App">

                    <TopNavBar />

                    <Route exact path='/' render={() => (
                        <div>

                        <Search
                            allMarkers={ allMarkers }
                            tempFilteredMarkers = { tempFilteredMarkers }
                            onClickSearch={ this.handleClickSearch }
                            onInputSearch={ this.handleInputSearch }
                            onCloseInfoBox={ this.handleCloseInfoBox }
                        />
                        { isLoading ? <LoadingIcon /> :
                            <FilterPanel
                                toggledPanel={ toggledPanel }
                                allMarkers={ allMarkers }
                                filterLength={ filteredMarkers.length }
                                selectedFilter={ selectedFilter }
                                toggledInfo={ toggledInfo }
                                onTogglePanel={ this.handleTogglePanel }
                                onClickFilter={ this.handleFilteredMarkers }
                            />
                        }

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
                            toggledInfo={ toggledInfo }
                            selectedMarker={ selectedMarker }
                            query={ query }
                        />
                    </div>
                )} />

                <Route path='/credits' render={( history ) => (
                    <Credits />
                )} />

            </div>
        )
    }
}

export default App;
