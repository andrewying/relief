/*
 * Relief, developed to coordinate help during the COVID-19 pandemic.
 * Copyright (c) 2020 Andrew Ying
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of version 3 of the GNU General Public License as published by the
 * Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program.  If not, see <https://www.gnu.org/licenses/>.
 */

require('./bootstrap');

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Store from './reducer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './partials/Nav';
import Login from './components/Login';
import ReactDOM from 'react-dom';

const store = createStore(Store);

function App() {
    return (
        <div className="container-fluid">
            <Nav />
            <Switch>
                <Route path="/login" component={ Login } />
            </Switch>
        </div>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <Provider store={ store }>
            <Router>
                <App />
            </Router>
        </Provider>,
        document.getElementById('app')
    );
}
