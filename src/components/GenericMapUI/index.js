import React, { Component } from 'react';

import * as api from '../../utils/genericApi';

import ReactModal from 'react-modal';
import LoadingIcon from '../LoadingIcon';
import GeoLocate from '../GeoLocate';
import Lmap from './Map';
import InfoBox from './InfoBox';
import LocateModal from '../LocateModal';
// import FilterPanel from '../FilterPanel';
// import Search from '../Search';

import pick from 'lodash/pick';

class GenericMapUI extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredMarkers: []
    };
  }

  componentWillMount() {
    api.getAndInitialize().then((markers) => {
      this.setState({
        isLoading: false,
        allMarkers: markers,
        filteredMarkers: markers,
        tempFilteredMarkers: markers
      });
    });
  }

  render() {
    let { props } = this;

    return (<div>
      <GeoLocate
        currentLocation={ props.currentLocation }
        onClickLocate={ props.handleLocate }
      />

      <Lmap
        filteredMarkers={this.state.filteredMarkers}
        {...pick(props, [
          'currentLocation',
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
        filteredMarkers={this.state.filteredMarkers}
        {...pick(props, [
          'currentLocation',
          'viewport',
          'selectedMarker',
          'toggledInfo',
          'query',
        ])}
      />

    </div>);
  }
}

export default GenericMapUI;