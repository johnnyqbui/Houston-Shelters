import React from 'react';
import moment from 'moment';
import '../App.css';

const FilterPanel = (props) => {
    const {
        allMarkers,
        selectedFilter,
        onClickFilter,
        toggledPanel,
        onTogglePanel,
        filterLength
    } = props;

    // Show Panel on page load if not on mobile
    // window.innerWidth > 960 && (onTogglePanel())

    let allShelters = selectedFilter === "All Shelters";
    let acceptingPeople = selectedFilter === "Accepting People";
    let notAccepting = selectedFilter === "Not Accepting People";
    let pets = selectedFilter === "Pets Allowed";
    let supplyNeeds = selectedFilter === "Need Supplies";
    let volunteerNeeds = selectedFilter === "Need Volunteers";
    let updated = selectedFilter.indexOf('Updated') > -1;

    const handleFilter = (value) => {

      const allShelters = value === "All Shelters";
      const acceptingPeople = value === "Accepting People";
      const notAccepting = value === "Not Accepting People";
      const pets = value === "Pets Allowed";
      const supplyNeeds = value === "Need Supplies";
      const volunteerNeeds = value === "Need Volunteers";
      const updated = value.indexOf('Updated') > -1;

        const filtered = allMarkers.filter(marker => {
            if (allShelters) {
              return allMarkers
            } else if (acceptingPeople) {
                return marker.accepting
            } else if (notAccepting) {
                return !marker.accepting
            } else if (pets) {
                return marker.pets && marker.pets.match(/yes/ig)
            } else if (supplyNeeds) {
                return marker.supplyNeeds && !marker.supplyNeeds.match(/no\s/ig)
            } else if (volunteerNeeds) {
                return marker.volunteerNeeds && !marker.volunteerNeeds.match(/no\s/ig)
            } else if (updated) {

            if (marker.lastUpdated.length > 0) {
                const replaceLastUpdated = moment(marker.lastUpdated, 'YYYY-MM-DD hh:mm A').add(24, 'hours').format()
                const timeAfter = moment().format()
                return replaceLastUpdated > timeAfter && (marker)
            }
          }
        })

        onClickFilter(value, filtered)
    }

    return (
    <div className='filter-container'>

      <div className='filter-controls'>
        <button
          className="current-filter-button"
          onClick={ onTogglePanel }>
          <span>Filter:</span> <strong>{ selectedFilter } ({ filterLength })</strong>
        </button>
      </div>

      <div className={ toggledPanel ? 'filter-panel' : 'filter-panel closePanel' }>
        <div className='filter-title'>Filter Shelters By...</div>
        <input
          type='button'
          value='Accepting People'
          className={ acceptingPeople ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
        <input
          type='button'
          value='Not Accepting People'
          className={ notAccepting ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
        <input
          type='button'
          value='Pets Allowed'
          className={ pets ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
        <input
          type='button'
          value='Updated Within 24 Hours'
          className={ updated ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
        <input
          type='button'
          value='Need Supplies'
          className={ supplyNeeds ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
        <input
          type='button'
          value='Need Volunteers'
          className={ volunteerNeeds ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
        <input
          type='button'
          value='All Shelters'
          className={ allShelters ? 'blueButton selected' : 'blueButton' }
          onClick={(e) => {handleFilter(e.target.value)}}/>
      </div>
    </div>
    )

}

export default FilterPanel