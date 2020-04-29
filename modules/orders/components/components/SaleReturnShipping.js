import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
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
  Table,
  Message
} from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import moment from 'moment'
//Components
import { errorMessages } from '~/constants/yupValidation'
import { DateInput } from '~/components/custom-formik'
import { currency } from '~/constants/index'
import ShippingQuote from '~/modules/purchase-order/components/ShippingQuote'
import '~/modules/purchase-order/styles/PurchaseOrder.scss'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { getSafe } from '~/utils/functions'
import FreightLabel from '~/components/freight'
//Actions
import * as Actions from '../../actions'
//Styled
import { CustomMessage } from '~/modules/cart/components/StyledComponents'
import styled from 'styled-components'

const FREIGHT_TYPES = {
  ECHO: 'ECHO_FREIGHT',
  OWN: 'OWN_FREIGHT'
}

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`
class SaleReturnShipping extends React.Component {
  state = {
    selectedShippingQuote: 0,
    shipmentQuoteId: ''
  }

  componentDidMount() {
    if (!this.props.order.cfWeightExceeded) {
      let pickupDate = moment().add(1, 'minutes').format()
      this.props.getReturnShipmentRates(this.props.orderId, pickupDate)
    }
  }
  submitHandler = async (values, actions) => {
    const { closePopup, order, orderId, shippingQuotes } = this.props

    let formValues = {
      quoteId: (order.cfWeightExceeded || !getSafe(() => shippingQuotes.rates.length, false)
        ? values.shipmentQuoteId
        : getSafe(() => shippingQuotes.rates[this.state.selectedShippingQuote].quoteId, '')
      ).trim(),
      pickupRemarks: values.pickupRemarks.trim(),
      deliveryRemarks: values.deliveryRemarks.trim(),
      shipperRefNo: values.shipperRefNo.trim(),
      freightType: values.freightType
    }

    try {
      await this.props.returnShipmentOrder(orderId, formValues)
      this.props.getSaleOrder(orderId)
      closePopup()
    } catch (e) {
      console.error(e.response)
    } finally {
      actions.setSubmitting(false)
    }
  }

  onDateChange = async (event, { name, value }) => {
    let pickupDate = moment(getStringISODate(value)) // Value is date only (it means time = 00:00:00)
    if (pickupDate.isBefore(moment().add(1, 'minutes'))) {
      // if current date (today) is selected the pickupDate (datetime) is in past
      pickupDate = moment().add(1, 'minutes') // BE needs to have pickupDate always in future
    }
    pickupDate = pickupDate.format()

    if (!this.props.order.cfWeightExceeded) {
      try {
        await this.props.getReturnShipmentRates(this.props.order.id, pickupDate)
      } catch {
      } finally {
      }
      this.setState({ selectedShippingQuote: 0 })
    }
  }

  requestManualShippingQuote = async () => {
    const { order } = this.props

    try {
      //orderId, countryId, zip
      await this.props.getManualShippingQuote(order.id, {
        destinationCountryId: order.returnAddressCountryReference.id,
        destinationZIP: order.returnAddressZip
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
      shipperRefNo: '',
      freightType: FREIGHT_TYPES.ECHO
    }

    if (initialValues.pickupDate && moment(initialValues.pickupDate).isAfter(moment()))
      initialValues.pickupDate = moment(initialValues.pickupDate).format(getLocaleDateFormat())
    else initialValues.pickupDate = moment().format(getLocaleDateFormat())

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

    const manualShipmentQuoteId =
      getSafe(() => order.cfWeightExceeded, false) || getSafe(() => !shippingQuotes.rates.length, false)

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closePopup()} open={true} size='small'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.returnShippingSale' defaultMessage='ORDER RETURN SHIPPING' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={this.getInitialFormValues()}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {formikProps => {
                  let { touched, validateForm, resetForm, values, setFieldValue } = formikProps
                  const echoFreight = values.freightType === FREIGHT_TYPES.ECHO
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <DateInput
                              inputProps={{
                                minDate: moment(),
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
                          <>
                            <FreightLabel echoFreight={echoFreight} setFieldValue={setFieldValue} />
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
                          </>
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
    shippingQuotes: orders.returnShipmentRates
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(SaleReturnShipping))
