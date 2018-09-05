import React from 'react';
import logoLogin from '../../images/login/logo_echo.png';

import Form from './components/Form'
import './login.css'


const Login = props => {
    return <div className="login">
        <div className="login-wr">
            <div className="form-place">
                <div className="logForm">
                <img className="logoLogin" src={logoLogin}  alt='Login'/>
                <Form {...props} />
                </div>
                <div className="form-place version">0.1.0</div>
            </div>
        </div>
    </div>;
};


export default Login;