import React, {Component} from 'react';
import PropTypes from "prop-types";
import Checkbox from './Checkbox';
import { actions } from 'react-redux-form';

class CheckboxRedux extends Component {
    render() {
        const { model, dispatch } = this.props;
        return <Checkbox onChange={value => dispatch(actions.change(model, value))} {...this.props} />
    }
}

CheckboxRedux.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    style: PropTypes.string,
    onChange: PropTypes.func,
    model: PropTypes.string,
    dispatch: PropTypes.func
};


export default CheckboxRedux;




