import React from 'react';
import FaFilter from 'react-icons/lib/fa/filter';
import moment from 'moment';

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
        onClearCounties,
        filterLength
    } = props;

    const filters = [
        {
            name: 'Need Supplies/Volunteers',
            match: (m) => m.supplyNeeds || m.volunteerNeeds
        }, {
            name: 'Need Supplies',
            match: (m) => m.supplyNeeds && !m.supplyNeeds.match(/\b(no|unknown)\b/ig),
        }, {
            name: 'Need Volunteers',
            match: (m) => m.volunteerNeeds && !m.volunteerNeeds.match(/\b(no|unknown)\b/ig),
        }, {
            name: 'Updated Within 24 Hours',
            match: (m) => {
                if (m.lastUpdated) {
                    return getUpdated(m.lastUpdated)
                }
            },
        }, {
            name: 'Accepting People',
            match: (m) => m.accepting,
        }, {
            name: 'Special Needs',
            match: (m) => m.specialNeeds && m.accepting,
        }, {
            name: 'Pets Allowed',
            match: (m) => m.pets && m.pets.match(/yes/ig),
        }, {
            name: 'All Shelters',
            match: (m) => true,
        }
    ];

    const getUpdated = (lastUpdated) => {
        const lastUpdatedPlus = moment(lastUpdated).add(24, 'hours').format();
        const current = moment().format();
        return lastUpdatedPlus > current;
    }

    let matchFunctionsByName = {}
    filters.forEach((filter) => {
        matchFunctionsByName[filter.name] = filter.match;
    })

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
                onClearCounties()
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
