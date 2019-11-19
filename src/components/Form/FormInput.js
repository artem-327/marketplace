import React from 'react'
import PropTypes from 'prop-types'
import {messages} from '../../utils/validation'
import {Control, Errors} from 'react-redux-form'
//import {States} from './States';

export const FormInput = ({name, label, validators, defaultValue, errorShow}) => {
  return (
    <div className='input-group'>
      <div className='group-item-wr'>
        <label htmlFor={name}>{label}</label>
        <Control.text model={name} validators={validators} id={name} defaultValue={defaultValue} />
      </div>
      <Errors
        className='input-error'
        model={name}
        show={errorShow}
        messages={{
          required: messages.required
        }}
      />
    </div>
  )
}

/* export const FormSelect = ({name, label, defaultValue}) => {
    
    const mappedStates = States.map(test =><option>{test.name}</option>)

    return (
      <div className="input-group">
        <div className='group-item-wr'>
          <label htmlFor={name}>{label}</label>
          <Control.select
            model={name}
            id={name}
            defaultValue={defaultValue}>
            {mappedStates}
          </Control.select>
        </div>
      </div>
    )
  } */

FormInput.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  validators: PropTypes.object
}

FormInput.defaultProps = {
  defaultValue: '',
  errorShow: 'touched'
}
