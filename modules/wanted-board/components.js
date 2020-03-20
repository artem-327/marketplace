import React, { Component } from 'react'
import { Button, Input, TextArea, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Label } from 'semantic-ui-react'
import _ from 'lodash'

import {
  InputWrapper,
  QuantityWrapper,
  InputLabeledWrapper,
} from './constants/layout'

export const inputWrapper = (name, inputProps, label, labelText) => {
  return (
    <InputWrapper>
      {label && (<div className='field-label'>{label}</div>)}
      <div>
        <Input
          inputProps={inputProps}
          name={name}
        />
        <Label>{labelText}</Label>
      </div>
    </InputWrapper>
  )
}

export const inputLabeledWrapper = (name, inputProps, label) => {
  return (
    <InputLabeledWrapper>
      {label && (<div className='field-label'>{label}</div>)}
      <Input
        inputProps={inputProps}
        name={name}
      />
    </InputLabeledWrapper>
  )
}

export const quantityWrapper = (name, inputProps, formikProps, label = null) => {
  const { values, setFieldTouched, setFieldValue } = formikProps
  const value = _.get(values, name)
  return (
    <QuantityWrapper>
      {label && (<div className='field-label'>{label}</div>)}
      <div>
        <Input
          name={name}
          inputProps={inputProps}
        />
        <div className='sideButtons'>
          <Button
            type='button'
            className='buttonPlus'
            onClick={() => {
              if (isNaN(value) || value === '') {
                setFieldValue(name, 1)
                setFieldTouched(name, true, true)
              }
              else {
                setFieldValue(name, parseInt(value) + 1)
                setFieldTouched(name, true, true)
              }
            }}
          >+</Button>
          <Button
            type='button'
            className='buttonMinus'
            onClick={() => {
              if (isNaN(value) || value === '' ) {
                setFieldValue(name, 1)
                setFieldTouched(name, true, true)
              }
              else {
                const val = parseInt(value)
                if (val > 1) setFieldValue(name, val - 1) // ! ! fix minimal value - inputProps
                setFieldTouched(name, true, true)
              }
            }}
          >-</Button>
        </div>
      </div>
    </QuantityWrapper>
  )
}