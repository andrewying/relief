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

export default function Input(props) {
    const { name, label, hasError, error, ...attr } = props;

    return (
        <div className="form-group row">
            <label htmlFor={ name }
                   className="col-md-4 col-form-label text-md-right">
                { label }
            </label>

            <div className="col-md-6">
                <input id={ name }
                       className={ hasError ? "form-control is-invalid" : "form-control" }
                       name={ name } { attr } />
                { error !== '' ? <div className="invalid-feedback">
                    { error }
                </div> : '' }
            </div>
        </div>
    );
}
