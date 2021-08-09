import { Modal, FormGroup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import PropTypes from 'prop-types'
// Components
import { DateInput } from '../../../../components/custom-formik'
import ErrorFocus from '../../../../components/error-focus'
import { Required } from '../../../../components/constants/layout'
// Services
import { generateBOLValidation } from './ShippingQuotes.services'
import { getStringISODate } from '../../../../components/date-format'

const GenerateBOLPopup = props => {
  const {
    row,
    intl: { formatMessage },
    datagrid,
    generateBOL,
    closeGenBOLPopup
  } = props

  return (
    <Modal closeIcon onClose={closeGenBOLPopup} open centered={false} size='small'>
      <Modal.Header>
        <FormattedMessage id='settings.addShippingQuote' defaultMessage='Add Shipping Quote' />
      </Modal.Header>
      <Modal.Content>
        <Form
          enableReinitialize
          initialValues={{ carrierName: row?.carrierName, pickupDate: '' }}
          validationSchema={generateBOLValidation()}
          onReset={closeGenBOLPopup}
          onSubmit={async (values, { setSubmitting }) => {
            closeGenBOLPopup()
            try {
              await generateBOL(row?.id, values.carrierName, getStringISODate(values.pickupDate))
              datagrid.loadData()
            } catch (e) {
            }
          }}>
          {(formikProps) => {
            return (
              <>
                <FormGroup widths='equal' data-test='shipping_quotes_generate_BOL_inputs'>
                  <Input
                    label={
                      <>
                        {formatMessage({ id: 'operations.carrierName', defaultMessage: 'Carrier Name' })}
                        <Required />
                      </>
                    }
                    name='carrierName'
                    inputProps={{ 
                      fluid: true
                    }}
                  />
                  <br/>
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
                      fluid: true
                    }}
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
