import React, { Component } from 'react';
import moment from 'moment';
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
		value === "Not Accepting People" 		   && ( filtered = origMarkers.filter(marker => (marker.accepting === 'FALSE')))
		value === "Unknown If Accepting" 		   && ( filtered = origMarkers.filter(marker => (marker.accepting === 'DNR')))
		value === "Not Opened" 		  			   && ( filtered = origMarkers.filter(marker => (marker.accepting === 'NOTOPEN')))
		value.indexOf('Staging') > -1  		  	   && ( filtered = origMarkers.filter(marker => (marker.accepting === 'STAGING')))
		value === "Accepting Pets" 			 	   && ( filtered = origMarkers.filter(marker => (marker.pets.length > 0 && marker.pets.match(/yes/ig))))
		value.indexOf('Volunteers') > -1  	 	   && ( filtered = origMarkers.filter(marker => (marker.volunteerNeeds.length > 0)))
		value.indexOf('Supplies') > -1  	   	   && ( filtered = origMarkers.filter(marker => (marker.supplyNeeds.length > 0)))
		value.indexOf('Added') > -1  	           && ( filtered = origMarkers.filter(marker => (moment(marker.lastUpdated).add(12, 'hours').isAfter(moment().format('YYYY-MM-DD hh:mm A')))))

		onClickFilter(filtered, value)
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
					<div className='numberOfShelters'>Showing: { markers.length } Shelters</div>
					<input type='button' value='All Shelters' className='blueButton' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Accepting People' className='blueButton' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Not Accepting People' className='redButton' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Unknown If Accepting'className='redButton' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Not Opened' className='redButton' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Staging (Redirecting People, but can still come)' className='redButton' onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Accepting Pets' className='purpleButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Shelters that need Volunteers' className='greenButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Shelters that need Supplies' className='greenButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Added within the last 12 hours' className='blueButton' onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
				</div>
			</div>
		)
	}

}

export default FilterMarkers