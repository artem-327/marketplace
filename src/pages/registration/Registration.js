import React from 'react';

import Form from './components/Form'
import './registration.css'
import {Translate} from 'react-localize-redux'
import './registration.css'
import regLogin from '../../images/login/logo_echo.png'

const Registration = props => {
    return <div className="registration">
        <div className="registration-wr">
            <div className="form-place">
                <div className="regForm">
                    <img src={regLogin}  alt='Login'/>
                <h3 className="form-header"><Translate id="registration.header"/></h3>
                <Form {...props} />
                </div>
            </div>
        </div>
    </div>;
};


export default Registration;