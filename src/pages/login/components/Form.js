import React from 'react';
import classnames from 'classnames';
import {Control, Form} from 'react-redux-form';
// import {Link} from 'react-router-dom';
import {Translate} from 'react-localize-redux';
import '../login.css';


export default class LoginForm extends React.Component {

    handleSubmit(input) {
        let {email, password} = this.props.loginInputs;
        if(!email || !password) return;
        this.props.login(input.email, input.password).then(() => {
            this.props.getIdentity().then(()=>{
                this.props.history.push("/inventory/my-inventory");
            });
        })
    }

    componentWillMount () {
        this.props.getVersion()
    }

    render() {
        console.log(this.props.getVersion);
        let {isFetching, hasError} = this.props.formStatus;
        let {email, password} = this.props.loginInputs;
        let butLogin = isFetching ? <Translate id="login.logging"/> : <Translate id="login.login"/>;
        //TODO:: react to all types of errors
        let loginErr = hasError ? <div className="login-err"><i className="fas fa-exclamation-triangle"></i>Incorrect username or password</div> : null;
        return (
            <Form model="forms.loginForm" onSubmit={(val) => this.handleSubmit(val)}>
                <div>
                    {/*<label htmlFor="forms.loginForm.email"><Translate id="login.email"/></label>*/}
                    <Control.text model="forms.loginForm.email" placeholder="Username"/>
                </div>
                <div>
                    {/*<label htmlFor="forms.loginForm.password"><Translate id="login.password"/></label>*/}
                    <Control.password model="forms.loginForm.password" placeholder="Password"/>
                </div>
                <div className='error-holder'>{loginErr}</div>
                <div className="form-middle">
                    <button className={classnames({"loading": isFetching}, {"disabled": (!email || !password)})}>{butLogin}</button>
                </div>
                <div className="form-place version">{this.props.version}</div>
                {/*<Link className="form-link" to="/registration"><Translate id="login.registration"/></Link>*/}
            </Form>
        );
    }
}
