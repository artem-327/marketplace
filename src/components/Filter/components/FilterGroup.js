import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Control, Errors} from 'react-redux-form';
import {isNumber, min, messages, maxPercent, bigger, required} from "../../../utils/validation";
import dropdown from '../../../images/inv-filter/dropdown.png'
import dropdownClose from '../../../images/inv-filter/dropdown-close.png'
import classnames from "classnames";
import DropdownRedux from "../../Dropdown/DropdownRedux";
import RadioRedux from "../../Radio/RadioRedux";
import DatepickerRedux from "../../Datepicker/DatepickerRedux";
import ComboBoxRedux from "../../ComboBox/ComboBoxRedux";

class FilterGroup extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: this.props.isOpen
            
        }
    }

    componentDidMount(){
        
        for(let i = 0; i < this.props.inputs.length; i++){
            if(this.props.inputs[i].type === 'checkbox'){
                if(this.props.data[this.props.checkboxModel] && this.props.data[this.props.checkboxModel][this.props.inputs[i].id]){
                    this.props.onOpen(true)
                }
            }else{
                if(this.props.data[this.props.inputs[i].model.substring(1)] && this.props.data[this.props.inputs[i].model.substring(1)] !== ''){
                    this.props.onOpen(true)
                }
            }
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isOpen !== this.state.isOpen) this.setState({isOpen: nextProps.isOpen})
    }

    renderInputs () {
        if (!this.props.inputs) return;
        return this.state.isOpen ? this.props.inputs.map((input, index) => {
            switch(input.type){
                case 'checkbox':{
                    return (
                        <div key={index} className="input-checkbox">
                            <label key={index} htmlFor={input.model}>
                                {input.label}
                                <Control.checkbox model={input.model} id={input.model}/>
                                <span className="checkmark">  </span>
                            </label>
                        </div>
                    )
                }
                case 'radio' : {
                    return (
                        <div key={index} className='filter-input-radio'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <RadioRedux dispatch={this.props.dispatch} model={input.model} opns={[{label:'0-3 months', value:'100'}, {label:'3-6 months', value:'500'}, {label:'6-9 months', value:'1000'}, {label:'Custom Product Age', value:'10000'}]} productAgeModel = {this.props.productAgeModel} productAgeCustomModel={this.props.productAgeCustomModel}/>
                        </div>
                    )
                }
                case 'dropdown' : {
                    return (
                        <div key={index} className='filter-input-dropdown'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <DropdownRedux dispatch={this.props.dispatch} model={input.model}
                                           opns={input.data}
                            />
                        </div>
                    )
                }
                case 'comboBox' : {
                    return (
                        <div key={index} className='filter-input-dropdown'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <ComboBoxRedux dispatch={this.props.dispatch} model={input.model} limit={input.limit} placeholder="Select Condition" items={input.data}  />
                        </div>
                    )
                }
                case 'date' : {
                    return (
                        <div key={index} className='filter-input-date'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <DatepickerRedux dispatch={this.props.dispatch} model={input.model}/>
                        </div>
                    )
                }
                case 'text':{
                    return (
                        <div key={index} className='filter-input-text'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <Control.text type={input.type} model={input.model} id={input.model} placeholder={input.placeholder}/>
                        </div>
                    )
            }
                 case 'number': {
                    return (
                        <div key={index} className='filter-input-text'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <Errors
                                className="form-error"
                                model={input.model}
                                show="touched"
                                messages={{
                                    isNumber: messages.isNumber,
                                    min: messages.min
                                }}
                            />
                            <Control.text type={input.type} model={input.model} id={input.model} placeholder={input.placeholder} validators={{min: (val) => min(val, 0), isNumber}}/>
                        </div>
                    )
                }
                case 'assay': {
                    let validator = input.bigger ?
                        {bigger: (val) => bigger(val, this.props.data.assmin), min: (val) => min(val, 0), maxPercent, isNumber} :
                        {min: (val) => min(val, 0), maxPercent, isNumber};
                    return (
                        <div key={index} className='filter-input-text'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <Errors
                                className="form-error"
                                model={input.model}
                                show="touched"
                                messages={{
                                    bigger: input.bigger ? messages.bigger : null,
                                    maxPercent: messages.maxPercent,
                                    isNumber: messages.isNumber,
                                    min: messages.min,
                                }}
                            />
                            <Control.text type={input.type}
                                          model={input.model}
                                          id={input.model}
                                          placeholder={input.placeholder}
                                          validators={validator}
                            />
                        </div>
                    )
                }
                default:{
                    return null
                }
            }
        }) : null;
    }

    //TODO::refactor render
    render() {
        if(!this.props.isVisible) return null;
        return (
            <div className={classnames("filter-group", {"split" : (this.props.split)})}>
                <div className="header" onClick={() => {
                   this.props.onOpen(!this.state.isOpen)
                }}>
                    <div className="dropdown-icon">
                        {this.state.isOpen ? <img src={dropdown} alt='drop'/> : <img src={dropdownClose} alt='drop-close' />}
                    </div>
                    {this.props.header}
                </div>
                {this.renderInputs()}
                <div className='clearfix' />
            </div>
        );
    }
}

FilterGroup.propTypes = {
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            placeholder: PropTypes.string,
            model: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    ),
    split: PropTypes.bool,
    open: PropTypes.bool,
    location: PropTypes.string
};


export default FilterGroup;