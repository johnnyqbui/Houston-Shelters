import React, { Component } from 'react';

class Search extends Component {
	state = {
		query: '',
		searched: [],
		infoOpen: false
	}

	setInfoOpen = (isOpen) => {
		this.setState({infoOpen: isOpen})
	}

	getSearchContainerClass = () => {
		let openClass = (this.state.infoOpen) ? "open" : "";
		return "search-data-container " + openClass;
	}

	updateQuery = (query) => {
		this.setState({
			query: query
		})
		this.searchData(query)
	}

	searchData = (query) => {
		const {
			allMarkers,
			tempFilteredMarkers,
			tempSelectedFilter,
			onInputSearch,
			onCloseInfoBox,
			onOpenSearchBox,
			onCloseSearchBox } = this.props;

		const matched = allMarkers.filter(
			data => {
				const { shelter, address, city, county, supplyNeeds, volunteerNeeds } = data;
				const concat = `${shelter} ${address} ${city} ${county} ${supplyNeeds} ${volunteerNeeds}`.toLowerCase();
				return concat.indexOf(query.toLowerCase()) > -1
			}
		)
		if (query.length > 1) {
			this.setState({
				searched: matched
			})
			if (matched.length > 1) {
				onInputSearch(matched, 'All Shelters')
				onOpenSearchBox()
			} else {
				onCloseSearchBox()
			}

		} else {
			this.setState({
				searched: []
			})
			onCloseInfoBox()
			onCloseSearchBox()
			onInputSearch(tempFilteredMarkers, tempSelectedFilter)
		}
	}

	handleCloseSearchBox = (data) => {
		const { onSelectedFilter, onCloseSearchBox } = this.props;
		this.setState({
			query: `${ data.shelter } at ${ data.address }, ${ data.city }`,
			searched: []
		})
		onCloseSearchBox()
		onSelectedFilter('All Shelters')
	}

	handleOpenSearchBox = () => {
		const { onOpenSearchBox } = this.props;
		const { searched } = this.state;
		if (searched.length > 1) {
			onOpenSearchBox()
		}
	}

	render() {
		const { query, searched } = this.state;
		const { onClickSearch, toggledSearchBox } = this.props;
  	let containerClass = this.getSearchContainerClass();

  	return (
			<div className={containerClass}>
				<div className="search-data-bar">
				  <div className="search-data-input-wrapper">
				    <input
					    type="text"
					    placeholder="Search by Shelter, Address, or Needs (e.g. baby formula)"
					    value={query}
					    onChange={(e) => this.updateQuery(e.target.value)}
					    onClick={() => this.handleOpenSearchBox() }
				    />
				  </div>
				</div>
				<div className={ toggledSearchBox ? 'search-data-results' : 'search-data-results hide'}>
					<ul>
						{searched.map((data, index) => (
							<li key={index}
								onClick={() => {
									this.handleCloseSearchBox(data)
									onClickSearch(data, query)
								}}
							>
								{`${ data.shelter } at ${ data.address }, ${ data.city }`}
							</li>
						))}
					</ul>
				</div>

				{this.props.children}
			</div>
		)
	}
}

export default Search