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
import * as Yup from 'yup'
import moment from 'moment'

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
class SaleReturnShipping extends React.Component {
  state = {
    selectedShippingQuote: 0,
    shipmentQuoteId: ''
  }

  validationSchema = manualShipmentQuoteId =>
    Yup.lazy(values =>
      Yup.object().shape({
        shipmentQuoteId: manualShipmentQuoteId
          ? Yup.string()
              .trim()
              .required(errorMessages.requiredMessage)
          : Yup.string().notRequired()
      })
    )

  componentDidMount() {
    if (!this.props.order.cfWeightExceeded) {
      let pickupDate = moment()
        .add(1, 'minutes')
        .toISOString()
      this.props.getShippingQuotes(this.props.orderId, pickupDate) // ! ! Not working properly yet
      //this.props.getShippingQuotes(this.props.orderId, null)
    }
  }
  submitHandler = async (values, actions) => {
    const { closePopup, order, orderId, toastManager, shippingQuotes } = this.props

    let formValues = {
      quoteId: (order.cfWeightExceeded || !shippingQuotes.length
        ? values.shipmentQuoteId
        : shippingQuotes[this.state.selectedShippingQuote].quoteId
      ).trim(),
      pickupRemarks: values.pickupRemarks.trim(),
      deliveryRemarks: values.deliveryRemarks.trim(),
      shipperRefNo: values.shipperRefNo.trim()
    }

    try {
      //Does not work yet, because does not work endpoint manual-quote and shipment-rates
      await this.props.returnShipmentOrder(orderId, formValues)
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
      console.error(e.response)
    } finally {
      actions.setSubmitting(false)
    }
  }

  onDateChange = async (event, { name, value }) => {
    const pickupDate = moment(value)
    if (!this.props.order.cfWeightExceeded) {
      try {
        // ! ! TODO: date not working in getShippingQuotes?
        await this.props.getShippingQuotes(this.props.order.id, pickupDate.toISOString())
      } catch {
      } finally {
      }
    }
  }

  requestManualShippingQuote = async () => {
    const { order } = this.props

    try {
      //orderId, countryId, zip
      await this.props.getManualShippingQuote(order.id, {
        destinationCountryId: 1,
        destinationZIP: order.shippingAddressZip
      })
    } catch {
    } finally {
    }
  }

  getInitialFormValues = () => {
    const { order } = this.props

    let initialValues = {
      pickupDate: getSafe(() => order.shipDate, ''),
      shipmentQuoteId: '',
      pickupRemarks: '',
      deliveryRemarks: '',
      shipperRefNo: ''
    }

    if (initialValues.pickupDate && moment(initialValues.pickupDate).isAfter(moment()))
      initialValues.pickupDate = moment(initialValues.pickupDate).format('YYYY-MM-DD')
    else initialValues.pickupDate = moment().format('YYYY-MM-DD')

    return initialValues
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

    const manualShipmentQuoteId = (order && order.cfWeightExceeded) || (shippingQuotes && !shippingQuotes.length)

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
                initialValues={this.getInitialFormValues()}
                validationSchema={this.validationSchema(manualShipmentQuoteId)}
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
                                minDate: moment(),
                                fluid: true,
                                clearable: true,
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

                        {manualShipmentQuoteId ? (
                          <>
                            {order.cfWeightExceeded ? (
                              <GridRow>
                                <GridColumn computer={16}>
                                  <FormattedMessage
                                    id='order.weightLimitExceeded'
                                    defaultMessage={`Your order weight exceeds weight limit for automatic shipping quotes. Your shipping quote need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                                  />
                                </GridColumn>
                              </GridRow>
                            ) : (
                              <GridRow>
                                <GridColumn computer={16}>
                                  <FormattedMessage
                                    id='cart.noShippingQuotes.processManually'
                                    defaultMessage={`It was not possible to retrieve any automated shipping quotes for you order. Your shipping quote might need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Echo team, who will send you an email with Quote Id.`}
                                  />
                                </GridColumn>
                              </GridRow>
                            )}
                            <Grid.Row>
                              <Grid.Column width={8}>
                                <Button type='button' fluid onClick={() => this.requestManualShippingQuote()}>
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
                                id: 'order.pickupRemarks',
                                defaultMessage: 'Pick-up remarks'
                              })}
                            />
                            <TextArea
                              name='deliveryRemarks'
                              label={formatMessage({
                                id: 'order.deliveryRemarks',
                                defaultMessage: 'Delivery remarks'
                              })}
                            />
                            <Input
                              name='shipperRefNo'
                              label={formatMessage({
                                id: 'order.shipperRefNo',
                                defaultMessage: 'Shipper reference number'
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
  const { orders } = state
  const { detail } = orders

  return {
    order: detail,
    orderId: detail.id,
    isSending: orders.isSending,
    shippingQuotesAreFetching: orders.shippingQuotesAreFetching,
    shippingQuotes: orders.shippingQuotes
    /*
    shippingQuotes: [
      // ! ! temporary
      {
        carrierName: 'Carrier name 1',
        estimatedDeliveryDate: '2019-12-04T04:11:50.266Z',
        estimatedPrice: 100,
        fobPricePerLb: 10,
        freightPricePerLb: 51,
        quoteId: 'Quote Id String 1',
        serviceType: 'Service Type 1',
        totalPricePerLb: 11
      },
      {
        carrierName: 'Carrier name 2',
        estimatedDeliveryDate: '2019-12-03T04:11:50.266Z',
        estimatedPrice: 200,
        fobPricePerLb: 20,
        freightPricePerLb: 52,
        quoteId: 'Quote Id String 2',
        serviceType: 'Service Type 2',
        totalPricePerLb: 22
      }
    ]*/
  }
}

export default connect(mapStateToProps, { ...Actions })(withToastManager(injectIntl(SaleReturnShipping)))
