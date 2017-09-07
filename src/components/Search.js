import React, { Component } from 'react';

import MdClear from 'react-icons/lib/md/clear';

class Search extends Component {
	state = {
		query: '',
		searched: [],
		cursor: 0
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
			if (matched.length > 0) {
				onInputSearch(matched, 'All Shelters')
				onOpenSearchBox()
			} else {
				onCloseSearchBox()
			}
		} else {
			this.setState({
				searched: [],
				cursor: 0
			})
			onCloseInfoBox()
			onCloseSearchBox()
			onInputSearch(tempFilteredMarkers, tempSelectedFilter)
		}
	}

	handleCloseSearchBox = (data) => {
		const {
			onCloseSearchBox,
			tempFilteredMarkers,
			tempSelectedFilter,
			onInputSearch } = this.props;

		if (data) {
			this.setState({
				query: `${ data.shelter } at ${ data.address }, ${ data.city }`,
				searched: [],
				cursor: 0
			})
		} else {
			onInputSearch(tempFilteredMarkers, tempSelectedFilter)
		}
		onCloseSearchBox()
	}

	handleOpenSearchBox = () => {
		const { onOpenSearchBox } = this.props;
		const { searched } = this.state;
		if (searched.length > 1) {
			onOpenSearchBox()
		}
	}

	handleClearSearch = () => {
        this.setState({
            query: '',
            cursor: 0
        })
    }

    handleKeyDown = (e, data) => {
	    const { cursor, searched } = this.state;
	    const { onCompleteSearch, onCloseSearchBox } = this.props;
	    // up
	    if (e.keyCode === 38) {
			if (cursor > 0) {
				this.setState( prevState => ({
					cursor: prevState.cursor - 1
				}))
			}
			if (cursor <= 0) {
				this.setState({
					cursor: searched.length -1
				})
			}
			// down
	    } else if (e.keyCode === 40) {
    		this.setState( prevState => ({
				cursor: prevState.cursor + 1
			}))

			if (cursor >= searched.length - 1) {
				this.setState({
					cursor: 0
				})
			}
	    }

	    // Enter
	    if (e.keyCode === 13) {
	    	const query = `${ data.shelter } at ${ data.address }, ${ data.city }`
	    	this.setState({
	    		query: query
	    	})
	    	onCompleteSearch(data, query)
	    	onCloseSearchBox()
	    }
	}

	handleMouseOver = (index) => {
		this.setState({
			cursor: index
		})
	}

	render() {
		const { query, searched, cursor } = this.state;
		const { onCompleteSearch, toggledSearchBox, toggledInfo } = this.props;
	  	return (
				<div className={toggledInfo ? 'search-data-container open' : 'search-data-container'}>
					<div className="search-data-bar">
					  <div className="search-data-input-wrapper">
					    <input
						    type="text"
						    placeholder="Search by Shelter, Address, or Needs (e.g. baby formula)"
						    value={query}
						    onChange={(e) => this.updateQuery(e.target.value)}
						    onClick={() => this.handleOpenSearchBox()}
						    onKeyDown={(e) => this.handleKeyDown(e, searched[cursor])}
					    />
					    <MdClear
						    className='clear-icon'
						    onClick={() => {
						    	this.handleClearSearch()
						    	this.handleCloseSearchBox()
						    }}
						/>
					  </div>
					</div>
					<div className={ toggledSearchBox ? 'search-data-results' : 'search-data-results hide'}>
						<ul>
							{searched.map((data, index) => (
								<li key={index}
									className={cursor === index ? 'searchSelected' : ''}
									onMouseOver={() => {this.handleMouseOver(index)}}
									onClick={() => {
										this.handleCloseSearchBox(data)
										onCompleteSearch(data, query)
									}}>
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