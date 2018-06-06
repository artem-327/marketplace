import React from 'react';
import logoLogin from '../../images/login/logo_echo.png';

import Form from './components/Form'
// import {Translate} from 'react-localize-redux'
import './login.css'


const Login = props => {
    return <div className="login">
        <div className="login-wr">
            <div className="form-place">
                <div className="logForm">
                <img className="logoLogin" src={logoLogin}  alt='Login'/>
                {/*<h1 className="form-header"><Translate id="login.loginToPRODEX"/></h1>*/}
                <Form {...props} />
                </div>
            </div>
        </div>
    </div>;
};


export default Login;