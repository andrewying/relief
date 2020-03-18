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

import {
    LOGIN_STATUS_ERROR,
    LOGIN_STATUS_FRESH,
    LOGIN_STATUS_IN_PROGRESS,
    REGISTER_STATUS_FRESH, REGISTER_STATUS_IN_PROGRESS
} from './constants';
import {
    RECEIVE_LOGIN_RESPONSE,
    REQUEST_LOGIN_RESPONSE,
    REQUEST_REGISTER_RESPONSE
} from './actions';

const DEFAULT = {
    loggedIn: false,
    loginStatus: LOGIN_STATUS_FRESH,
    registerStatus: REGISTER_STATUS_FRESH,
    user: {},
    errors: []
};

export default function Store(state = DEFAULT, action) {
    switch (action.type) {
        case REQUEST_LOGIN_RESPONSE:
            return Object.assign({}, state, {
                loginStatus: LOGIN_STATUS_IN_PROGRESS
            });
        case RECEIVE_LOGIN_RESPONSE:
            if (action.success) {
                return Object.assign({}, state, {
                    loggedIn: true,
                    loginStatus: LOGIN_STATUS_FRESH,
                    user: action.response
                })
            } else {
                return Object.assign({}, state, {
                    loggedIn: false,
                    loginStatus: LOGIN_STATUS_ERROR,
                    errors: action.response
                })
            }
        case REQUEST_REGISTER_RESPONSE:
            return Object.assign({}, state, {
                registerStatus: REGISTER_STATUS_IN_PROGRESS
            });
        default:
            return state;
    }
}
