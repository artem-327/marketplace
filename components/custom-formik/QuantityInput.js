import React, { Component } from 'react'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import _ from 'lodash'
import { string, object } from 'prop-types'
import styled from 'styled-components'
import { Field } from 'formik'
import { getSafe } from '~/utils/functions'
import { getFieldError, setFieldValue } from './helpers'

export const QuantityWrapper = styled.div`
  > .field-label {
    margin: 0em 0em 0.428571429em 0em;
    font-size: 1em;
    line-height: 1.29;
    color: #404040;
  }
  & div {
    position: relative;
    > .field {
      margin: 0 !important;
      .ui.input input {
        padding-right: 47px;
        background-color: #fdfdfd;
      }
    }
    > .sideButtons {
      position: absolute;
      width: 2.8571429em;
      height: 2.8571429em;
      right: 0;
      top: 0;
      .ui.button {
        position: absolute;
        margin: 0;
        background-color: #f8f9fb;
        border: solid 1px #dee2e6;
        font-family: feathericon;
        text-align: center;
        color: #848893;

        &.buttonPlus {
          border-radius: 0 3px 0 0;
          width: 2.8571429em;
          padding: 0.2142857em 0 0.1428571em 0;
        }
        &.buttonMinus {
          border-radius: 0 0 3px 0;
          width: 2.8571429em;
          padding: 0.1428571em 0 0.1428571em 0;
          top: 1.42857143em;
        }
        &.error {
          background: #fff6f6;
          border-color: #e0b4b4;
          color: #9f3a38;
        }        
      }
    }
  }
`

export default class QuantityInput extends Component {
  render() {
    const {
      name,
      inputProps,
      label
    } = this.props

    return (
      <Field
        name={name}
        render={({ field, form }) => {
          const { values } = form
          const value = _.get(values, name)
          const error = getFieldError(field, form)

          const min = getSafe(() => this.props.inputProps.min, null)
          const max = getSafe(() => this.props.inputProps.max, null)

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
                    className={`buttonPlus ${error ? 'error' : ''}`}
                    onClick={() => {
                      if (isNaN(value) || value === '') {
                        const initVal = max !== null ? max : (min !== null ? min : 1)
                        setFieldValue(form, name, initVal, true)
                      }
                      else {
                        const val = parseInt(value)
                        if (max === null || val < max)
                          setFieldValue(form, name, val + 1, true)
                      }
                    }}
                  >+</Button>
                  <Button
                    type='button'
                    className={`buttonMinus ${error ? 'error' : ''}`}
                    onClick={() => {
                      if (isNaN(value) || value === '' ) {
                        const initVal = min !== null ? min : (max !== null ? max : 1)
                        setFieldValue(form, name, initVal, true)
                      }
                      else {
                        const val = parseInt(value)
                        if (min === null || val > min)
                          setFieldValue(form, name, val - 1, true)
                      }
                    }}
                  >-</Button>
                </div>
              </div>
            </QuantityWrapper>
          )
        }}
      />
    )
  }
}

QuantityInput.propTypes = {
  name: string,
  inputProps: object
}

QuantityInput.defaultProps = {
  label: ''
}