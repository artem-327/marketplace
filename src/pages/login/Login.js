import React from 'react';

import Form from './components/Form'
import './login.css'


const Login = props => {
    return <div className="Login">
        <div className="form-wr">
            <img src="/img/static/logo-top.png" alt="APPYMARCO"/>
            <div className="form-place">
                <h1 className="form-header">Přihlášení</h1>
                <Form {...props} />
            </div>
        </div>
    </div>;
};


export default Login;