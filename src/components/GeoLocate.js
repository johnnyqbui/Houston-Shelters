import React from 'react';
import '../App.css';

const GeoLocate = (props) => {
    const { currentLocation, onClickLocate } = props;
    const locate = () => {
        const success = (position) => {
            const currentLocation = [position.coords.latitude, position.coords.longitude]
            onClickLocate(currentLocation)
        }
        const error = (err) => { console.log('Could not obtain locaiton', err)}
        const options = {maximumAge: 60000, timeout: 5000, enableHighAccuracy: true}

        !navigator.geolocation ?
        console.log('Browser does not support Geolocation') :
        navigator.geolocation.getCurrentPosition(success, error, options)
        // navigator.geolocation.watchPosition(success, error, options)

    }

    return (
        <div className='geoLocateButton'>
            { currentLocation.length > 0 ?
                <p style={{color: 'white'}}>Your location is now being tracked</p> :
                <input type="button" onClick={() => {locate()}} value='Find My Location'/>
            }
        </div>
    )
}

export default GeoLocate