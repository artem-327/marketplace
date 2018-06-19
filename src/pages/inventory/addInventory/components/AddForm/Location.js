import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Location extends Component {
    render() {
        let {isPending, isValid, hasError} = this.props.location;
        let buttonText = isPending ? "SAVING ..." : isValid ? "SAVED" : hasError ? "ERROR" : "+ ADD";
        return (
            <div>
                <label htmlFor="forms.inventoryLocationForm.warehouse">WAREHOUSE</label>,
                <Dropdown opns={this.props.warehouse} placeholder='Select'/>
                <label htmlFor="forms.inventoryLocationForm.warehouseName">WAREHOUSE NAME</label>
                <Control.text model="forms.inventoryLocationForm.warehouseName"
                              id="forms.inventoryLocationForm.warehouseName"/>
                <label htmlFor="forms.inventoryLocationForm.warehouseName">ADDRESS</label>
                component: <Control.text model="forms.inventoryLocationForm.address"
                                         id="forms.inventoryLocationForm.warehouseName"/>
                <label htmlFor="forms.inventoryLocationForm.city">CITY</label>
                <Control.text model="forms.inventoryLocationForm.city"
                              id="forms.inventoryLocationForm.city"/>
                <label htmlFor="forms.inventoryLocationForm.state">STATE</label>
                <Dropdown opns={this.props.state} placeholder='Select'/>
                <label htmlFor="forms.inventoryLocationForm.zip">ZIP</label>,
                <Control.text model="forms.inventoryLocationForm.zip"
                              id="forms.inventoryLocationForm.zip"
                              type="number"/>,
                <label htmlFor="forms.inventoryLocationForm.contact">CONTACT</label>,
                <Control.text model="forms.inventoryLocationForm.contact"
                              id="forms.inventoryLocationForm.contact"/>,
                <label htmlFor="forms.inventoryLocationForm.number">NUMBER</label>,
                <Control.text model="forms.inventoryLocationForm.number"
                              id="forms.inventoryLocationForm.number"/>,
                <label htmlFor="forms.inventoryLocationForm.email">EMAIL</label>,
                <Control.text model="forms.inventoryLocationForm.email"
                              id="forms.inventoryLocationForm.email"/>,
                <button className='add-form'>{buttonText}</button>,
            </div>
        );
    }
}
