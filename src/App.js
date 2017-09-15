import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './styles/App.css';
import Meta from './components/Meta';
import TopNavBar from './components/TopNavBar';

import Credits from './pages/Credits';
import Shelters from './pages/Shelters';

class App extends Component {

    render() {

        return (
            <div className="App">
                <Meta />
                <TopNavBar />

                <Route
                    path='/shelters/:id'
                    render={({match}) =>
                        <Shelters match={match} />
                }/>

                <Route path='/credits' component={Credits} />

            </div>
        )
    }
}

export default App;