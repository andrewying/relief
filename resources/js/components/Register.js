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

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../partials/Input';
import { register } from '../actions';
import { REGISTER_STATUS_IN_PROGRESS } from '../constants';

function Register(props) {
    const { loggedIn, status, register, errors } = props;

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');

    const [ passwordVerified, setPasswordVerified ] = useState(true);
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    useEffect(() => {
        setPasswordVerified(password === confirmPassword);
    }, [ password, confirmPassword ]);

    const onRegister = e => {
        e.preventDefault();

        if (!passwordVerified || status === REGISTER_STATUS_IN_PROGRESS) {
            return;
        }

        register({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        });
    };

    return (
        <div className="container">
            { loggedIn ? <Redirect to="/" /> : '' }
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form>
                                <Input name="first_name" label="First name"
                                       type="text" value={ firstName } required
                                       hasError={ 'first_name' in errors }
                                       error={ errors.first_name ?? '' }
                                       autoComplete="first-name" autoFocus
                                       onChange={ e => setFirstName(e.target.value) } />

                                <Input name="last_name" label="Last name"
                                       type="text" value={ lastName } required
                                       hasError={ 'last_name' in errors }
                                       error={ errors.last_name ?? '' }
                                       autoComplete="last-name" autoFocus
                                       onChange={ e => setLastName(e.target.value) } />

                                <Input name="email" label="Email address"
                                       type="email" value={ email } required
                                       hasError={ 'email' in errors }
                                       error={ errors.email ?? '' }
                                       autoComplete="email"
                                       onChange={ e => setEmail(e.target.value) } />

                                <Input name="password" label="Password"
                                       type="password" value={ password } required
                                       autoComplete="new-password"
                                       hasError={ !passwordVerified || 'password' in errors }
                                       error={ passwordVerified ? ( errors.password ?? '' ) : 'The passwords entered do not match.' }
                                       onChange={ e => setPassword(e.target.value) } />

                                <Input name="password_confirmation"
                                       label="Confirm password" type="password"
                                       value={ confirmPassword } required
                                       autoComplete="new-password"
                                       onChange={ e => setConfirmPassword(e.target.value) } />

                                <div className="form-group row mb-0">
                                    <div className="col-md-6 offset-md-4">
                                        <button className="btn btn-primary"
                                                disabled={ !passwordVerified || status === REGISTER_STATUS_IN_PROGRESS }>
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        loggedIn: state.loggedIn,
        status: state.registerStatus,
        errors: state.errors
    }
};

const mapDispatchToProps = dispatch => {
    return {
        register: data => dispatch(register(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
