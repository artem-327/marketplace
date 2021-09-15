import { useEffect, useState } from 'react'
import moment from 'moment'
import { Field } from 'formik'
import { FormField, FormGroup } from 'semantic-ui-react'
import styled from 'styled-components'
import { Input, Dropdown } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
const timezone = require('moment-timezone')
import PropTypes from 'prop-types'

// Components
import { TIMEZONE_OPTIONS } from './Constants'
import { Required } from "../constants/layout"

const StyledDropdown = styled(Dropdown)`
  &.ui.dropdown,
  &.selection.dropdown {  
    min-width: 60% !important;
    width: 60% !important;
  }
`

const StyledInput = styled(Input)`
  margin-right: 10px;
  
  &.ui.input {
    width: 40% !important;
  }  
`

const TimeWithZoneInput = props => {
  const [timezoneOptions, setTimezoneOptions] = useState([])
  const [timezone, setTimezone] = useState('')
  const [time, setTime] = useState('')

  const {
    name,
    disabled,
    required,
    label,
    intl: { formatMessage }
  } = props


  useEffect(() => {
    setTimezoneOptions(TIMEZONE_OPTIONS.map(el => ({
      key: el.value,
      text: el.display_name,
      value: el.value
    })))
  }, [])


  //https://www.cluemediator.com/convert-local-time-to-another-timezone-using-moment-js

  const isValidTime = time => {
    return moment(time, 'HH:mm').isValid()
  }


  return (
    <Field
      name={name}
      render={({ field, form }) => {
        const { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting, submitForm } = form
        console.log('!!!!!!!!!! TimeWithZoneInput formikProps', form)
        return (
          <FormField>
            {label && (<label>{label}</label>)}



            <span style={{ display: 'flex', flexDirection: 'row' }}>

              <StyledInput
                name='debugTime'
                disabled={disabled}
                value={time}
                onChange={(_, { value }) => {
                  setTime(value)
                  if (timezone && isValidTime(value)) {

                    const newTime = moment(value, 'HH:mm')


                    console.log('!!!!!!!!!! aaaaa newTime', newTime)
                    //setFieldValue(name, value)
                    //setFieldTouched(name, true, true)
                  }
                }}
                placeholder={props.timePlaceholder}

              />
              <StyledDropdown
                name='debugTimeZone'
                value={timezone}
                className='phone-code'
                search
                selection
                disabled={disabled}
                options={timezoneOptions}
                onChange={(_, { value }) => {
                  setTimezone(value)
                  if (value && isValidTime(time)) {

                    const newTime = moment(time, 'HH:mm')

                    console.log('!!!!!!!!!! aaaaa newTime', newTime)

                    //setFieldValue(name, time)
                    //setFieldTouched(name, true, true)
                  }
                }}
                placeholder={props.zonePlaceholder}
              />
            </span>


          </FormField>
        )
      }}
    />
  )
}

TimeWithZoneInput.propTypes = {
  name: PropTypes.string,
  required: PropTypes.required,
  label: PropTypes.any,
  disabled: PropTypes.bool,
  zonePlaceholder: PropTypes.any,
  timePlaceholder: PropTypes.any,
}

TimeWithZoneInput.defaultProps = {
  name: null,
  required: false,
  label: '',
  disabled: false,
  timePlaceholder: 'HH:MM',
  zonePlaceholder: 'Select zone',
}

//{key: 'USER_TIME_ZONE', value: 'US/Central'}

export default injectIntl(TimeWithZoneInput)