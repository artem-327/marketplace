import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Details extends Component {
    render() {
        return (
            <div>
                <label htmlFor=".packageAmount">TOTAL PACKAGES</label>
                <Control.text model=".packageAmount"
                              id=".packageAmount"
                              type="number"/>
                <label htmlFor=".packageType">PACKAGING</label>
                <DropdownRedux opns={this.props.package} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.packageType"
                               dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
