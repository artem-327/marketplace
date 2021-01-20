import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import moment from 'moment'
import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react'    //! ! to be deleted

import DatePicker from 'react-datepicker'
import './styles/dateInput.scss'
import { getLocaleDateFormat } from '../date-format'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { Input as SemanticInput } from 'semantic-ui-react'
import { registerLocale } from  "react-datepicker"
import * as locales from 'date-fns/locale'
import { Calendar } from 'react-feather'

class FormikInput extends Component {
  constructor(props) {
    super(props)
    const { id, name } = props
    this.id = id || `field_input_${name}`

    this.state = {
      datepickerMode: 0
    }
  }

  handleRef = r => {
    //! !r && r.inputNode.setAttribute('autocomplete', 'off')
  }

  //https://react-day-picker.js.org/docs/localization/
  //https://www.positronx.io/react-datepicker-tutorial-with-react-datepicker-examples/
  //https://app.zeplin.io/project/5dccc59b839aa2bcf6509370/screen/5e006f3e2149329a03d737e3

  componentDidMount() {
    const localization = typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'
    const locale = locales[localization]
    if (locale) {
      registerLocale(localization, locale)
    }
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
    const { datepickerMode } = this.state
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
                          (separator.length === 1 && value.length === 2 && field.value.charAt(2) !== separator) ||
                          (separator.length === 2 &&
                            value.length === 2 &&
                            field.value.charAt(2) !== separator.split('')[0]) ||
                          (separator.length === 1 && value.length === 5 && field.value.charAt(5) !== separator) ||
                          (separator.length === 2 &&
                            value.length === 6 &&
                            field.value.charAt(6) !== separator.split('')[0])
                            ? `${value}${separator}`
                            : value
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
                <>
                  <DatePicker
                    {...safeInputProps}
                    name={name}
                    value={field.value}
                    showMonthYearPicker={datepickerMode === 2}
                    showYearPicker={datepickerMode === 1}
                    showPopperArrow={false}
                    placeholderText={placeholder || getLocaleDateFormat()}
                    isClearable={true}
                    locale={typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'}
                    customInput={
                      <SemanticInput
                        icon='calendar'
                      />
                    }

                    onChangeRaw={e => {
                      const { name, value } = e.target
                      let val = ''
                      if (value) {
                        //console.log('!!!!!!!!!! onChangeRaw value', value)
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
                    }}
                    onSelect={value => {
                      //console.log('!!!!!!!!!! onSelect value', value)
                      const val = moment(value, 'en').format(getLocaleDateFormat())
                      //const val = moment(value, getLocaleDateFormat()).format(getLocaleDateFormat())
                      setFieldValue(form, name, val, true)
                      Promise.resolve().then(() => {
                        onChange && onChange(e, { name, value: val })
                      })
                    }}
                    dateFormat={
                      getLocaleDateFormat()
                        .replace(/D/g, 'd')
                        .replace(/m/g, 'M')
                        .replace(/Y/g, 'y')
                    }
                  />



                  <DateInput
                    {...safeInputProps}
                    name={name}
                    value={field.value}
                    clearable
                    onChange={(e, { name, value }) => {
                      //automatic adjust date in input based on format date
                      const formatedValue = value.replace(/[/.]/g, '-').replace(/ /g, '').split('-')

                      console.log('!!!!!!!!!! onChange value', value)

                      const canAutomaticallyAdjustDateFormat =
                        formatedValue.some(d => d.length >= 4) &&
                        formatedValue.length === 3 &&
                        moment(value, getLocaleDateFormat()).isValid()
                      const val = canAutomaticallyAdjustDateFormat
                        ? moment(value, getLocaleDateFormat()).format(getLocaleDateFormat())
                        : value
                      setFieldValue(form, name, val, true)
                      Promise.resolve().then(() => {
                        onChange && onChange(e, { name, value: val })
                      })

                      console.log('!!!!!!!!!! onChange old val', val)
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
                </>
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
