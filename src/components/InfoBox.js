import React, {Component} from 'react'
import '../App.css';

class InfoBox extends Component {
  state = {
    currentMarker: {
      county: null,
      name: null,
      address: null,
      phone: null,
      location: null,
      accepting: null,
      pets: null,
      notes: null,
      supplyNeeds: null,
      volunteerNeeds: null,
      lastUpdated: null,
    }
  }

  handleMarker = (m) => {
    this.setState({
      currentMarker: {
        county: m.county,
        name: m.name,
        address: m.address,
        phone: m.phone,
        location: m.location,
        accepting: m.accepting,
        pets: m.pets,
        notes: m.notes,
        supplyNeeds: m.supplyNeeds,
        volunteerNeeds: m.volunteerNeeds,
        lastUpdated: m.lastUpdated,
      }
    })
  }

  handleTest = (e) => {
    this.setState(prevState => ({myFlag: prevState.myFlag + " * "}))
  }

  getPhoneLink = (p) => {
    return "tel:" + p.replace(/\D/g,'');
  }

  getDirectionsLink = (a) => {
    return "#todomapaddress";
  }

  checkAccepting = (accepting) => {
    if (accepting === 'TRUE') {
      return 'Yes'
    } else if (accepting === 'FALSE') {
      return 'No'
    } else {
      return 'Did Not Respond/Unknown'
    }
  }

  render() {
    let m = this.state.currentMarker;

    let notes = null, supplyNeeds = null, volunteerNeeds = null, phone = null;
    if (m.phone) {
      phone = <h4><a href={this.getPhoneLink(m.phone)}>{m.phone}</a></h4>;
    }
    if (m.notes) {
      notes = <p><span style={{fontWeight: 'bold'}}>Notes:</span> {m.notes}</p>;
    }
    if (m.supplyNeeds) {
      supplyNeeds = <p><span style={{fontWeight: 'bold'}}>Supply Needs:</span> {m.supplyNeeds}</p>;
    }
    if (m.volunteerNeeds) {
      volunteerNeeds = <p><span style={{fontWeight: 'bold'}}>Volunteer Needs:</span> {m.volunteerNeeds}</p>
    }

    return (
      <div id="nodeinfo" className="info-bar">
        <div>
          <h2>{m.name}</h2>
          {phone}
          <h4><a href={this.getDirectionsLink(m.address)}>Get Directions</a></h4>
          <br/>
          <p><span style={{fontWeight: 'bold'}}>Updated:</span> {m.lastUpdated}</p>
            <p><span style={{fontWeight: 'bold'}}>Accepting People?</span> {this.checkAccepting(m.accepting)}</p>
            <p><span style={{fontWeight: 'bold'}}>Pets Allowed?</span> {m.pets ? m.pets : 'Unknown'}</p>
            {notes}
            {supplyNeeds}
            {volunteerNeeds}



        </div>
      </div>
    )
  }
}

export default InfoBox