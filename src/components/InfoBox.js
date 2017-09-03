import React, {Component} from 'react'
import '../App.css';
import FontAwesome from 'react-fontawesome'

class InfoBox extends Component {
  state = {
    currentMarker: {
      county: null,
      city: null,
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
        city: m.city,
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
    return "https://www.google.com/maps/place/" +encodeURI(a);
  }

  render() {
    let m = this.state.currentMarker;

    let notes = null, supplyNeeds = null, volunteerNeeds = null, phone = null;
    if (m.phone) {
      phone = <p>
        <FontAwesome fixedWidth="true"  size='lg' className="blueIcon" name="phone"/>
        <a href={this.getPhoneLink(m.phone)}>{m.phone}</a>
      </p>;
    }
    if (m.notes) {
      notes = <p><span><strong>Notes:</strong></span> {m.notes}</p>;
    }
    if (m.supplyNeeds) {
      supplyNeeds = <p><span><strong>Supply Needs:</strong></span> {m.supplyNeeds}</p>;
    }
    if (m.volunteerNeeds) {
      volunteerNeeds = <p><span><strong>Volunteer Needs:</strong></span> {m.volunteerNeeds}</p>
    }
    return (
      <div id="nodeinfo" className="info-bar">
        <div>
          <h2>{m.name}</h2>
          <div className="content">
          {phone}
          <p>
            <FontAwesome size='lg' fixedWidth="true" className="blueIcon" name="map-marker"/>
            <a href={this.getDirectionsLink(m.address + "," + m.city)} target="_blank">{m.address}</a>
          </p>
          <p>
            <FontAwesome size='lg' fixedWidth="true" className="blueIcon" name="clock-o"/>
            Updated {m.lastUpdated}</p>

            <p><span><strong>Accepting People?</strong></span> {m.accepting ? 'Yes' : 'No' }</p>
            <p><span><strong>Pets Allowed?</strong></span> {m.pets ? m.pets : 'Unknown'}</p>
            {notes}
            {supplyNeeds}
            {volunteerNeeds}
          </div>
        </div>
      </div>
    )
  }
}

export default InfoBox