import React from 'react';
import moment from 'moment';
import '../App.css';
import FaFilter from 'react-icons/lib/fa/filter';

const FilterPanel = (props) => {
    const {
        allMarkers,
        selectedFilter,
        onClickFilter,
        toggledPanel,
        onTogglePanel,
        toggledInfo,
        onCloseSearchBox,
        onCloseInfoBox,
        filterLength
    } = props;

    const filters = [
        {
            name: 'Accepting People',
            match: (m) => m.accepting,
        }, {
            name: 'Special Needs',
            match: (m) => m.specialNeeds && m.accepting,
        }, {
            name: 'Pets Allowed',
            match: (m) => m.pets && m.pets.match(/yes/ig),
        }, {
            name: 'Need Supplies',
            match: (m) => m.supplyNeeds && !m.supplyNeeds.match(/no\s/ig),
        }, {
            name: 'Need Volunteers',
            match: (m) => m.volunteerNeeds && !m.volunteerNeeds.match(/no\s/ig),
        }, {
            name: 'Updated Within 24 Hours',
            match: (m) => {
                if (m.lastUpdated.length > 0) {
                    const lastUpdatedPlus = moment(m.lastUpdated).add(24, 'hours').format();
                    const current = moment().format();
                    return lastUpdatedPlus > current;
                }
            },
        }, {
            name: 'All Shelters',
            match: (m) => true,
        }
    ];

    let matchFunctionsByName = {}
    filters.forEach((filter) => {
        matchFunctionsByName[filter.name] = filter.match;
    })

    // Show Panel on page load if not on mobile
    // window.innerWidth > 960 && (onTogglePanel())

    const handleFilter = (value) => {
        const filtered = allMarkers.filter(matchFunctionsByName[value]);
        onClickFilter(value, filtered)
        onCloseSearchBox()
    }

    const isSelected = (name) => selectedFilter === name;

    return (
    <div className={toggledInfo ? 'filter-container open' : 'filter-container'}>

      <div className='filter-controls'>
        <button
          className="current-filter-button"
          onClick={() => {
            onTogglePanel()
            onCloseInfoBox()
          }}>

          <FaFilter
            className='fa-filter'/>
          <span>Filter:</span> <strong>{ selectedFilter } ({ filterLength })</strong>
        </button>
      </div>

      <div className={ toggledPanel ? 'filter-panel' : 'filter-panel closePanel' }>
        <div className='filter-title'>Filter Shelters By...</div>
        {filters.map((filter) => (
            <input
                key={filter.name}
                type='button'
                value={filter.name}
                className={`blueButton${isSelected(filter.name)?' selected':''}`}
                onClick={(e) => {handleFilter(e.target.value)}}
            />
        ))}
      </div>
    </div>
    )

}

export default FilterPanel
