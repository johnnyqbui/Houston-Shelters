import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';

class FilterMarkers extends Component {
	state = {
		isActive: false,
		selectedFilter: {
			allShelters: false,
			acceptingPeople: true,
			notAccepting: false,
			unknownAccepting: false,
			notOpened: false,
			staging: false,
			pets: false,
			added: false
		}
	}

	componentDidMount() {
		// Show Panel on page load if not on mobile
		window.innerWidth > 600 && ( this.handleTogglePanel() )
	}

	runFilter = (value, origMarkers) => {
		const { onClickFilter, markers } = this.props;
		let filtered;
		value === "All Shelters"	 		&& ( filtered = origMarkers )
		value === "Accepting People" 		&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'TRUE')))
		value === "Not Accepting People" 	&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'FALSE')))
		value === "Unknown If Accepting" 	&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'DNR')))
		value === "Not Opened" 		  		&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'NOTOPEN')))
		value.indexOf('Staging') > -1  		&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'STAGING')))
		value === "Accepting People + Pets" 			&& ( filtered = origMarkers.filter(marker => (marker.pets.length > 0 && marker.pets.match(/yes/ig) && marker.accepting !== 'FALSE')))
		value.indexOf('Added') > -1  	    && ( filtered = origMarkers.filter(marker => (moment(marker.lastUpdated).add(12, 'hours').isAfter(moment().format('YYYY-MM-DD hh:mm A')))))
		onClickFilter(filtered, value)

		this.setState({
			selectedFilter: {
				allShelters: value === "All Shelters",
				acceptingPeople: value === "Accepting People",
				notAccepting: value === "Not Accepting People",
				unknownAccepting: value === "Unknown If Accepting",
				notOpened: value === "Not Opened",
				staging: value.indexOf('Staging') > -1,
				pets: value === "Accepting People + Pets",
				added: value.indexOf('Added') > -1
			}
		})

		let update = {
				filterText: value,
				filterCount: markers.length
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
		const { OGMarkers, markers } = this.props;
		const { isActive, selectedFilter } = this.state;
		const {
			allShelters,
			acceptingPeople,
			notAccepting,
			unknownAccepting,
			notOpened,
			pets,
			staging,
			added } = selectedFilter;

		return (
			<div>
				<div className={ isActive ? 'filterPanel' : 'filterPanel closePanel' }>
					<div className='numberOfShelters'>Showing: { markers.length } Shelters</div>
					<input type='button' value='Accepting People' className={ acceptingPeople ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
          <input type='button' value='Accepting People + Pets' className={ pets ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
          <input type='button' value='All Shelters' className={ allShelters ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Unknown If Accepting'className={ unknownAccepting ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Added within the last 12 hours' className={ added ? 'blueButton selected' : 'blueButton' } onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
				</div>
			</div>
		)
	}

}

export default FilterMarkers