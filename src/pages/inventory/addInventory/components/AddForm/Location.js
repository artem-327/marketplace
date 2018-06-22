import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: 'saved',
            edit: false,
            warehouse: '',
            street: '',
        }
    }

    renderSavedLocation() {
        let {isPending, isValid, hasError} = this.props.location;
        let buttonText = isPending ? "Saving ..." : isValid ? "Saved" : hasError ? "ERROR" : "Edit";
        return (
            <div>
                <div>
                    <div className='group-item-wr'>
                        <label>Warehouse</label>
                        <Dropdown opns={this.props.warehouse} placeholder='Select'/>
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="street">Street Address</label>
                        <input id="street"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="city">City</label>
                        <input id="city"/>
                    </div>
                    <div className='group-item-wr'>
                        <label>State</label>
                        <Dropdown opns={this.props.state} placeholder='Select'/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="zip">Zip Code</label>
                        <input id="zip"
                               type="number"/>
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="contact">Contact Name</label>
                        <input id="contact"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="number">Phone Number</label>
                        <input id="number"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="email">E-Mail</label>
                        <input id="email"/>
                        <button className='edit-location'>{buttonText}</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        let location = this.state.location === "saved" ? this.renderSavedLocation() : null
        return (
            <div className='location-wr'>
                <div className='location-submenu'>
                    <div className='saved'>SAVED LOCATIONS</div>
                </div>
                {location}
            </div>
        );
    }
}
