import React, { Component } from 'react';

class Search extends Component {
	state = {
		query: '',
		searched: []
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
			selectedFilter,
			tempSelectedFilter,
			onSelectedFilter,
			onInputSearch,
			onCloseInfoBox,
			onOpenSearchBox,
			onCloseSearchBox } = this.props;

		const matched = allMarkers.filter(
			data => {
				const { shelter, address, city, county, supplyNeeds, volunteerNeeds, pets } = data;
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

		return (

			<div className="search-data-container">
				<div className="search-data-bar">
				  <div className="search-data-input-wrapper">
				    <input
					    type="text"
					    placeholder="Search by Address, Shelter or Needs (eg: 'baby formula')"
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
			</div>
		)
	}
}

export default Search