import React from 'react';
import classnames from 'classnames';
import {Control, Form} from 'react-redux-form';
import '../login.scss';
import { FormattedMessage, injectIntl } from 'react-intl';


class LoginForm extends React.Component {

    handleSubmit(input) {
        let {email, password} = this.props.loginInputs;
        if(!email || !password) return;
        this.props.login(input.email, input.password).then(() => {
            this.props.getIdentity()
                .then(() => {
                    this.props.history.push("/inventory/my-inventory");
                });
        })
    }

    componentDidMount () {
        this.props.getVersion()
    }

    render() {
        //console.log(this.props);
        const { formatMessage } = this.props.intl;
        let {isFetching, hasError} = this.props.formStatus;
        let {email, password} = this.props.loginInputs;
        let butLogin = isFetching ?
            <FormattedMessage
                id='login.loging'
                defaultMessage='Logging'
                description='Login button during request'
            />
            :
            <FormattedMessage
                id='login.login'
                defaultMessage='Login'
                description='Login button static'
            />;
        //TODO:: react to all types of errors
        let loginErr = hasError ? <div className="login-err"><i className="fas fa-exclamation-triangle"></i>
            <FormattedMessage
                id='login.incorrect'
                defaultMessage='Incorrect username or password'
                description='Incorrect username or password'
            />
        </div> : null;
        const placeHolders = {
            username: formatMessage({
                id: 'login.username',
                defaultMessage: 'Username'
            }),
            password: formatMessage({
                id: 'login.password',
                defaultMessage: 'Password'
            })
        };
        return (
            <Form model="forms.loginForm" onSubmit={(val) => this.handleSubmit(val)}>
                <div>
                    <Control.text model="forms.loginForm.email" placeholder={placeHolders.username}/>
                </div>
                <div>
                    <Control.password model="forms.loginForm.password" placeholder={placeHolders.password}/>
                </div>
                <div className='error-holder'>{loginErr}</div>
                <div className="form-middle">
                    <button className={classnames({"loading": isFetching}, {"disabled": (!email || !password)})}>{butLogin}</button>
                </div>
                <div className="form-place version">{this.props.version}</div>
            </Form>
        );
    }
}

export default injectIntl(LoginForm);