import React from 'react';
import classnames from 'classnames'
import {Control, Form} from 'react-redux-form';
import {Translate} from 'react-localize-redux'

export default class extends React.Component {

    handleSubmit(input) {
        this.props.registration(input.email, input.password, input.firstName, input.middleName, input.lastName).then(() => {
            this.props.history.push("/login");
        })
    }

    render() {
        let {isFetching, hasError} = this.props.formStatus;
        let butLogin = isFetching ?
            <Translate id="registration.fetching"/>
            :
            <Translate id="registration.submit"/>;

        return (
            <Form model="forms.registrationForm" onSubmit={(val) => this.handleSubmit(val)}>
                <div>
                    <label htmlFor="forms.registrationForm.email"><Translate id="registration.email"/></label>
                    <Control.text model="forms.registrationForm.email" required/>
                </div>
                <div>
                    <label htmlFor="forms.registrationForm.password"><Translate id="registration.password"/></label>
                    <Control.password model="forms.registrationForm.password" required/>
                </div>
                <div>
                    <label htmlFor="forms.registrationForm.firstName"><Translate id="registration.firstName"/></label>
                    <Control.text model="forms.registrationForm.firstName" required/>
                </div>
                <div>
                    <label htmlFor="forms.registrationForm.middleName"><Translate
                        id="registration.middleName"/></label>
                    <Control.text model="forms.registrationForm.middleName" required/>
                </div>
                <div>
                    <label htmlFor="forms.registrationForm.lastName"><Translate id="registration.lastName"/></label>
                    <Control.text model="forms.registrationForm.lastName" required/>
                </div>
                <div className="form-middle">
                    <button
                        className={classnames({"not-valid": hasError}, {"loading": isFetching})}>{butLogin}</button>
                </div>
            </Form>
        );
    }
}
