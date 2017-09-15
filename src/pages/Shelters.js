import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import { stringify, parse } from 'qs';
import config from '../config';

import LocateModal from '../components/LocateModal';
import Lmap from '../components/Map';
import GeoLocate from '../components/GeoLocate';
import FilterPanel from '../components/FilterPanel';
import Search from '../components/Search';
import LoadingIcon from '../components/LoadingIcon';
import InfoBox from '../components/InfoBox';

import * as SheltersApi from '../utils/SheltersApi';

import createHistory from 'history/createBrowserHistory'

const history = createHistory()

// Get the current location.
const location = history.location

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state)
})

// Use push, replace, and go to navigate around.
// history.push('/', { some: 'state' })
unlisten()

class Shelters extends Component {
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
                id,
                county,
                shelter,
                address,
                city,
                phone,
                cleanPhone,
                pets,
                pets_notes,
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
                id: id,
                county: county,
                shelter: shelter,
                address: address,
                city: city,
                phone: phone,
                cleanPhone: cleanPhone,
                accepting: accepting,
                pets: pets,
                pets_notes: pets_notes,
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
    }

    handleUrlQuery = (id, shelter) => {
    	const { selectedFilter } = this.state;

		const queryShelter = encodeURIComponent(shelter)
		const querySelectedFilter = encodeURIComponent(selectedFilter).replace(/%20/g,'+')

		history.push({
			pathname: `/shelters`,
			query: `${id}`,
			search: `filter=${querySelectedFilter}`,
			state: {some: 'state'}
		})

		console.log(this.props.location)
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

    handleCompleteSearch = (matched) => {
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
			<div>
			 	<div id="fb-root"></div>
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

		                    onClosePanel={ this.handleClosePanel }

		                    onCompleteSearch={ this.handleCompleteSearch }
		                    onInputSearch={ this.handleInputSearch }

		                    onCloseSearchBox={ this.handleCloseSearchBox }
		                    onOpenSearchBox={ this.handleOpenSearchBox }

		                    onCloseInfoBox={ this.handleCloseInfoBox }
		                    onOpenInfoBox={ this.handleOpenInfoBox }

		                    onSetBounds={ this.handleSetBounds }
		                    onClearCounties={ this.clearCounties}

		                    onHandleUpdateQuery={ this.handleUpdateQuery }
		                    onUrlQuery={ this.handleUrlQuery }

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
		                    onClearCounties={ this.clearCounties }
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
		    </div>
		)
	}

}

export default Shelters;