import React from 'react';
import PropTypes from "prop-types";
import { messages } from '../../utils/validation'
import { Control, Errors } from 'react-redux-form';

const FormInput = ({name, label, validators, defaultValue, errorShow}) => {
    return (
      <div className="input-group">
        <div className='group-item-wr'>
          <label htmlFor={name}>{label}</label>
          <Control.text model={name}
            validators={validators}
            id={name}
            defaultValue={defaultValue} />
        </div>
        <Errors
          className="input-error"
          model={name}
          show={errorShow}
          messages={{
            required: messages.required,
          }}
        />
      </div>
    )
  }

export default FormInput;

FormInput.propTypes = {
    name: PropTypes.string,
    defaultValue: PropTypes.string,
    validators: PropTypes.object,
};


FormInput.defaultProps = {
    defaultValue: "",
    errorShow: "touched"
}
