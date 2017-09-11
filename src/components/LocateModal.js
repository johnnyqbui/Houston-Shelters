import React from 'react';

const LocateModal = (props) => {
    const { currentLocation, onClickLocate } = props;
    const locate = () => {
        const success = (position) => {
            const currentLocation = [position.coords.latitude, position.coords.longitude]
            onClickLocate(currentLocation)
        }
        const error = (err) => { console.log('Could not obtain location', err)}

        // High accuracy on false to consume less energy on mobile
        const options = {maximumAge: 60000, timeout: 5000, enableHighAccuracy: false}

        !navigator.geolocation ?
        console.log('Browser does not support Geolocation') :
        navigator.geolocation.getCurrentPosition(success, error, options)
        // navigator.geolocation.watchPosition(success, error, options)
    }

    return (
        <button
            className='locate-modal'
            onClick={() => {locate(currentLocation)}}>
            Find My Location
        </button>
    )
}

export default LocateModal

