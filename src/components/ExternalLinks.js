import React from 'react';
import '../App.css';

const ExternalLinks = () => {
	return (
		<div>
			<div className='externalLinkButton addAShelterButton'>
				<a href='http://harveyneeds.org/'
				target='_blank' rel='noopener noreferrer' >
					To Add Shelter
				</a>
			</div>
			<div className='externalLinkButton volunteerSuppliesButton'>
				<a href='https://sketch-city.github.io/harvey-needs/'
				target='_blank' rel='noopener noreferrer' >
					To Volunteer / Provide Supplies
				</a>
			</div>
		</div>
	)
}

export default ExternalLinks