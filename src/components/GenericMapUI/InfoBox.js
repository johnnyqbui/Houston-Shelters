// a more generic version of the other InfoBox
// TODO replace with one version that can accomodate all use-cases.

import React from 'react';
import FaPhone from 'react-icons/lib/fa/phone';
import FaMapMarker from 'react-icons/lib/fa/map-marker';
import Highlighter from 'react-highlight-words';

import map from 'lodash/map';


const InfoBox = (props) => {

    const { selectedMarker, toggledInfo, query } = props;
    let { meta, location } = selectedMarker;
    const arrQuery = query.indexOf(' ') > -1 ? query.split(' ') : [query]

    // Highlight found text
    const highlightText = (info) => {
        return (
            <Highlighter
                searchWords = { arrQuery }
                textToHighlight = { info }
            />
        )
    }

    if ( !meta || !location ) {
        return null;
    }

    return (
        <div className={ toggledInfo ? 'info-box open' : 'info-box'}>
            <h2>{highlightText(location.name)}</h2>
            <div className='info-box-content'>
                <p>
                    <FaPhone className="blueIcon" />
                    {location.phone ? <a href={`tel:${location.phone}`}>{location.phoneFormatted}</a> : 'No Phone Number'}
                </p>
                <p>
                    <FaMapMarker className="blueIcon" />
                    <a href={`https://www.google.com/maps/dir/current+location/${location.fullAddressEncoded}`} target="_blank">
                        {highlightText(location.fullAddressDisplay[0])}<br/>{highlightText(location.fullAddressDisplay[1])}
                    </a>
                </p>
                <br/>
                {map(meta, (data) => {
                    return (<p key={data.name}>
                        <strong>
                            {data.label}
                        </strong>
                        {data.valueFormatted}
                    </p>);
                })}
            </div>
        </div>
    )
}

export default InfoBox