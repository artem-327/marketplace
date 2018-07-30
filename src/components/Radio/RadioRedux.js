import React, {Component} from 'react';
import PropTypes from "prop-types";
import Radio from './Radio';
import { actions } from 'react-redux-form';
import { Control } from 'react-redux-form';

class RadioRedux extends Component {

    handleChange(value){
        const { model, dispatch } = this.props;
        console.log("handleChange model ",this.props.model.value);
        dispatch(actions.change(model, value));
        if(this.props.onChange) this.props.onChange(value);
    }

    render() {
        console.log("radioredux: ",this.props)
        return <Control
            model={this.props.model}
            component={Radio}
            redux
            onCustomChange={value => this.handleChange(value)}
            {...this.props}
        />

    }
}

Radio.propTypes = {
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


export default RadioRedux;




