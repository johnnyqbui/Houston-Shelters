import React, { Component } from 'react';
import '../App.css';

class FilterMarkers extends Component {
	state = {
		isActive: true
	}

	runFilter = (value, origMarkers) => {
		const { onClickFilter } = this.props;
		let filtered;
		value === "All Shelters"	 			   && ( filtered = origMarkers )
		value === "Accepting People" 			   && ( filtered = origMarkers.filter(marker => (marker.accepting === 'TRUE')))
		value === "Pets" 			 			   && ( filtered = origMarkers.filter(marker => (marker.pets.length > 0 && marker.pets.match(/yes/ig))))
		value === "Shelters that need Volunteers"  && ( filtered = origMarkers.filter(marker => (marker.volunteerNeeds.length > 0)))
		value === "Shelters that need Supplies"    && ( filtered = origMarkers.filter(marker => (marker.supplyNeeds.length > 0)))
		value === "Added within the last 12 hours" && ( filtered = origMarkers.filter(marker => (console.log(marker.lastUpdated))))
		onClickFilter(filtered)
	}

	handleTogglePanel = () => {
		this.setState({
		  isActive: !this.state.isActive
		})
	}

	render() {
		const { OGMarkers, markers } = this.props;
		const { isActive } = this.state;
		return (
			<div>
				<input type='button' value={ isActive ? 'Close Panel' : 'Open Panel'} className='togglePanelButton' onClick={this.handleTogglePanel} />
				<div className={ isActive ? 'filterPanel' : 'filterPanel closePanel' }>
					<p>Shelters</p>
					<input type='button' value='All Shelters' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Accepting People' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Pets' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Shelters that need Volunteers' className='volunteerButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Shelters that need Supplies' className='supplyButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Added within the last 12 hours' className='lastUpdatedButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<div className='numberOfShelters'>Showing: { markers.length } Shelters</div>
				</div>
			</div>
		)
	}

}

export default FilterMarkers