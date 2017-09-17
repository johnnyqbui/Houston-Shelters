import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import ReactGA from 'react-ga';
import config from './config';

if (config.analytics.id) {
  ReactGA.initialize(config.analytics.id);
}

ReactGA.set({ page: window.location.pathname });
ReactGA.pageview(window.location.pathname);

ReactDOM.render(
	<BrowserRouter><App /></BrowserRouter>,
	document.getElementById('root'));
registerServiceWorker();
