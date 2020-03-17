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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { LOGIN_STATUS_ERROR, LOGIN_STATUS_IN_PROGRESS } from '../constants';
import { login } from '../actions';

function Login(props) {
    const { loggedIn, loginStatus, errors, login } = props;

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ remember, setRemember ] = useState(false);

    const doLogin = () => {
        login(email, password, remember);
    };

    return (
        <div className="container">
            { loggedIn ? <Redirect to="/" /> : '' }
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Login</div>

                        <div className="card-body">
                            { loginStatus === LOGIN_STATUS_ERROR ? <div className="alert alert-danger">
                                { errors.map(error => error) }
                            </div> : '' }

                            <form>
                                <div className="form-group row">
                                    <label htmlFor="email"
                                           className="col-md-4 col-form-label text-md-right">
                                        Email address
                                    </label>

                                    <div className="col-md-6">
                                        <input id="email" type="email"
                                               className="form-control"
                                               name="email" value={ email }
                                               required
                                               autoComplete="email" autoFocus
                                               onChange={ e => setEmail(e.target.value) }/>
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <label htmlFor="password"
                                           className="col-md-4 col-form-label text-md-right">
                                        Password
                                    </label>

                                    <div className="col-md-6">
                                        <input id="password" type="password"
                                               className="form-control"
                                               name="password" value={ password }
                                               required
                                               autoComplete="current-password"
                                               onChange={ e => setPassword(e.target.value) } />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <div className="custom-control custom-checkbox">
                                            <input className="custom-control-input"
                                                   type="checkbox"
                                                   name="remember" id="remember"
                                                   checked={ remember }
                                                   onChange={ e => setRemember(e.target.checked) } />
                                            <label className="custom-control-label"
                                                   htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group row mb-0">
                                    <div className="col-md-8 offset-md-4">
                                        <button type="submit"
                                                className="btn btn-primary"
                                                onClick={ doLogin }
                                                disabled={ loginStatus === LOGIN_STATUS_IN_PROGRESS }>
                                            Login
                                        </button>

                                        <Link className="btn btn-link"
                                           to="/password/request">
                                            Forgot Your Password?
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        loginStatus: state.loginStatus,
        errors: state.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password, remember) => dispatch(login({
            email: email,
            password: password,
            remember: remember
        }))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
