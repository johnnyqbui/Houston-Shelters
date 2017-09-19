import React, { Component } from 'react';
import MdClear from 'react-icons/lib/md/clear';

class Search extends Component {
	state = {
		query: '',
		searched: [],
		counties: [],
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
			tempFilteredMarkers,
			tempSelectedFilter,
			onInputSearch,
			onOpenSearchBox,
			onCloseSearchBox } = this.props;

		const matchedAny = tempFilteredMarkers.filter(
			data => {
				const { shelter, address, city, county, supplyNeeds, volunteerNeeds } = data;
				const concat = `${shelter} ${address} ${city} ${county} ${supplyNeeds} ${volunteerNeeds}`.toLowerCase();
				return concat.indexOf(query.toLowerCase()) > -1
			}
		)

		const matchedCounty = tempFilteredMarkers.filter( data => {
			const { county } = data;
			return `${county}`.toLowerCase().indexOf(query.toLowerCase()) > -1
		})

		if (query.length > 1) {
			this.setState({
				searched: matchedAny,
				counties: matchedCounty
			})

			if (matchedAny.length > 0) {
				onInputSearch(matchedAny, tempSelectedFilter)
				onOpenSearchBox()

			} else {
				onCloseSearchBox()
			}
		} else {
			this.setState({
				searched: [],
				cursor: 0
			})
			onCloseSearchBox()
			onInputSearch(tempFilteredMarkers, tempSelectedFilter)
		}
	}

	handleInputClick = () => {
		const { onOpenSearchBox, onCloseInfoBox, onClosePanel, onClearCounties } = this.props;
		const { searched } = this.state;
		if (searched.length > 1) {
			onOpenSearchBox()
		}
		onCloseInfoBox()
		onClearCounties()
		onClosePanel()
	}

	handleClearSearch = () => {
		const { onHandleUpdateQuery } = this.props;
		onHandleUpdateQuery('')

        this.setState({
            query: '',
            cursor: 0
        })
    }

    handleClickSearch = (data, query) => {
		const {
			onCloseSearchBox,
			onClosePanel } = this.props;

		if (data) {
			this.setState({
				query: `${ data.shelter } at ${ data.address }, ${ data.city }`,
				cursor: 0,
				counties: []
			})
		}
		onCloseSearchBox()
		onClosePanel()
	}

    handleKeyDown = (e, data, query) => {
	    const { cursor, searched, counties } = this.state;
	    const {
	    	selectedFilter,
	    	onCompleteSearch,
	    	onCloseSearchBox,
	    	onClosePanel,
	    	onSetBounds,
	    	onClearCounties,
	    	onHandleUpdateQuery,
	    	updateUrlParams } = this.props;

	    onClearCounties()
	    if (e.keyCode === 38) {
			if (cursor > 0) {
				this.setState( prevState => ({
					cursor: prevState.cursor - 1,

				}))
			}
			if (cursor <= 0) {
				this.setState({
					cursor: searched.length -1
				})
			}
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
	    	this.searchData(query)

	    	if (!data){return}

	    	updateUrlParams(data, selectedFilter)
	    	if ((counties.length - searched.length) <= 0 && counties.length > 0) {
	    		this.setState({
		    		query: counties[0].county
		    	})
		    	onSetBounds(counties)
		    	onHandleUpdateQuery(query)
	    		onCloseSearchBox()
	    		return
	    	}

	    	const fullLocation = `${ data.shelter } at ${ data.address }, ${ data.city }`
	    	this.setState({
	    		query: fullLocation
	    	})

	    	onHandleUpdateQuery(query)
	    	onCompleteSearch(data)
	    	onCloseSearchBox()
	    	onClosePanel()
	    }
	}

	handleMouseOver = (index) => {
		this.setState({
			cursor: index
		})
	}

	render() {
		const { query, searched, cursor } = this.state;
		const {
			selectedFilter,
			onClearCounties,
			onCompleteSearch,
			toggledSearchBox,
			toggledInfo,
			updateUrlParams } = this.props;
	  	return (
				<div className={toggledInfo ? 'search-data-container open' : 'search-data-container'}>
					<div className="search-data-bar">
					  <div className="search-data-input-wrapper">
					    <input
						    type="text"
						    placeholder="Search by Shelter, Address, County, or Needs (e.g. baby formula)"
						    value={query}
						    onChange={(e) => this.updateQuery(e.target.value)}
						    onClick={() => this.handleInputClick()}
						    onKeyDown={(e) => this.handleKeyDown(e, searched[cursor], query)}
					    />
					    <MdClear
						    className='clear-icon'
						    onClick={() => {
						    	onClearCounties()
						    	this.handleClearSearch()
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
										this.handleClickSearch(data, query)
										onCompleteSearch(data)
										updateUrlParams(data, selectedFilter)
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