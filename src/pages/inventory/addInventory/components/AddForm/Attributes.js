import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Attributes extends Component {
    render() {
        return (
            <div>
                <div className='group-item-wr'>
                <label htmlFor=".manufacturer">Manufacturer</label>
                <DropdownRedux opns={this.props.manufacturer} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.manufacturer"
                               dispatch={this.props.dispatch}/>
                </div>
                <div className='group-item-wr'>
                <label htmlFor=".origin">Origin</label>
                <DropdownRedux opns={this.props.origin} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.origin" dispatch={this.props.dispatch}/>
                </div>
                <div className='group-item-wr'>
                <label htmlFor=".productForm">Form</label>
                <DropdownRedux opns={this.props.productForms} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productForm"
                               dispatch={this.props.dispatch}/>
                </div>
                <div className='group-item-wr'>
                <label htmlFor=".productGrade">Grade</label>
                <DropdownRedux opns={this.props.grade} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productGrade"
                               dispatch={this.props.dispatch}/>
                </div>
                <div className='group-item-wr'>
                <label htmlFor=".productCondition">Condition</label>
                <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productCondition"
                               dispatch={this.props.dispatch}/>
                </div>
            </div>
        );
    }
}
