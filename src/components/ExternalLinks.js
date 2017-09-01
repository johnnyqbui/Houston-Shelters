import React from 'react';
import '../App.css';

const ExternalLinks = () => {
	return (
		<div>
			<div className='title'>Want to Contribute?</div>
			<div className='externalLinkButton'>
				<a href='http://harveyneeds.org/'
				target='_blank' rel='noopener noreferrer' >
					<input className='purpleButton' type='button' value='To Add Shelter' />
				</a>
			</div>
			<div className='externalLinkButton'>
				<a href='https://sketch-city.github.io/harvey-needs/'
				target='_blank' rel='noopener noreferrer' >
					<input className='purpleButton' type='button' value='To Volunteer / Provide Supplies'/>
				</a>
			</div>
		</div>
	)
}

export default ExternalLinks