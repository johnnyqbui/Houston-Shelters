import React from 'react';
import '../App.css';
import FontAwesome from 'react-fontawesome'

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
        <div className='locate-me-container'>
            <p className='controls-font-grey'>Locate Me</p>
            <button
                className='controls-button locate-me-button'
                onClick={() => {locate(currentLocation)}}>
                <FontAwesome className="locate-me-icon" name="crosshairs" />
            </button>
        </div>
    )
}

export default GeoLocate