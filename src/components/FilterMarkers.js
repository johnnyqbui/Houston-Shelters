import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import ExternalLinks from './ExternalLinks';

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
			updated: false
		}
	}

	componentDidMount() {

		// Show Panel on page load if not on mobile
		window.innerWidth > 600 && ( this.handleTogglePanel() )

	}

	runFilter = (value, origMarkers) => {
		const { onClickFilter } = this.props;
		let filtered;
		value === "All Shelters"	 		&& ( filtered = origMarkers )
		value === "Accepting People" 		&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'TRUE')))
		value === "Not Accepting People" 	&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'FALSE')))
		value === "Unknown If Accepting" 	&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'DNR')))
		value === "Not Opened" 		  		&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'NOTOPEN')))
		value.indexOf('Staging') > -1  		&& ( filtered = origMarkers.filter(marker => (marker.accepting === 'STAGING')))
		value === "Accepting Pets" 			&& ( filtered = origMarkers.filter(marker => (marker.pets.length > 0 && marker.pets.match(/yes/ig))))
		value.indexOf('Updated') > -1  	    && ( filtered = origMarkers.filter(marker => (moment(marker.lastUpdated).add(12, 'hours').isAfter(moment().format('YYYY-MM-DD hh:mm A')))))
		onClickFilter(filtered, value)

		this.setState({
			selectedFilter: {
				allShelters: value === "All Shelters",
				acceptingPeople: value === "Accepting People",
				notAccepting: value === "Not Accepting People",
				unknownAccepting: value === "Unknown If Accepting",
				notOpened: value === "Not Opened",
				staging: value.indexOf('Staging') > -1,
				pets: value === "Accepting Pets",
				updated: value.indexOf('Updated') > -1
			}
		})

		// If on mobile, then close on filter click
		window.innerWidth < 600 && ( this.handleTogglePanel() )
	}

	handleTogglePanel = () => {
		this.setState({
		  isActive: !this.state.isActive
		})
	}

	render() {
		const { OGMarkers, toggledInfo } = this.props;
		const { isActive, selectedFilter } = this.state;
		const {
			allShelters,
			acceptingPeople,
			notAccepting,
			unknownAccepting,
			notOpened,
			pets,
			staging,
			updated } = selectedFilter;

		return (
			<div className={ toggledInfo ? 'hideTopButtons filterComponent' : 'filterComponent' }>
				<input type='button' value={ isActive ? 'Hide Panel' : 'Show Panel'} className='togglePanelButton' onClick={this.handleTogglePanel} />
				<div className={ isActive ? 'filterPanel' : 'filterPanel closePanel' }>
				    <ExternalLinks />
					<hr/>
					<div className='title'>Filter Shelters</div>
					<input type='button' value='All Shelters' className={ allShelters ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Accepting People' className={ acceptingPeople ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Not Accepting People' className={ notAccepting ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Unknown If Accepting'className={ unknownAccepting ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Not Opened' className={ notOpened ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Accepting Pets' className={ pets ? 'blueButton selected' : 'blueButton' } onClick={(e) => {this.runFilter(e.target.value, OGMarkers)}}/>
					<input type='button' value='Staging (Redirecting People, but can still come)' className={ staging ? 'blueButton selected' : 'blueButton' } onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
					<input type='button' value='Updated within the last 12 hours' className={ updated ? 'blueButton selected' : 'blueButton' } onClick={(e) => {{this.runFilter(e.target.value, OGMarkers)}}}/>
				</div>
			</div>
		)
	}

}

export default FilterMarkers