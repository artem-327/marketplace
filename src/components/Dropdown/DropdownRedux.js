import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Dropdown } from 'semantic-ui-react'
import { actions } from 'react-redux-form';
import { Control } from 'react-redux-form';

class DropdownRedux extends Component {

    handleChange = (e, { name, value }) => {
        e.preventDefault()
        const { model, dispatch } = this.props
        // dispatch is prepared only for filters
        dispatch(actions.change('forms.filter'+model, e.target.innerText))
    }

    render() {
        return <Control
            model={this.props.model}
            component={Dropdown}
            redux
            validators={this.props.validators}
            onChange={this.handleChange}
            updateOn={[]} // handle onChange manually as redux is not able to get value from semantic Dropdown
            data-test='DropdownRedux_change_control'
            {...this.props}
        />

    }
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
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




