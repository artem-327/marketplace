import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Details extends Component {
    render() {
        return (
            <div>
                <div className='group-item-wr'>
                    <label htmlFor=".packageAmount">Total packages</label>
                    <Control.text model=".packageAmount"
                                  id=".packageAmount"
                                  type="number"/>
                </div>
                <div className='group-item-wr'>
                    <label htmlFor=".packageType">Packaging</label>
                    <DropdownRedux opns={this.props.package} placeholder='Select'
                                   model="forms.addProductOffer.addProductOffer.packageType"
                                   dispatch={this.props.dispatch}/>
                </div>
            </div>
        );
    }
}
