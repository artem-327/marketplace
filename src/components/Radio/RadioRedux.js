import React, {Component} from 'react';
import PropTypes from "prop-types";
import Radio from './Radio';
import { actions } from 'react-redux-form';
import { Control } from 'react-redux-form';

class RadioRedux extends Component {

    handleChange(value){
        const { model, dispatch } = this.props;
        dispatch(actions.change(model, value));
        if(this.props.onChange) this.props.onChange(value);
    }

    handleCustom(model, value){
        this.props.dispatch(actions.change(model, value));
    }

    render() {
        return <Control
            model={this.props.model}
            component={Radio}
            redux
            onChange={value => this.handleChange(value)}
            productAgeModel={this.props.productAgeModel}
            productAgeCustomModel={this.props.productAgeCustomModel}
            {...this.props}
            handleCustom = {model => this.handleCustom(model)}
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




