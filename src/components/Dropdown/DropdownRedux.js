import React, {Component} from 'react';
import PropTypes from "prop-types";
import Dropdown from './Dropdown';
import { actions } from 'react-redux-form';

class DropdownRedux extends Component {
    render() {
        const { model, dispatch } = this.props;
        return <Dropdown onCustomChange={value => dispatch(actions.change(model, value))} {...this.props} />
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
    model: PropTypes.string,
    dispatch: PropTypes.func
};


export default DropdownRedux;




