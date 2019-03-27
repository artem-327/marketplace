import React from 'react';
import logoLogin from '../../images/login/logo_echo.png';

import Form from './components/Form'
import './login.scss'


const Login = props => {
    return <div className="login">
        <div className="login-wr">
            <div className="form-place">
                <div className="logForm">
                    <img className="logoLogin" src={logoLogin} alt='Login'/>
                    <Form {...props} />
                </div>
            </div>
        </div>
    </div>;
};


export default Login;