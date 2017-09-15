import React from 'react';
import { Link } from 'react-router-dom'

const Credits = (location) => {
	console.log(location)
	return (
		<div>
			<p>Created by Sketch City + Station</p>
          	<p>this tool created by Johnny Bui, Jason Nolasco, and Harvey-Api team</p>
          	<div><Link to='/'>Back to Map</Link></div>
         </div>
	)
}

export default Credits;