import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Control} from 'react-redux-form';
import dropdown from '../../../images/inv-filter/dropdown.png'
import dropdownClose from '../../../images/inv-filter/dropdown-close.png'
import classnames from "classnames";
import Dropdown from "../../Dropdown/Dropdown";
import Checkbox from "../../Checkbox/Checkbox";

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

    // getLocation(){
    //     switch (location.type){
    //         case 'allInventory':{
    //             return ('bla'
    //
    //             )
    //         }
    //         case 'myInventory':{
    //                 return ('ble'
    //
    //                 )
    //         }
    //         default:{
    //             return null
    //         }
    //     }
    // }
    renderInputs() {
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
                case 'dropdown' : {
                    return (
                        <Dropdown opns={[{name: 'test dropdown'}]}/>
                    )
                }
                case 'radio': {
                    return (
                    <div key={index} className="input-radio">
                        <label key={index} htmlFor={input.model}>
                            {input.label}
                            <Control.radio model={input.model} id={input.model}/>
                            <span className="radiomark">  </span>
                        </label>
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

    render() {
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
    open: PropTypes.bool
};


export default FilterGroup;