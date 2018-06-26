import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Control} from 'react-redux-form';
import dropdown from '../../../images/inv-filter/dropdown.png'
import dropdownClose from '../../../images/inv-filter/dropdown-close.png'
import classnames from "classnames";

class FilterGroup extends Component {
    renderInputs() {
        if (!this.props.inputs) return;
        return this.props.isOpen ? this.props.inputs.map((input, index) => {
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
                   this.props.onOpen(!this.props.isOpen)
                }}>
                    <div className="dropdown-icon">
                        {this.props.isOpen ? <img src={dropdown} alt='drop'/> : <img src={dropdownClose} alt='drop-close' />}
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