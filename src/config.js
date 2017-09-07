export const config = () => {
	config.event = {
		'harvey': {
			apiBaseURL: 'https://api.harveyneeds.org/api/v1/shelters'
			dataEntryPortal: '//api.harveyneeds.org';
			mapDefaults = {
				center: {
					lat: 30.0604,
					lng: -95.0898
					zoom: 8
				},
			},
			gaKey: 'UA-106081403-2'
		}
		'irma': {
			apiBaseURL: 'https://irma-api.herokuapp.com/api/v1/shelters',
			dataEntryPortal: '//api.harveyneeds.org';
			mapDefaults = {
				center: {
					lat: 28.139816,
					lng: -81.600952
					zoom: 7
				},
			},
			gaKey: 'UA-106081403-1'
		}
	}
}