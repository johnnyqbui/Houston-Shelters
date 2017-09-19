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
                <Switch>
                    <Route exact path='/' component={Shelters}/>
                    <Route
                        path='/shelters/:id?'
                        render={({match, location, history}) =>
                            <Shelters match={match} location={location} history={history}/>
                    }/>
                    <Route path='/credits' component={Credits} />
                    <Route render={() => <h1 style={{marginTop: '50px'}}>Page not found</h1>} />
                </Switch>

            </div>
        )
    }
}

export default App;