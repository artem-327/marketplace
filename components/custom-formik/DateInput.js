import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'

import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react'
import { getLocaleDateFormat, getStringISODate } from '../date-format'
import { FormattedMessage } from 'react-intl'
class FormikInput extends Component {
  constructor(props) {
    super(props)
    const { id, name } = props
    this.id = id || `field_input_${name}`
    this.state = {
      value: null
    }
  }

  handleRef = r => {
    r && r.inputNode.setAttribute('autocomplete', 'off')
    // r && r.inputNode.setAttribute('readonly', true)
  }

  //FIXME
  checkMaskDate = value => {
    if (value.length > 10 || isNaN(value.charAt(value.length - 1))) return
    console.log('value', value)
    console.log('this.state.value', this.state.value)
    const dateFormat = 'MM/DD/YYYY' // getLocaleDateFormat()
    const dash = getLocaleDateFormat().includes('-')
    const dot = getLocaleDateFormat().includes('.')

    let separator = '/'
    if (dash) separator = '-'
    if (dot) separator = '.'

    if (value.length) {
      if (dateFormat.charAt(0) === 'M') {
        let monthValue = value.substring(0, 2)
        let dayValue = value.substring(3, 5)
        console.log('dayValue', isNaN(parseInt(dayValue)))
        if (monthValue.length && (parseInt(monthValue) > 12 || isNaN(parseInt(monthValue)))) {
          monthValue = 12
          value = value.splice(0, 2, monthValue)
        }
        if (dayValue.length && (parseInt(dayValue) > 31 || isNaN(parseInt(dayValue)))) {
          dayValue = 31
          value = value.splice(3, 2, dayValue)
        }
      }
    }
    if (dateFormat.charAt(0) === 'M' || dateFormat.charAt(0) === 'D') {
      if (
        value.length >= 2 &&
        value.indexOf(separator) !== 2 &&
        ((this.state.value && this.state.value.indexOf(separator) !== 2) || !this.state.value)
      ) {
        value = value.splice(2, 0, separator)
      }
      if (
        (value.length >= 5 && this.state.value && this.state.value.length < 5) ||
        (this.state.value && this.state.value.length < 5 && value.length > 5)
      ) {
        value = value.splice(5, 0, separator)
      }
    }

    this.setState({ value })
    return value
  }

  render() {
    const { name, label, validate, inputProps = {}, fieldProps = {}, inputRef, fast } = this.props
    const { onChange, ...safeInputProps } = inputProps
    const DesiredField = fast === true ? FastField : Field

    const strDateFormat = getLocaleDateFormat().replace(/[A-Z]/g, '9')
    const dotSpace = strDateFormat.includes('. ')
    const dash = strDateFormat.includes('-')
    const dot = strDateFormat.includes('.')

    let separator = '/'
    if (dotSpace) separator = '. '
    if (dash) separator = '-'
    if (dot) separator = '.'
    const mask = [/[0-3]/, /[0-9]/, separator, /[0-1]/, /[0-9]/, separator, /[0-2]/, /[0-9]/, /[0-9]/, /[0-9]/]
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
              <DateInput
                {...safeInputProps}
                name={name}
                value={field.value}
                clearable
                onChange={(e, { name, value }) => {
                  const newValue = this.checkMaskDate(value)
                  console.log('newValue====================================')
                  console.log(newValue)
                  console.log('====================================')
                  setFieldValue(form, name, value, true)
                  Promise.resolve().then(() => {
                    onChange && onChange(e, { name, value })
                  })
                }}
                placeholder={getLocaleDateFormat()}
                data-test={`FormikInput_${this.id}_DateInput`}
                closable
                id={this.id}
                onBlur={form.handleBlur}
                dateFormat={getLocaleDateFormat()}
                animation='none'
                ref={this.handleRef}
                localization={typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'}
              />
              {error && <span className='sui-error-message'>{getIn(form.errors, name)}</span>}
              {/* </InputRef> */}
            </Form.Field>
          )
        }}
      />
    )
  }
}

export default FormikInput
