//import React, { Component } from 'react'
import React, { useEffect, useState } from 'react'

import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import moment from 'moment'
import { getFieldError, setFieldValue } from './helpers'

import { DateInput } from 'semantic-ui-calendar-react'    //! ! to be deleted

import DatePicker from 'react-datepicker'
import {
  DatePickerWrapper,
  DivDatepickerHeader
} from './styles/index'

import { getLocaleDateFormat } from '../date-format'
import { Input } from 'formik-semantic-ui-fixed-validation'
import { Input as SemanticInput } from 'semantic-ui-react'
import { registerLocale } from  "react-datepicker"
import * as locales from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'
import { Calendar } from 'react-feather'


//! ! class FormikInput extends Component {
const DateInputComponent = props => {
  const [id, setId] = useState(props.id || `field_input_${props.name}`)
  const [locale, setLocale] = useState(null)
  const [datepickerMode, setDatepickerMode] = useState(0)

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
  } = props

  const handleRef = r => {
    console.log('!!!!!!!!!! handleRef r', r)
    //! !r && r.inputNode.setAttribute('autocomplete', 'off')
  }


  //https://react-day-picker.js.org/docs/localization/
  //https://www.positronx.io/react-datepicker-tutorial-with-react-datepicker-examples/
  //https://app.zeplin.io/project/5dccc59b839aa2bcf6509370/screen/5e006f3e2149329a03d737e3
  //https://www.telerik.com/kendo-react-ui/react-hooks-guide/
  https://github.com/Hacker0x01/react-datepicker/blob/master/src/calendar.jsx

  // Similar to call componentDidMount:
  useEffect(() => {
    const localization = typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'
    const locale = locales[localization]
    if (locale) {
      registerLocale(localization, locale)
      setLocale({ locale })
    }
    // If [] is empty then is similar as componentDidMount.
  }, [])


  const { onChange, placeholder, ...safeInputProps } = inputProps
  const DesiredField = fast === true ? FastField : Field

  /*
renderCustomHeader={calendarProps => {

                      console.log('!!!!!!!!!! aaaaa locale', locale)
                      console.log('!!!!!!!!!! aaaaa calendarProps', calendarProps)
                      return (
                        <DivDatepickerHeader>
                          <ChevronLeft

                          />
                          <div>
                            bla
                          </div>
                          <ChevronRight

                          />
                        </DivDatepickerHeader>
                      )
                    }}


                    //value={field.value}
                    selected={field.value}

  */



  return (
    <DesiredField
      name={name}
      validate={validate}
      render={({ field, form }) => {
        const error = getFieldError(field, form)

        //{!!label && <label htmlFor={this.id}>{label}</label>}

        /*
        const selValue2 = moment(field.value).isValid()
          ? moment(field.value).format(getLocaleDateFormat()) // ! ! 'MMM DD YYYY'
          : ''
        */

        const selValue2 = new Date(field.value)
        console.log('!!!!!!!!!! selected field.value', field.value)
        console.log('!!!!!!!!!! selected selValue2', selValue2)



        const selValue = new Date()
        console.log('!!!!!!!!!! selected selValue', selValue)

        return (
          <Form.Field error={!!error} {...fieldProps}>
            {!!label && <label htmlFor={id}>{label}</label>}

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
                <DatePickerWrapper>
                  <DatePicker
                    {...safeInputProps}
                    name={name}

                    selected={selValue}
                    showMonthYearPicker={datepickerMode === 2}
                    showYearPicker={datepickerMode === 1}
                    showPopperArrow={false}
                    placeholderText={placeholder || getLocaleDateFormat()}
                    isClearable={false}
                    clearButtonTitle='x'
                    forceShowMonthNavigation
                    locale={typeof navigator !== 'undefined' ? window.navigator.language.slice(0, 2) : 'en'}
                    shouldCloseOnSelect={datepickerMode === 0}
                    customInput={
                      <SemanticInput
                        icon='calendar'
                      />
                    }
                    ref={handleRef}

                    renderCustomHeader={calendarProps => {

                      console.log('!!!!!!!!!! aaaaa locale', locale)
                      console.log('!!!!!!!!!! aaaaa calendarProps', calendarProps)
                      return (
                        <DivDatepickerHeader>
                          <ChevronLeft
                            onClick={() => {
                              datepickerMode === 0 ? calendarProps.decreaseMonth() : calendarProps.decreaseYear()
                            }}
                          />
                          <div
                            onClick={() =>
                              datepickerMode === 2
                                ? setDatepickerMode(0)
                                : setDatepickerMode(datepickerMode + 1)
                            }
                          >
                            bla
                          </div>
                          <ChevronRight
                            onClick={() => {
                              datepickerMode === 0 ? calendarProps.increaseMonth() : calendarProps.increaseYear()
                            }}
                          />
                        </DivDatepickerHeader>
                      )
                    }}
                    onChangeRaw={e => {
                      const { name, value } = e.target
                      let val = ''
                      console.log('!!!!!!!!!! onChangeRaw value', value)
                      if (value) {
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
                      console.log('!!!!!!!!!! onSelect value', value)
                      const val = moment(value, 'en').format(getLocaleDateFormat())
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
                </DatePickerWrapper>


                {null
                  /**************************************************************** // ! !
                   * Nize je puvodni komponenta pro kalendar, bude potom smazana
                   ****************************************************************/}
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
                  data-test={`FormikInput_$_DateInput`}
                  closable
                  onBlur={form.handleBlur}
                  dateFormat={getLocaleDateFormat()}
                  animation='none'
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

export default DateInputComponent
