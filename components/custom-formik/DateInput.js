import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'

import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react'
import { getLocaleDateFormat } from '../date-format'
class FormikInput extends Component {
  constructor(props) {
    super(props)
    const { id, name } = props
    this.id = id || `field_input_${name}`
  }

  handleRef = r => {
    r && r.inputNode.setAttribute('autocomplete', 'off')
    r && r.inputNode.setAttribute('readonly', true)
  }

  render() {
    const { name, label, validate, inputProps = {}, fieldProps = {}, inputRef, fast } = this.props
    const { onChange, ...safeInputProps } = inputProps
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
              <DateInput
                data-test={`FormikInput_${this.id}_DateInput`}
                closable
                id={this.id}
                name={name}
                {...safeInputProps}
                value={field.value}
                dateFormat={getLocaleDateFormat()}
                animation='none'
                onChange={(e, { name, value }) => {
                  setFieldValue(form, name, value, true)
                  Promise.resolve().then(() => {
                    onChange && onChange(e, { name, value })
                  })
                }}
                onBlur={form.handleBlur}
                ref={this.handleRef}
                localization={window.navigator.language.slice(0, 2)}
              />
              {/* </InputRef> */}

              {error && <span className='sui-error-message'>{getIn(form.errors, name)}</span>}
            </Form.Field>
          )
        }}
      />
    )
  }
}

export default FormikInput
