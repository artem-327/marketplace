import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Attributes extends Component {
    render() {
        return (
            <div>
                <label htmlFor=".manufacturer">MANUFACTURER</label>
                <DropdownRedux opns={this.props.manufacturer} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.manufacturer"
                               dispatch={this.props.dispatch}/>
                <label htmlFor=".origin">ORIGIN</label>
                <DropdownRedux opns={this.props.origin} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.origin" dispatch={this.props.dispatch}/>
                <label htmlFor=".productForm">FORM</label>
                <DropdownRedux opns={this.props.productForms} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productForm"
                               dispatch={this.props.dispatch}/>
                <label htmlFor=".productGrade">GRADE</label>
                <DropdownRedux opns={this.props.grade} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productGrade"
                               dispatch={this.props.dispatch}/>
                <label htmlFor=".productCondition">CONDITION</label>
                <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productCondition"
                               dispatch={this.props.dispatch}/>
            </div>
        );
    }
}
