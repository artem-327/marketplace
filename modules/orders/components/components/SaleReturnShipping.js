import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import {
  Modal,
  ModalContent,
  Button,
  Grid,
  Dimmer,
  Header,
  Loader,
  Segment,
  GridColumn,
  GridRow
} from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { errorMessages } from '~/constants/yupValidation'
import confirm from '~/src/components/Confirmable/confirm'
import { withToastManager } from 'react-toast-notifications'
import { DateInput } from '~/components/custom-formik'
import { currency } from '~/constants/index'
import ShippingQuote from '~/modules/purchase-order/components/ShippingQuote'
import '~/modules/purchase-order/styles/PurchaseOrder.scss'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const initValues = {}

class SaleReviewCreditRequest extends React.Component {
  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager } = this.props
    console.log('====================================')
    console.log(values)
    console.log('====================================')

    try {
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='order.success' defaultMessage='Success' />,
          <FormattedMessage id='order.rejected' defaultMessage='Order was successfully rejected' />
        ),
        {
          appearance: 'success'
        }
      )
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  handleQuoteSelect = index => {
    let { shippingQuoteSelected, shippingQuotes } = this.props
    shippingQuoteSelected({ index, quote: shippingQuotes[index] })
  }

  handleManualShipment = async formikProps => {
    let { values, setSubmitting, errors, validateForm, setFieldTouched } = formikProps
    let {
      requestManualShipment,
      shipping: { selectedAddress },
      toastManager
    } = this.props
    setFieldTouched('address')
    setSubmitting(false)

    if (values.address) {
      let payload = {
        destinationCountryId: selectedAddress.address.country.id,
        destinationZIP: selectedAddress.address.zip.zip
      }
      await requestManualShipment(payload)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id='notifications.manualShippingQuote.header'
            defaultMessage='Request succesfully submitted'
          />,
          <FormattedMessage
            id='notifications.manualShippingQuote.content'
            defaultMessage='Request for Shipment Quote has been successful'
          />
        ),
        { appearance: 'success' }
      )
    }
  }

  renderFreightSelection = formikProps => {
    let { cart, shippingQuotes, shippingQuotesAreFetching, shipping, manualShipmentPending } = this.props

    return (
      <Segment>
        <Grid className='bottom-padded'>
          <GridRow className='header'>
            <GridColumn>
              <Header as='h2'>
                <FormattedMessage id='cart.2freightSelection' defaultMessage='2. Freight Selection' />
              </Header>
            </GridColumn>
          </GridRow>
          {!cart.weightLimitExceed ? (
            <ShippingQuote
              currency={currency}
              selectedShippingQuote={cart.selectedShipping}
              handleQuoteSelect={this.handleQuoteSelect}
              selectedAddress={shipping.selectedAddress}
              shippingQuotes={shippingQuotes}
              shippingQuotesAreFetching={shippingQuotesAreFetching}
            />
          ) : (
            !shipping.selectedAddress && (
              <GridRow>
                <GridColumn>
                  <FormattedMessage
                    id='cart.selectWhOrAddress'
                    defaultMessage='Please, select delivery address or warehouse first.'
                  />
                </GridColumn>
              </GridRow>
            )
          )}
          {cart.weightLimitExceed && shipping.selectedAddress && (
            <>
              <GridRow>
                <GridColumn computer={16}>
                  <FormattedMessage
                    id='cart.weightLimitExceeded'
                    defaultMessage={`Your order weight exceeds weight limit ${weightLimitStr} for automatic shipping quotes. Your shipping quote need to be processed manually. If you wish to continue, click the "Request Shipping Quote" button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                    values={{ limit: weightLimitStr }}
                  />
                </GridColumn>
              </GridRow>
            </>
          )}

          {shippingQuotes.length === 0 &&
            shipping.selectedAddress &&
            !shippingQuotesAreFetching &&
            !cart.weightLimitExceed && (
              <GridRow>
                <GridColumn computer={16}>
                  <FormattedMessage
                    id='cart.noShippingQuotes.processManually'
                    defaultMessage={`It was not possible to retrieve any automated shipping quotes for you order. Your shipping quote might need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                  />
                </GridColumn>
              </GridRow>
            )}
          {shipping.selectedAddress &&
            // shippingQuotes.length === 0 &&
            (!shippingQuotesAreFetching || cart.weightLimitExceed) && (
              <>
                <GridRow>
                  <GridColumn computer={8}>
                    <Input
                      name='shipmentQuoteId'
                      label={<FormattedMessage id='cart.shipmentQuote' defaultMessage='Shipment Quote' />}
                    />
                  </GridColumn>
                </GridRow>

                <GridRow>
                  <GridColumn computer={16}>
                    <Button
                      loading={manualShipmentPending}
                      type='button'
                      onClick={() => this.handleManualShipment(formikProps)}>
                      <FormattedMessage id='cart.requestShippingQuote' defaultMessage='Request Shipping Quote'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </GridColumn>
                </GridRow>
                <GridRow>
                  <GridColumn computer={16}>
                    <FormattedMessage
                      id='cart.quoteReceived'
                      defaultMessage='If you already received the shipping quote and agree, please type in the provided Quote Id and continue with Checkout.'
                    />
                  </GridColumn>
                </GridRow>
              </>
            )}
        </Grid>
      </Segment>
    )
  }

  render() {
    const {
      intl: { formatMessage },
      isSending
    } = this.props

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closePopup()} open={true} size='small'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.returnShipping' defaultMessage='ORDER RETURN SHIPPING' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...initValues }}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {formikProps => {
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <DateInput
                              inputProps={{
                                fluid: true,
                                placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                              }}
                              label={
                                <FormattedMessage
                                  id='order.return.pickupDate'
                                  defaultMessage='Preferred pick-up date:'
                                />
                              }
                              name='pickupDate'
                            />
                            <TextArea
                              name='pickupRemarks'
                              label={formatMessage({
                                id: 'order.return.EnterPickupRemarks',
                                defaultMessage: 'Enter pickup remarks:'
                              })}
                            />
                            <TextArea
                              name='deliveryRemarks'
                              label={formatMessage({
                                id: 'order.return.EnterDeliveryRemarks',
                                defaultMessage: 'Enter delivery remarks:'
                              })}
                            />
                            <Input
                              name='shipperRefNo'
                              label={formatMessage({
                                id: 'order.return.shipperRefNo',
                                defaultMessage: 'Enter shipper reference number: '
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={10}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button basic fluid onClick={() => this.props.closePopup()}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button primary fluid type='submit'>
                              <FormattedMessage id='global.save' defaultMessage='Save' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </>
                  )
                }}
              </Form>
            </Modal.Description>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { detail } = state.orders
  return {
    orderId: detail.id,
    isSending: state.orders.isSending
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(SaleReviewCreditRequest)))
