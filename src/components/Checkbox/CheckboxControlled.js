import React, {Component} from 'react';
import './checkbox.css';
import PropTypes from "prop-types";

class CheckboxControlled extends Component {

    render() {
        return (
            <label className={"input-checkbox " + (this.props.inputClass || '')}><p>{this.props.label}</p>
                <input type="checkbox" name={this.props.name}
                       onChange={() => this.props.onChange(!this.props.value)}
                       checked={this.props.value}/>
                <span className={"checkmark " + (this.props.className || '')}>  </span>
            </label>
        )
    }
}

CheckboxControlled.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    inputClass: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool
};

export default CheckboxControlled;




