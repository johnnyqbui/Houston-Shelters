import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import ExternalLinks from './ExternalLinks';

class FilterPanel extends Component {
  state = {
    isActive: false,
    selectedFilter: {
      allShelters: false,
      acceptingPeople: true,
      notAccepting: false,
      pets: false,
      supplyNeeds: false,
      volunteerNeeds: false,
      updated: false
    }
  }

  componentDidMount() {
    // Show Panel on page load if not on mobile
    window.innerWidth > 600 && ( this.handleTogglePanel() )
  }


  handleFilter = (value, origMarkers) => {

    const { onClickFilter } = this.props;
    let allShelters = value === "All Shelters";
    let acceptingPeople = value === "Accepting People";
    let notAccepting = value === "Not Accepting People";
    let pets = value === "Pets Allowed";
    let supplyNeeds = value === "Need Supplies";
    let volunteerNeeds = value === "Need Volunteers";
    let updated = value.indexOf('Updated') > -1;

    this.setState({
      selectedFilter: {
        allShelters: allShelters,
        acceptingPeople: acceptingPeople,
        notAccepting: notAccepting,
        pets: pets,
        supplyNeeds: supplyNeeds,
        volunteerNeeds: volunteerNeeds,
        updated: updated
      }
    })

    let filtered = origMarkers.filter(marker => {
      if (allShelters) {return origMarkers}

        else if (acceptingPeople) {return marker.accepting}

          else if (notAccepting) {return !marker.accepting}

            else if (pets) {return marker.pets.length > 0 && marker.pets.match(/yes/ig)}

              else if (supplyNeeds) {return marker.supplyNeeds && !marker.supplyNeeds.match(/no\s/ig)}

                else if (volunteerNeeds) {return marker.volunteerNeeds && !marker.volunteerNeeds.match(/no\s/ig)}

                  else if (updated) {
                    if (marker.lastUpdated.length > 0) {
                    const replaceLastUpdated = moment(marker.lastUpdated, 'YYYY-MM-DD hh:mm A').add(24, 'hours').format()
                    const timeAfter = moment().format()
                    return replaceLastUpdated > timeAfter && (marker)
                  }}
    })

    onClickFilter(value, filtered)

    let update = {
      filterText: value,
      filterCount: 0 // todo: fix me later jn

    }
    this.props.updateFilterText(update);

    // If on mobile, then close on filter click
    window.innerWidth < 600 && ( this.handleTogglePanel() )
  }

  handleTogglePanel = () => {
    this.setState({
      isActive: !this.state.isActive
    })
  }

  render() {
    const { OGMarkers, toggledInfo, markers } = this.props;
    const { isActive, selectedFilter } = this.state;
    const {
      allShelters,
      acceptingPeople,
      notAccepting,
      pets,
      supplyNeeds,
      volunteerNeeds,
      updated } = selectedFilter;
      return (
        <div className={ toggledInfo ? 'hideTopButtons filterComponent' : 'filterComponent' }>
          <div className={ isActive ? 'filterPanel' : 'filterPanel closePanel' }>
            <div className='title'>Filter Shelters By...</div>
            <input
              type='button'
              value='Accepting People'
              className={ acceptingPeople ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
            <input
              type='button'
              value='Pets Allowed'
              className={ pets ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
            <input
              type='button'
              value='All Shelters'
              className={ allShelters ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
            <input
              type='button'
              value='Not Accepting People'
              className={ notAccepting ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
            <input
              type='button'
              value='Updated Within 24 Hours'
              className={ updated ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
            <input
              type='button'
              value='Need Supplies'
              className={ supplyNeeds ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
            <input
              type='button'
              value='Need Volunteers'
              className={ volunteerNeeds ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, OGMarkers)}}/>
          </div>
        </div>
      )
  }
}

export default FilterPanel
