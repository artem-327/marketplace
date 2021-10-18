import { useEffect, useState } from 'react'
import { Modal, FormGroup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
import moment from 'moment'
const timezone = require('moment-timezone')
// Components
import { DateInput } from '../../../../components/custom-formik'
import ErrorFocus from '../../../../components/error-focus'
import { Required } from '../../../../components/constants/layout'
// Services
import { generateBOLValidation } from './ShippingQuotes.services'
import { getStringISODate } from '../../../../components/date-format'
// Constants
import { TIMEZONE_OPTIONS } from '../../../../constants/constants'

const GenerateBOLPopup = props => {
  const [timezoneOptions, setTimezoneOptions] = useState([])
  const [timezone, setTimezone] = useState('')
  const [time, setTime] = useState('')

  const {
    row,
    intl: { formatMessage },
    datagrid,
    generateBOL,
    closeGenBOLPopup,
    defaultTimezone
  } = props

  useEffect(() => {
    setTimezoneOptions(TIMEZONE_OPTIONS.map(el => ({
      key: el.value,
      text: el.display_name,
      value: el.value
    })))
  }, [])

  return (
    <Modal closeIcon onClose={closeGenBOLPopup} open centered={false} size='small'>
      <Modal.Header>
        <FormattedMessage id='operations.generateBOL' defaultMessage='Generate BOL' />
      </Modal.Header>
      <Modal.Content>
        <Form
          enableReinitialize
          initialValues={{
            carrierName: row?.carrierName,
            pickupTimeZone: defaultTimezone ? defaultTimezone.value : '',
            pickupDate: '',
            pickupTime:''
          }}
          validationSchema={generateBOLValidation()}
          onReset={closeGenBOLPopup}
          onSubmit={async (values, { setSubmitting }) => {
            const userTimezone = defaultTimezone?.value

            const enteredDate = getStringISODate(values.pickupDate).slice(0, 10) + ' ' + values.pickupTime
            const enteredDateWithSelectedTZ = moment.tz(enteredDate, values.pickupTimeZone).format()
            const enteredDateWithUserSettingsTZ = moment.tz(enteredDateWithSelectedTZ, userTimezone).format()

            try {
              await generateBOL(row?.id, values.carrierName, enteredDateWithUserSettingsTZ)
              datagrid.loadData()
              closeGenBOLPopup()
            } catch (e) {
            }
            setSubmitting(false)
          }}>
          {(formikProps) => {
            return (
              <>
                <FormGroup>
                  <Input
                    label={
                      <>
                        {formatMessage({ id: 'operations.carrierName', defaultMessage: 'Carrier Name' })}
                        <Required />
                      </>
                    }
                    name='carrierName'
                    fieldProps={{ width: 8 }}
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
                      search: true
                    }}
                    options={timezoneOptions}
                    fieldProps={{ width: 8 }}
                  />
                </FormGroup>
                <FormGroup>
                  <DateInput
                    label={
                      <>
                        {formatMessage({ id: 'operations.pickupDate', defaultMessage: 'Pick Up Date' })}
                        <Required />
                      </>
                    }
                    name='pickupDate'
                    inputProps={{
                      clearable: true,
                      minDate: moment()
                    }}
                    fieldProps={{ width: 8 }}
                  />
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
                    fieldProps={{ width: 8 }}
                  />
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='operations_shipping_quote_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                  </Button.Reset>
                  <Button.Submit data-test='operations_shipping_quote_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
                  </Button.Submit>
                </div>
                <ErrorFocus />
              </>
            )
          }}
        </Form>
      </Modal.Content>
    </Modal>
  )
}

GenerateBOLPopup.propTypes = {
  intl: PropTypes.object
}

GenerateBOLPopup.defaultProps = {
  intl: {}
}

export default injectIntl(GenerateBOLPopup)
