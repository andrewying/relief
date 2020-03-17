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

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Nav(props) {
    const { loggedIn, user } = props;

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">Relief</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation'">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <ul className="navbar-nav ml-auto">
                        { loggedIn ? <div>
                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle"
                                   href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="false">
                                    { user.first_name }
                                    <span className="caret" />
                                </a>

                                <div className="dropdown-menu dropdown-menu-right"
                                     aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/logout">
                                        Logout
                                    </a>
                                </div>
                            </li>
                        </div> : <div>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </div> }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        user: state.user
    }
};

export default connect(mapStateToProps)(Nav);
