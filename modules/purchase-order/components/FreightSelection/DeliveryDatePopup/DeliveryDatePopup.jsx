/* eslint-disable react-hooks/exhaustive-deps */
import Router from 'next/router'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Formik } from 'formik'
import { Button, Modal, Dimmer, Loader } from 'semantic-ui-react'
import moment from 'moment'

// Components
import { DateInput } from '../../../../../components/custom-formik'

// Services
import { getValidationScheme } from './DeliveryDatePopup.services'
import { handleManualShipment } from '../FreightSelection.services'

// Styles
import {
  ModalStyled,
  DivCenteredWrapper,
  DivHeader,
  DivDescription,
  DivContent,
  DivButtons,
  DivButtonColumn
} from './DeliveryDatePopup.styles'

const DeliveryDatePopup = props => {
  const { onClose, onSubmit, manualShipmentPending, cart } = props

  const minDate = moment().add(cart.maxLeadTimeDays || 2, 'days')

  return (
    <Formik
      initialValues={{ date: '' }}
      validationSchema={getValidationScheme(cart.maxLeadTimeDays || 2)}
      onSubmit={async (values, { setSubmitting, setTouched }) => {
        handleManualShipment(onSubmit, values, props)
      }}
    >
      {formikProps => {
        const { submitForm } = formikProps
        return (
          <ModalStyled open size='tiny' onClose={() => onClose()}>
            <Dimmer active={manualShipmentPending} inverted>
              <Loader />
            </Dimmer>
            <Modal.Content>
              <DivCenteredWrapper>
                <DivHeader>
                  <FormattedMessage
                    id='checkout.freight.preferredDeliveryDate'
                    defaultMessage='Preferred Delivery Date'
                  />
                </DivHeader>
                <DivDescription>
                  <FormattedMessage
                    id='checkout.freight.forMoreAccurateQuote'
                    defaultMessage='For a more accurate quote please select a preferred delivery date.'
                  />
                </DivDescription>
                <DivContent>
                  <DateInput
                    name='date'
                    inputProps={{
                      fluid: true,
                      initialDate: minDate,
                      minDate,
                      clearable: true
                    }}
                  />
                </DivContent>
                <DivButtons>
                  <DivButtonColumn>
                    <Button
                      type='button'
                      basic
                      onClick={() => onClose()}
                      data-test='confirmation_popup_returnToCart'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </DivButtonColumn>
                  <DivButtonColumn>
                    <Button
                      type='button'
                      color='blue'
                      onClick={submitForm}>
                      <FormattedMessage id='global.confirm' defaultMessage='Confirm'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </DivButtonColumn>
                </DivButtons>
              </DivCenteredWrapper>
            </Modal.Content>
          </ModalStyled>
        )
      }}
    </Formik>
  )
}

DeliveryDatePopup.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  manualShipmentPending: PropTypes.bool,
  cart: PropTypes.object
}

DeliveryDatePopup.defaultProps = {
  onClose: () => { },
  onSubmit: () => { },
  manualShipmentPending: false,
  cart: {}
}

export default injectIntl(DeliveryDatePopup)