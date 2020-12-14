import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import moment from 'moment'

import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react'
import { getLocaleDateFormat } from '../date-format'
import { Input } from 'formik-semantic-ui-fixed-validation'

class FormikInput extends Component {
  constructor(props) {
    super(props)
    const { id, name } = props
    this.id = id || `field_input_${name}`
  }

  handleRef = r => {
    r && r.inputNode.setAttribute('autocomplete', 'off')
  }

  render() {
    const { name, label, validate, inputProps = {}, fieldProps = {}, inputRef, fast, inputOnly } = this.props
    const { onChange, placeholder, ...safeInputProps } = inputProps
    const DesiredField = fast === true ? FastField : Field

    return (
      <DesiredField
        name={name}
        validate={validate}
        render={({ field, form }) => {
          const error = getFieldError(field, form)
          return (
            <Form.Field error={!!error} {...fieldProps}>
              {!!label && <label htmlFor={this.id}>{label}</label>}

              {/* <InputRef inputRef={inputRef}> */}
              {inputOnly ? (
                <Input
                  {...safeInputProps}
                  name={name}
                  value={field.value}
                  inputProps={{
                    onChange: (e, { name, value }) => {
                      const formatedValue = value
                        .replace(/[/.]/g, '-')
                        .replace(/ /g, '')
                        .split('-')

                      const canAutomaticallyAdjustDateFormat =
                        formatedValue.some(d => d.length >= 4)
                        && formatedValue.length === 3
                        && moment(value, getLocaleDateFormat()).isValid()
                      const val =
                        canAutomaticallyAdjustDateFormat
                          ? moment(value, getLocaleDateFormat()).format(getLocaleDateFormat())
                          : value
                      setFieldValue(form, name, val, true)
                      Promise.resolve().then(() => {
                        onChange && onChange(e, { name, value: val })
                      })
                    },
                    placeholder: placeholder || getLocaleDateFormat()
                  }}
                />
              ) : (
                <DateInput
                  {...safeInputProps}
                  name={name}
                  value={field.value}
                  clearable
                  onChange={(e, { name, value }) => {
                    //automatic adjust date in input based on format date
                    const formatedValue = value
                      .replace(/[/.]/g, '-')
                      .replace(/ /g, '')
                      .split('-')

                    const canAutomaticallyAdjustDateFormat =
                      formatedValue.some(d => d.length >= 4)
                      && formatedValue.length === 3
                      && moment(value, getLocaleDateFormat()).isValid()
                    const val =
                      canAutomaticallyAdjustDateFormat
                        ? moment(value, getLocaleDateFormat()).format(getLocaleDateFormat())
                        : value
                    setFieldValue(form, name, val, true)
                    Promise.resolve().then(() => {
                      onChange && onChange(e, { name, value: val })
                    })
                  }}
                  placeholder={placeholder || getLocaleDateFormat()}
                  data-test={`FormikInput_${this.id}_DateInput`}
                  closable
                  id={this.id}
                  onBlur={form.handleBlur}
                  dateFormat={getLocaleDateFormat()}
                  animation='none'
                  ref={this.handleRef}
                  localization={typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'}
                />
              )}
              {!inputOnly && error && <span className='sui-error-message'>{getIn(form.errors, name)}</span>}
              {/* </InputRef> */}
            </Form.Field>
          )
        }}
      />
    )
  }
}

export default FormikInput
