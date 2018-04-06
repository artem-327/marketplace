import React from 'react';
import classnames from 'classnames'
import { Control, Form, Field } from 'react-redux-form';

export default class LoginForm extends React.Component {

    handleSubmit(input) {
        this.props.sendMessage(input.name, input.email, input.phone, input.text);
    }

    render() {
        let { isFetching, hasError, isValid } = this.props.formStatus;
        let butLogin = "Odeslat";
        if(isFetching){
            butLogin = "Odesílání ..."
        }else if(isValid){
            butLogin = "Odesláno"
        }else if(hasError){
            butLogin = "Neodesláno :("
        }

        return (
            <Form model="forms.landingForm" onSubmit={(val) => this.handleSubmit(val)}>
                <div>
                <label  htmlFor="forms.landingForm.name">Vaše jméno</label>
                <Control.text model="forms.landingForm.name" required/>
                </div>
                <div className="email">
                <label  htmlFor="forms.landingForm.email">E-mail</label>
                <Field model="forms.landingForm.email">
                    <input type="email" required/>
                </Field>
                </div>
                <div className="phone">
                <label  htmlFor="forms.landingForm.phone">Vaše telefonní číslo</label>
                <Control.text model="forms.landingForm.phone" required/>
                </div>
                <div>
                <label  htmlFor="forms.landingForm.text">Zpráva pro nás</label>
                <Control.text model="forms.landingForm.text" required/>
                </div>
                <button className={classnames('btn-marco red', {"not-valid": hasError},{"valid": isValid},{"loading": isFetching})} >{butLogin}</button>
            </Form>
        );
    }
}
