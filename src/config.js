export const config = () => {
	config.event = {
		'harvey': {
			apiBaseURL: 'https://api.harveyneeds.org/api/v1/shelters'
			dataEntryPortal: '//api.harveyneeds.org';
			mapDefaults = {
				center: {
					lat: 29.7604,
					lng: -95.3698
					zoom: 12
				},
			}
		}
		'irma': {
			apiBaseURL: 'https://irma-api.herokuapp.com/api/v1/shelters',
			dataEntryPortal: '//api.harveyneeds.org';
			mapDefaults = {
				center: {
					lat: 28.139816,
					lng: -81.600952
					zoom: 8
				},
			}
		}
	}
}