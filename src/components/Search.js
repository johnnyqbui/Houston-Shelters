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
		const { allMarkers, tempFilteredMarkers, onInputSearch, onCloseInfoBox } = this.props;
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
			onInputSearch(matched)
		} else {
			this.setState({
				searched: []
			})
			onCloseInfoBox()
			onInputSearch(tempFilteredMarkers)
		}
	}

	handleCloseSearch = (data) => {
		this.setState({
			query: `${ data.shelter } at ${ data.address }, ${ data.city }`,
			searched: []
		})
	}
	render() {
		const { query, searched } = this.state;
		const { onClickSearch } = this.props;
		return (

			<div className="search-data-container">
				<div className="search-data-bar">
				  <div className="search-data-input-wrapper">
				    <input
					    type="text"
					    placeholder="Search by Address, Shelter or Needs (eg: 'baby formula')"
					    value={query}
					    onChange={(e) => this.updateQuery(e.target.value)}
				    />
				  </div>
				</div>
				<div className="search-data-results">
					<ul>
						{searched.map((data, index) => (
							<li key={index}
								onClick={() => {
									this.handleCloseSearch(data)
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