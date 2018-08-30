import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Control} from 'react-redux-form';
import dropdown from '../../../images/inv-filter/dropdown.png'
import dropdownClose from '../../../images/inv-filter/dropdown-close.png'
import classnames from "classnames";
import DropdownRedux from "../../Dropdown/DropdownRedux";
import RadioRedux from "../../Radio/RadioRedux";
import DatepickerRedux from "../../Datepicker/DatepickerRedux";

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

    // renderInputsGroup () {
    //     switch (this.props.renderAsGroup) {
    //         case 'radio': {
    //             return this.state.isOpen ? this.props.inputs.map((input, index) => {
    //                 return (
    //                 <div className='input-radio'>
    //                 <label className="radioButton" key={index}><p>{input.label}</p>
    //                     <Control.radio name={this.props.name} value={input.id}
    //                                    model={input.model}/>
    //                     <span className={"radiomark"}></span>
    //                 </label>
    //                 </div>
    //                 )
    //             }) : null
    //         }
    //         default: {
    //             return null
    //         }
    //     }
    // }

    renderInputs () {

        if (this.props.header ==='Product Age'){
        }

        if (!this.props.inputs) return;
        if (this.props.renderAsGroup) return this.renderInputsGroup();
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
                        <DropdownRedux dispatch={this.props.dispatch} model={input.model} opns={[{name:'100', id:'100'}, {name:'500', id:'500'}, {name:'1000', id:'1000'}]}/>
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
                case 'text':
                 case 'number': {
                    return (
                        <div key={index} className='filter-input-text'>
                            <label className="input-label" htmlFor={input.model}>{input.label}</label>
                            <Control.text type={input.type} model={input.model} id={input.model} placeholder={input.placeholder}/>
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