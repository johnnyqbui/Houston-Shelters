import React from 'react';
import '../App.css';

const GeoLocate = (props) => {
    const { currentLocation, onClickLocate, toggledInfo } = props;
    const locate = () => {
        const success = (position) => {
            const currentLocation = [position.coords.latitude, position.coords.longitude]
            onClickLocate(currentLocation)
        }
        const error = (err) => { console.log('Could not obtain locaiton', err)}

        // High accuracy on false to consume energy on mobile
        const options = {maximumAge: 60000, timeout: 5000, enableHighAccuracy: false}

        !navigator.geolocation ?
        console.log('Browser does not support Geolocation') :
        navigator.geolocation.getCurrentPosition(success, error, options)
        // navigator.geolocation.watchPosition(success, error, options)

    }

    return (
        <div className={ toggledInfo ? 'hideTopButtons geoLocateButton' : 'geoLocateButton' }>
            { currentLocation.length > 0 ?
                <p style={{color: 'white'}}>Your current location: <br/>Lat: {currentLocation[0].toFixed(4)}, Lng: {currentLocation[1].toFixed(4)}</p> :
                <input type="button" onClick={() => {locate()}} value='Find My Location'/>
            }
        </div>
    )
}

export default GeoLocate