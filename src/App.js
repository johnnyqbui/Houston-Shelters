import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
                    render={({ location }) => (
                        <Switch key={location.key} location={location}>
                            <Route exact path='/' component={Shelters}/>
                            <Route path='/shelters/:id' component={Shelters}/>
                            <Route path='/credits' component={Credits}/>
                        </Switch>
                    )}
                />


            </div>
        )
    }
}

export default App;