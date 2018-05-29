import React, {Component} from 'react';
import {Translate} from 'react-localize-redux';
import PropTypes from 'prop-types';
import {Control, Form} from 'react-redux-form';

class FilterGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    renderInputs() {
        if (!this.props.inputs) return;
        return this.state.open ? this.props.inputs.map((input, index) => {
            switch(input.type){
                case 'checkbox':{
                    return (
                        <div className="input-checkbox">
                            <label key={index} htmlFor={input.model}>
                                {input.label}
                                <Control.checkbox model={input.model} id={input.model}/>
                                <span className="checkmark"> </span>
                            </label>
                        </div>
                    )
                }
                case 'text':{
                    return (
                        <div key={index} className="input-text">
                            <label htmlFor={input.model}>{input.label}</label>
                            <Control.text className="label-text" model={input.model} id={input.model}/>
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
            <div className="filter-group">
                <div className="header" onClick={() => {
                    this.setState({open: !this.state.open})
                }}>
                    {this.props.header}
                </div>
                {this.renderInputs()}
            </div>
        );
    }
}

FilterGroup.propTypes = {
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            model: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    )
};


export default FilterGroup;