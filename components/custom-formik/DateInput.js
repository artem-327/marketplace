import { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import moment from 'moment'

import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react-yz'
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
    const {
      name,
      label,
      validate,
      inputProps = {},
      fieldProps = {},
      inputRef,
      fast,
      inputOnly,
      addSeparator
    } = this.props
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
                      let val = value
                      if (addSeparator) {
                        //Gets separator (character) from getLocaleDateFormat.
                        let separator = [...getLocaleDateFormat()].find(
                          char => char !== 'M' && char !== 'D' && char !== 'Y'
                        )
                        // Checks and adds space if is space after dot.
                        separator = getLocaleDateFormat().search(' ') > 0 ? `${separator} ` : separator
                        // Checks position and adds separator or not if separator is there and user try to remove separator from input.
                        val =
                          (separator.length === 1 && value.length > 1 && value.charAt(2) !== separator) ||
                          (separator.length === 2 &&
                            value.length > 1 &&
                            value.charAt(2) !== separator.split('')[0]) ||
                          (separator.length === 1 && value.length > 4 && value.charAt(5) !== separator) ||
                          (separator.length === 2 &&
                            value.length > 5 &&
                            value.charAt(6) !== separator.split('')[0])
                          ? `${value}${separator}`
                          : value
                        val = separator.length === 1 ? val.slice(0, 10) : val.slice(0, 12)
                      } else {
                        const formatedValue = value.replace(/[/.]/g, '-').replace(/ /g, '').split('-')

                        const canAutomaticallyAdjustDateFormat =
                          formatedValue.some(d => d.length >= 4) &&
                          formatedValue.length === 3 &&
                          moment(value, getLocaleDateFormat()).isValid()
                        val = canAutomaticallyAdjustDateFormat
                          ? moment(value, getLocaleDateFormat()).format(getLocaleDateFormat())
                          : value
                      }

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
                    let valTemp = value.split('')
                    let rest = valTemp.pop()
                    //Gets separator (character) from getLocaleDateFormat.
                    let separator = [...getLocaleDateFormat()].find(
                      char => char !== 'M' && char !== 'D' && char !== 'Y'
                    )
                    // Checks and adds space if is space after dot.
                    separator = getLocaleDateFormat().search(' ') > 0 ? `${separator} ` : separator
                    // Checks position and adds separator or not if separator is there and user try to remove separator from input.
                    let val =
                      (separator.length === 1 && value.length === 3 && value.charAt(2) !== separator) ||
                      (separator.length === 2 &&
                        value.length === 3 &&
                        value.charAt(2) !== separator.split('')[0]) ||
                      (separator.length === 1 && value.length === 6 && value.charAt(5) !== separator) ||
                      (separator.length === 2 &&
                        value.length === 7 &&
                        value.charAt(6) !== separator.split('')[0])
                      ? `${valTemp.join('')}${separator}${rest}`
                      : value

                    val = separator.length === 1 ? val.slice(0, 10) : val.slice(0, 12)

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
