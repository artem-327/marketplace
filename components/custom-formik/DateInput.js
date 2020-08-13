import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import InputMask from 'react-input-mask'

import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react'
import { getLocaleDateFormat, getStringISODate } from '../date-format'
import { FormattedMessage } from 'react-intl'
class FormikInput extends Component {
  constructor(props) {
    super(props)
    const { id, name } = props
    this.id = id || `field_input_${name}`
  }

  handleRef = r => {
    r && r.inputNode.setAttribute('autocomplete', 'off')
    // r && r.inputNode.setAttribute('readonly', true)
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
              <InputMask
                name={name}
                mask={mask}
                onChange={(e, data) => {
                  if (!e || !e.target || !e.target.name) return
                  const name = data && data.name ? name : e.target.name
                  const value = data && data.value ? value : e.target.value
                  setFieldValue(form, name, value, true)
                  Promise.resolve().then(() => {
                    onChange && onChange(e, { name, value })
                  })
                }}
                value={field.value}
                onBlur={form.handleBlur}
                {...safeInputProps}>
                {/* <InputRef inputRef={inputRef}> */}
                <DateInput
                  {...safeInputProps}
                  name={name}
                  value={field.value}
                  clearable
                  placeholder={getLocaleDateFormat()}
                  data-test={`FormikInput_${this.id}_DateInput`}
                  closable
                  id={this.id}
                  dateFormat={getLocaleDateFormat()}
                  animation='none'
                  ref={this.handleRef}
                  localization={typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'}
                />
              </InputMask>
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
