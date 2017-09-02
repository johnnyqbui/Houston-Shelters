import React, {Component} from 'react';
import '../App.css';

class MainUi extends Component {
  state = {
    filterText: "Accepting People",
    filterCount: 0
  }

  updateFilterText = (update) => {
    this.setState({filterText: update.filterText, filterCount: update.filterCount})
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className='main-ui-container'>
          <h2>Harvey Relief: Shelters</h2>
        </div>
        <div className='main-ui-controls'>
          <button className="current-filter-button" onClick={this.props.filterToggle}>Filter: {this.state.filterText}</button>
        </div>
        {this.props.children}
      </div>
    )
  }
}

export default MainUi