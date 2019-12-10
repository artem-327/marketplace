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
  GridRow,
  Table
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
  state = {
    selectedShippingQuote: 0,
    shipmentQuoteId: ''
  }

  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager } = this.props
    console.log('====================================')
    console.log(values)
    console.log('====================================')
    return
    try {
      await this.props.returnShipmentOrder(orderId, deliveryRemarks, pickupRemarks, quoteId, shipperRefNo)
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

  onDateChange = async (event, { name, value }) => {
    const datePickUp = new Date(value)
    try {
      //Prozatím je na backendu bug a tento dotaz nefunguje
      await this.props.returnShipmentRates(this.props.orderId, datePickUp.toISOString())
    } catch (e) {
      console.error(e)
    }
  }

  requestManualShippingQuote = async pickupDate => {
    const datePickUp = new Date(pickupDate)
    try {
      //Prozatím je na backendu bug a tento dotaz nefunguje
      await this.props.returnShipmentRates(this.props.orderId, datePickUp.toISOString())
    } catch (e) {
      console.error(e)
    } finally {
    }
  }

  render() {
    const {
      intl: { formatMessage },
      orderId,
      isSending,
      order,
      shippingQuotesAreFetching,
      shippingQuotes
    } = this.props

    console.log('THIS.PROPS====================================')
    console.log(this.props)
    console.log('====================================')

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
                  let { touched, validateForm, resetForm, values } = formikProps
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <DateInput
                              inputProps={{
                                fluid: true,
                                placeholder: formatMessage({ id: 'global.selectDate', defaultMessage: 'Select Date' }),
                                onChange: (event, val) => this.onDateChange(event, val),
                                'data-test': 'return_shipping_pickup_date'
                              }}
                              label={
                                <FormattedMessage
                                  id='order.return.pickupDate'
                                  defaultMessage='Preferred pick-up date:'
                                />
                              }
                              name='pickupDate'
                            />
                          </Grid.Column>
                        </Grid.Row>

                        {true ? (
                          <>
                            <GridRow>
                              <GridColumn computer={16}>
                                <FormattedMessage
                                  id='order.weightLimitExceeded'
                                  defaultMessage={`Your order weight exceeds weight limit for automatic shipping quotes. Your shipping quote need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                                />
                              </GridColumn>
                            </GridRow>
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Button
                                  type='button'
                                  fluid
                                  onClick={() => this.requestManualShippingQuote(values.pickupDate)}>
                                  <FormattedMessage
                                    id='cart.requestShippingQuote'
                                    defaultMessage='Request Shipping Quote'
                                    tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                            </Grid.Row>
                            <GridRow>
                              <GridColumn computer={16}>
                                <FormattedMessage
                                  id='order.quoteReceived'
                                  defaultMessage='If you already received the shipping quote and agree, please type in the provided Quote Id and continue with shipping order.'
                                />
                              </GridColumn>
                            </GridRow>
                            <Grid.Row>
                              <GridColumn computer={16}>
                                <Input
                                  name='shipmentQuoteId'
                                  label={formatMessage({
                                    id: 'cart.shipmentQuote',
                                    defaultMessage: 'Shipment Quote'
                                  })}
                                />
                              </GridColumn>
                            </Grid.Row>
                          </>
                        ) : (
                          <Grid.Row>
                            <Grid.Column width={16}>
                              <ShippingQuote
                                currency={currency}
                                selectedShippingQuote={{ index: this.state.selectedShippingQuote }}
                                handleQuoteSelect={index => this.setState({ selectedShippingQuote: index })}
                                selectedAddress={1}
                                shippingQuotes={shippingQuotes}
                                shippingQuotesAreFetching={shippingQuotesAreFetching}
                              />
                            </Grid.Column>
                          </Grid.Row>
                        )}
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <TextArea
                              name='pickupRemarks'
                              label={formatMessage({
                                id: 'order.return.EnterPickupRemarks',
                                defaultMessage: 'Enter pickup remarks:'
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <TextArea
                              name='deliveryRemarks'
                              label={formatMessage({
                                id: 'order.return.EnterDeliveryRemarks',
                                defaultMessage: 'Enter delivery remarks:'
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
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
