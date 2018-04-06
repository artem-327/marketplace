import React from 'react';
import classnames from 'classnames'
import { Control, Form } from 'react-redux-form';
import { Link } from 'react-router-dom';

export default class LoginForm extends React.Component {

    handleSubmit(input) {
        this.props.login(input.email, input.password).then(()=>{
            this.props.history.push("/admin");
        })
    }

    render() {
        let { isFetching, hasError } = this.props.formStatus;
        let butLogin = isFetching ? "Přihlašování ...": "Přihlásit se!";

        return (
            <Form model="forms.loginForm" onSubmit={(val) => this.handleSubmit(val)}>
                <label  htmlFor="forms.loginForm.email">Email</label>
                <Control.text model="forms.loginForm.email" />
                <label htmlFor="forms.loginForm.password">Heslo</label>
                <Control.password model="forms.loginForm.password" />
                <div className="form-middle">
                <button className={classnames({"not-valid": hasError},{"loading": isFetching})} >{butLogin}</button>
            </div>
                <Link className="form-link" to="#" >Zapomenuté heslo</Link>
            </Form>
        );
    }
}
