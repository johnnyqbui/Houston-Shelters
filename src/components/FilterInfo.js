import React from 'react';
import '../App.css';

const FilterInfo = (props) => {
	const { selectedFilter, filterLength } = props;
	return (
		<div className='filterInfo'>
			Selected: {selectedFilter}<br/>
			Showing: {filterLength} shelters
		</div>
	)
}

export default FilterInfo