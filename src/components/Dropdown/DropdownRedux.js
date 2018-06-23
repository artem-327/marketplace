import React, {Component} from 'react';
import PropTypes from "prop-types";
import Dropdown from './Dropdown';
import { actions } from 'react-redux-form';

class DropdownRedux extends Component {

    handleChange(value){
        const { model, dispatch } = this.props;
        dispatch(actions.change(model, value));
        if(this.props.onChange) this.props.onChange(value);
    }

    render() {
        return <Dropdown onCustomChange={value => this.handleChange(value)} {...this.props} />
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




