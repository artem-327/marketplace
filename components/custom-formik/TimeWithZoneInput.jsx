import { useEffect, useState } from 'react'
import { FormField, FormGroup } from 'semantic-ui-react'

import { Input, Dropdown } from 'semantic-ui-react'
//import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'

import { Field } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
const timezone = require('moment-timezone')
import PropTypes from 'prop-types'

// Components
import { TIMEZONE_OPTIONS } from './Constants'
import {Required} from "../constants/layout";





const TimeWithZoneInput = props => {
  const [timezoneOptions, setTimezoneOptions] = useState([])

  const { intl: { formatMessage } } = props


  useEffect(() => {
    setTimezoneOptions(TIMEZONE_OPTIONS.map(el => ({
      key: el.value,
      text: el.display_name,
      value: el.value
    })))
  }, [])


  //console.log('!!!!!!!!!! aaaaa aaaaa', timezone.tz.names())
  //console.log('!!!!!!!!!! TimeWithZoneInput timezoneOptions', timezoneOptions)

  //https://www.cluemediator.com/convert-local-time-to-another-timezone-using-moment-js

  return (
    <FormGroup>

      <Input
        label={
          <>
            {formatMessage({ id: 'operations.pickupTime', defaultMessage: 'Pick Up Time' })}
            <Required />
          </>
        }
        name='pickupTime'
        inputProps={{
          placeholder: formatMessage({ id: 'operations.standardTime', defaultMessage: '00:00' })
        }}

      />


      <Dropdown
        label={
          <>
            {formatMessage({ id: 'operations.pickupTimeZone', defaultMessage: 'Pick Up Time Zone' })}
            <Required />
          </>
        }
        name='pickupTimeZone'
        inputProps={{
          placeholder: formatMessage({ id: 'operations.selectTimeZone', defaultMessage: 'Please select time zone' }),
          onChange: (_, { value }) => {
            console.log('!!!!!!!!!! onChange 2 value', value)


            console.log('!!!!!!!!!! onChange 2 value',
              value
            )


          }
        }}
        options={timezoneOptions}



        onChange={(_, { value }) => {
          console.log('!!!!!!!!!! onChange 1 value', value)


          console.log('!!!!!!!!!! onChange 1 value',
            value
          )


        }}

      />
    </FormGroup>
  )
}

export default injectIntl(TimeWithZoneInput)