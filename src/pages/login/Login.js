import React from 'react';

import Form from './components/Form'
import './login.css'
import {Translate} from 'react-localize-redux'


const Login = props => {
    return <div className="registration">
        <div className="registration-wr">
            <div className="form-place">
                <h1 className="form-header"><Translate id="login.loginToPRODEX"/></h1>
                <Form {...props} />
            </div>
        </div>
    </div>;
};


export default Login;