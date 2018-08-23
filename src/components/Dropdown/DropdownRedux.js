import React, {Component} from 'react';
import PropTypes from "prop-types";
import Dropdown from './Dropdown';
import { actions } from 'react-redux-form';
import { Control } from 'react-redux-form';

class DropdownRedux extends Component {

    handleChange(value){
        const { model, dispatch } = this.props;
        dispatch(actions.change(model, value));
        if(this.props.onChange) this.props.onChange(value);
    }

    render() {
        return <Control
            model={this.props.model}
            component={Dropdown}
            redux
            validators={this.props.validators}
            onChange={value => this.handleChange(value)}
            {...this.props}
        />

    }
}

Dropdown.propTypes = {
    opns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ).isRequired,
    currentValue: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    model: PropTypes.string,
    dispatch: PropTypes.func
};


export default DropdownRedux;




