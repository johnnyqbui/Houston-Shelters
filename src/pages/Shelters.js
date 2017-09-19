import React, { Component } from 'react';
import ReactModal from 'react-modal';

import config from '../config';

import LocateModal from '../components/LocateModal';
import Lmap from '../components/Map';
import GeoLocate from '../components/GeoLocate';
import FilterPanel from '../components/FilterPanel';
import Search from '../components/Search';
import LoadingIcon from '../components/LoadingIcon';
import InfoBox from '../components/InfoBox';

import * as SheltersApi from '../utils/SheltersApi';

class Shelters extends Component {
	state = {
        showModal: true,
        isLoading: true,
        noShelterMsg: false,
        allMarkers: [],
        filteredMarkers: [],
        tempFilteredMarkers: [],
        viewport: config.map,
        currentLocation: [],
        selectedFilter: 'Need Supplies/Volunteers',
        tempSelectedFilter: 'Need Supplies/Volunteers',
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

        const searchParams = this.props.location.search
        const idParams = parseInt(this.props.match.params.id)
    	const paramMarker = allMarkerData.find(m => m.id === idParams)

    	if (paramMarker) {
        	this.handleCompleteSearch(paramMarker)
            this.updateUrlParams(paramMarker)
        	this.setState({
                selectedFilter: 'All Shelters',
                tempSelectedFilter: 'All Shelters',
                tempFilteredMarkers: allMarkerData,
        		showModal: false
        	})
        } else {
            const initialMarkers = allMarkerData.filter(m => m.supplyNeeds || m.volunteerNeeds)
	        this.setState({
	            filteredMarkers: initialMarkers,
	            tempFilteredMarkers: initialMarkers
	        });
        }

        this.setState({
            allMarkers: allMarkerData,
			isLoading: false
		})
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

    updateUrlParams = (data, selectedFilter) => {
        // console.log(selectedFilter)
        const shelterName = data['shelter'].trim().toLowerCase().replace(/\s/g, '+')
    	this.props.history.push(`/shelters/${data.id}/${shelterName}`)
    }

    render() {
    	const {
            showModal,
            isLoading,
            noShelterMsg,
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
		                	match={ this.props.match }
		                	history={ this.props.history }
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
		                    updateUrlParams={ this.updateUrlParams }

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
		            updateUrlParams={ this.updateUrlParams }

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