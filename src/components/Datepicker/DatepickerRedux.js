import React from 'react'
import DatePicker from "./Datepicker";
import {Control, actions} from "react-redux-form";

import 'react-datepicker/dist/react-datepicker.css'
import PropTypes from "prop-types";


class DatepickerRedux extends React.Component {

    handleChange(value){
        const { model, dispatch } = this.props;
        dispatch(actions.change(model, value));
        if(this.props.onChange) this.props.onChange(value);
    }

    render () {
        return <Control model={this.props.model}
                        component={DatePicker}
                        placeholder={this.props.placeholder}
                        onChange={value => this.handleChange(value)} />
    }
}

DatepickerRedux.propTypes = {
    placeholder: PropTypes.string,
    model: PropTypes.string,
    dispatch: PropTypes.func,
    onChange: PropTypes.func,
};


export default DatepickerRedux;