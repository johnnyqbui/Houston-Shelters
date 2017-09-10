import pick from 'lodash/pick';
import React from 'react';
import ReactModal from 'react-modal';

import LocateModal from '../LocateModal';
import Lmap from '../Map';
import GeoLocate from '../GeoLocate';
import FilterPanel from '../FilterPanel';
import Search from '../Search';
import LoadingIcon from '../LoadingIcon';
import InfoBox from '../InfoBox';


const SearchAndFilterPanel = (props) => {
    if (props.isLoading){
        return (<LoadingIcon />);
    } else {
        return (<div>
            <Search
                {...pick(props, [
                  'allMarkers',
                  'tempFilteredMarkers',
                  'toggledInfo',
                  'selectedFilter',
                  'tempSelectedFilter',
                  'toggledSearchBox'
                ])}

                onSelectedFilter={ props.handleSelectedFilters }

                onCompleteSearch={ props.handleCompleteSearch }
                onInputSearch={ props.handleInputSearch }

                onCloseSearchBox={ props.handleCloseSearchBox }
                onOpenSearchBox={ props.handleOpenSearchBox }

                onCloseInfoBox={ props.handleCloseInfoBox }
                onOpenInfoBox={ props.handleOpenInfoBox }
            />

            <FilterPanel
                {...pick(props, [
                  'toggledPanel',
                  'allMarkers',
                  'selectedFilter',
                  'toggledInfo'
                ])}

                filterLength={ props.filteredMarkers.length }
                onTogglePanel={ props.handleTogglePanel }
                onClickFilter={ props.handleFilteredMarkers }
                onCloseSearchBox={ props.handleCloseSearchBox }
                onCloseInfoBox={ props.handleCloseInfoBox }
            />
        </div>);
    }
}


const Shelters = (props) => {

    return (<div>
        <ReactModal
            isOpen={props.showModal}
            contentLabel="Modal"
            onRequestClose={props.handleCloseModal}
            className="overlay-content"
            overlayClassName="overlay"
        >
            <h2>Find Your Nearest Shelter</h2>
            <div className="locate-button-container">
                <LocateModal
                    showModal={ props.showModal }
                    currentLocation={ props.currentLocation }
                    onClickLocate={ props.handleLocate }
                />
                <button
                    className='skip-modal'
                    onClick={ props.handleCloseModal }>
                    Skip for Now
                </button>
            </div>
        </ReactModal>
        <SearchAndFilterPanel {...props}/>
        <GeoLocate
            showModal={ props.showModal }
            currentLocation={ props.currentLocation }
            onClickLocate={ props.handleLocate }
        />

        <Lmap
            {...pick(props, [
              'currentLocation',
              'filteredMarkers',
              'viewport',
              'selectedMarker',
              'toggledInfo'
            ])}
            onSelectMarker={ props.handleSelectMarker }
            onOpenInfoBox={ props.handleOpenInfoBox }
            onCloseInfoBox={ props.handleCloseInfoBox }
            onClosePanel={ props.handleClosePanel }
            onCloseSearchBox={ props.handleCloseSearchBox }
        />

        <InfoBox
            {...pick(props, [
              'currentLocation',
              'filteredMarkers',
              'viewport',
              'selectedMarker',
              'toggledInfo',
              'query'
            ])}
        />
    </div>);
}

export default Shelters;
