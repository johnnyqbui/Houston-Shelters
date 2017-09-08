// Config for being able to deploy different versions.
// These variables should already be defined in a .env file for the environment
// or set on the environment.
//
// Re-mapping those values here may seem a little redundant but makes these variables
// easier to access consistently -- and in a more JavaScript-y format -- throughout
// the app and allows for setting default values for undefined environments
// if needed in the future.

const config = {
  map: {
    center: [
      parseFloat(process.env.REACT_APP_MAP_DEFAULT_CENTER_LAT),
      parseFloat(process.env.REACT_APP_MAP_DEFAULT_CENTER_LNG)
    ],
    zoom: parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
  },
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    dataEntryPortal: process.env.REACT_APP_DATA_ENTRY_PORTAL
  },
  analytics: {
    id: process.env.REACT_APP_GOOGLE_ANALYTICS_KEY
  },
  meta: {
    title: process.env.REACT_APP_META_TITLE,
    description: process.env.REACT_APP_META_DESCRIPTION,
    favicon: process.env.REACT_APP_META_FAVICON_URL // optional environment variable
  },
  about: {
    title: process.env.REACT_APP_SITE_TITLE,
    eventName: process.env.REACT_APP_EVENT_NAME
  },
  helpNumber: {
    tel: process.env.REACT_APP_HELP_CALL_NUMBER, // optional environment variable
    sms: process.env.REACT_APP_HELP_TEXT_NUMBER // optional environment variable
  }
};

export default config;
