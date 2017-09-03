import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';

class FilterPanel extends Component {
  state = {
    selectedFilter: {
      value: 'Accepting People',
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
    const { onTogglePanel } = this.props;
    // Show Panel on page load if not on mobile
    window.innerWidth > 600 && ( onTogglePanel() )
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

    this.setState({
      selectedFilter: {
        value: value,
        allShelters: allShelters,
        acceptingPeople: acceptingPeople,
        notAccepting: notAccepting,
        pets: pets,
        supplyNeeds: supplyNeeds,
        volunteerNeeds: volunteerNeeds,
        updated: updated
      }
    })

    onClickFilter(value, filtered)
  }

  render() {
    const { isActive, origMarkers, toggledInfo, onTogglePanel, filterLength } = this.props;
    const { selectedFilter } = this.state;

    const {
      value,
      allShelters,
      acceptingPeople,
      notAccepting,
      pets,
      supplyNeeds,
      volunteerNeeds,
      updated } = selectedFilter;
      return (
        <div className='filter-container'>

          <div className='filter-controls'>
            <button
              className="current-filter-button"
              onClick={ onTogglePanel }>
              <span>Filter:</span> <strong>{ value } ({ filterLength })</strong>
            </button>
          </div>

          <div className={ isActive ? 'filter-panel' : 'filter-panel closePanel' }>
            <div className='filter-title'>Filter Shelters By...</div>
            <input
              type='button'
              value='Accepting People'
              className={ acceptingPeople ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
            <input
              type='button'
              value='Not Accepting People'
              className={ notAccepting ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
            <input
              type='button'
              value='Pets Allowed'
              className={ pets ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
            <input
              type='button'
              value='Updated Within 24 Hours'
              className={ updated ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
            <input
              type='button'
              value='Need Supplies'
              className={ supplyNeeds ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
            <input
              type='button'
              value='Need Volunteers'
              className={ volunteerNeeds ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
            <input
              type='button'
              value='All Shelters'
              className={ allShelters ? 'blueButton selected' : 'blueButton' }
              onClick={(e) => {this.handleFilter(e.target.value, origMarkers)}}/>
          </div>
        </div>
      )
  }
}

export default FilterPanel
