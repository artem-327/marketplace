import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Pricing extends Component {
    render() {
        return (
            <div>
                <label htmlFor=".pricePerUnit">PRICE</label>
                <Control.text model=".pricePerUnit"
                              id=".pricePerUnit"/>
                <label htmlFor=".currency">PRICING UNITS</label>
                <DropdownRedux opns={this.props.pricingUnits} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.currency" dispatch={this.props.dispatch}/>

            </div>
        );
    }
}
