import React, {Component} from 'react';
import './checkbox.css';
import PropTypes from "prop-types";

class Checkbox extends Component {
    state = {
        checked: false,
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.defaultValue){
            this.setState({checked: nextProps.defaultValue})
        }
    }

    handleChange = () => {
        this.setState({checked: !this.state.checked},() => {
            this.props.onChange(this.state.checked);
        });
    }

    render() {
        return (
            <label className={"input-checkbox " + (this.props.inputClass || '')}><p>{this.props.label}</p>
                <input type="checkbox" name={this.props.name}
                       onChange={this.handleChange}
                       checked={this.props.disabled ? this.props.defaultValue : this.state.checked}
                       disabled={this.props.disabled}/>
                <span className={"checkmark " + (this.props.className || '')}>  </span>
            </label>
        )
    }
}

export default Checkbox;


Checkbox.propTypes = {
    label: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    className: PropTypes.string,
    inputClass: PropTypes.string,
    onChange: PropTypes.func,
    defaultValue: PropTypes.bool
};

Checkbox.defaultProps = {
    disabled: false
  }


