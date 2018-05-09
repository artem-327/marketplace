import React from 'react';

import Form from './components/Form'
import './registration.css'
import {Translate} from 'react-localize-redux'


const Registration = props => {
    return <div className="registration">
        <div className="registration-wr">
            <div className="form-place">
                <h1 className="form-header"><Translate id="registration.header"/></h1>
                <Form {...props} />
            </div>
        </div>
    </div>;
};


export default Registration;