import React, {Component} from 'react';
import '../App.css';

class MainUi extends Component {
  state = {
    filterText: "Accepting People",
    filterCount: 0,
    linksOpen: "info-links"
  }

  updateFilterText = (update) => {
    this.setState({filterText: update.filterText, filterCount: update.filterCount})
  }

  toggleInfoPanel = () => {
    let nextClass = (this.state.linksOpen == "info-links open") ? "info-links" : "info-links open"
    this.setState({linksOpen: nextClass})
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <div className='main-ui-container'>
          <h2>Harvey Relief: Shelters</h2>
          <button onClick={this.toggleInfoPanel} className="info-button">info</button>
        </div>
        <div className='main-ui-controls'>
          <button className="current-filter-button" onClick={this.props.filterToggle}>Filter: {this.state.filterText}</button>
        </div>
        <div id="infoLinks" className={this.state.linksOpen} >
          <h2>
          <a href='http://harveyneeds.org/'
             target='_blank' rel='noopener noreferrer' >
            Add Shelter
          </a></h2>
          <h2>
          <a href='https://sketch-city.github.io/harvey-needs/'
             target='_blank' rel='noopener noreferrer' >
            Volunteer or Provide Supplies
          </a></h2>

          <p>Created by Sketch City + Station</p>
          <p>this tool created by Johnny Bui, Jason Nolasco, and placeholder</p>

          <button onClick={this.toggleInfoPanel}>Close This Panel</button>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default MainUi