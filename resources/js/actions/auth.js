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

export const REQUEST_LOGIN_RESPONSE = 'REQUEST_LOGIN_RESPONSE';

function requestLoginResponse() {
    return {
        type: REQUEST_LOGIN_RESPONSE
    }
}

export const RECEIVE_LOGIN_RESPONSE = 'RECEIVE_LOGIN_RESPONSE';

function receiveLoginResponse(success, response) {
    return {
        type: RECEIVE_LOGIN_RESPONSE,
        success: success,
        response: response
    }
}

export function login(data) {
    return dispatch => {
        dispatch(requestLoginResponse());

        axios.get('/airlock/csrf-cookie')
            .then(() => {
                axios.post('/api/login', data)
                    .then(response => {
                        dispatch(receiveLoginResponse(true, {
                            user: response.data.user
                        }));
                    })
                    .catch(error => {
                        dispatch(receiveLoginResponse(false, error.data.errors));
                    });
            });
    }
}

export const REQUEST_REGISTER_RESPONSE = 'REQUEST_REGISTER_RESPONSE';

function requestRegisterResponse() {
    return {
        type: REQUEST_REGISTER_RESPONSE
    }
}

export const RECEIVE_REGISTER_RESPONSE = 'RECEIVE_REGISTER_RESPONSE';

function receiveRegisterResponse(success, response) {
    return {
        type: RECEIVE_REGISTER_RESPONSE,
        success: success,
        response: response
    }
}

export function register(data) {
    return dispatch => {
        dispatch(requestRegisterResponse());

        axios.get('/airlock/csrf-cookie')
            .then(() => {
                axios.post('/api/register', data)
                    .then(response => {
                        dispatch(receiveRegisterResponse(true, {
                            user: response.data.user
                        }));
                    })
                    .catch(error => {
                        dispatch(receiveRegisterResponse(false, error.data.errors));
                    });
            });
    }
}
