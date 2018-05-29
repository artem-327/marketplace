import React from 'react';
import classnames from 'classnames'
import {Control, Form} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Translate} from 'react-localize-redux'
import Application from "./checkbox/Application";

export default class FilterForm extends React.Component {

    handleSubmit(input) {
        this.props.login(
            input.chemicalName,
            input.fromQuantity,
            input.toQuantity,
            input.fromPrice,
            input.toPrice,
            input.zipCode,
            input.maxMilesAway
            ).then(() => {
            this.props.getIdentity().then(()=>{
                this.props.history.push("/inventory");
            });
        })
    }

    render() {
        let {isFetching, hasError} = this.props.formStatus;
        // let butLogin = isFetching ?
        //     <Translate id="login.logging"/>
        //     :
        //     <Translate id="login.login"/>;

        return (
            <Form model="forms.loginForm" onSubmit={(val) => this.handleSubmit(val)}>
                <div>
                    <label htmlFor="forms.filterForm.chemicalName">Chemical name</label>
                    <Control.text model="forms.filterForm.chemicalName"/>
                </div>
                <div>
                    <label htmlFor="forms.loginForm.fromQuantity">From Quantity</label>
                    <Control.password model="forms.loginForm.password"/>
                </div>
                <div>
                    <label htmlFor="forms.filterForm.toQuantity">To Quantity</label>
                    <Control.text model="forms.filterForm.toQuantity"/>
                </div>
                <div>
                    <label htmlFor="forms.filterForm.fromPrice">From Price</label>
                    <Control.text model="forms.filterForm.fromPrice"/>
                </div>
                <div>
                    <label htmlFor="forms.filterForm.toPrice">To price</label>
                    <Control.text model="forms.filterForm.toPrice"/>
                </div>
                <div>
                    <label htmlFor="forms.filterForm.zipCode">Enter your zip code</label>
                    <Control.text model="forms.filterForm.zipCode"/>
                </div>
                <div>
                    <label htmlFor="forms.filterForm.maxMilesAway">Max. Miles Away</label>
                    <Control.text model="forms.filterForm.maxMilesAway"/>
                </div>
                <Application/>
                {/*<div>*/}
                    {/*<label htmlFor="#">Super Sack</label>*/}
                    {/*<Control.checkbox model="#"/>*/}
                {/*</div>*/}
                <div className="form-middle">
                    <button className={classnames({"not-valid": hasError}, {"loading": isFetching})}>Apply</button>
                </div>


                {/*<Link className="form-link" to="#"><Translate id="login.forgottenPassword"/></Link>*/}
            </Form>
        );
    }
}


