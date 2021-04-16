import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, ModalContent, Button, Grid, Dimmer, Loader, GridColumn, GridRow } from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import * as Yup from 'yup'
import { AlertCircle } from 'react-feather'
import { debounce } from 'lodash'

//Actions
import * as Actions from '../../actions'
//Components
import { getSafe } from '~/utils/functions'
import { errorMessages, dateValidation } from '~/constants/yupValidation'
import { DateInput } from '~/components/custom-formik'
import { currency } from '~/constants/index'
import ShippingQuote from '~/modules/purchase-order/components/ShippingQuote'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import FreightLabel from '~/components/freight'

//Styled
import styled from 'styled-components'

const FREIGHT_TYPES = {
  ECHO: 'ECHO_FREIGHT',
  OWN: 'OWN_FREIGHT'
}

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const CustomButton = styled(Button)`
  background-color: #ffffff !important;
  border: solid 1px #dee2e6 !important;
`

const CustomGrid = styled(Grid)`
  input,
  textarea {
    background-color: #fdfdfd !important;
  }
`

const Rectangle = styled.div`
  border-radius: 4px;
  border: solid 1px orange;
  background-color: #ffffff;
  margin-bottom: 15px;
  align-items: center;
  display: block;
  padding: 10px;
  font-size: 14px;
`

const CustomDivTitle = styled.div`
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #0d0d0d;
  display: flex;
`

const CustomDivContent = styled.div`
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  color: #848893;
  padding: 4px 30px;
`

const CustomDivInTitle = styled.div`
  padding-left: 10px;
`

const CustomSubmitButton = styled(Button)`
  background-color: #2599d5 !important;
`

const Line = styled.div`
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`

const GridRowLine = styled(Grid.Row)`
  border-top: 1px solid rgba(34, 36, 38, 0.15);
`

const GridColumnText = styled(GridColumn)`
  font-weight: bold !important;
`

class PurchaseOrderShipping extends Component {
  state = {
    selectedShippingQuote: '',
    shipmentQuoteId: ''
  }

  componentDidMount() {
    if (!this.props.order.cfWeightExceeded) {
      let pickupDate = moment().add(1, 'minutes').format()
      this.props.getShippingQuotes(this.props.orderId, pickupDate)
    }
  }

  submitHandler = async (values, actions) => {
    const { closePopup, order, orderId, shippingQuotes } = this.props

    try {
      let formValues = {
        pickupRemarks: values.pickupRemarks.trim(),
        deliveryRemarks: values.deliveryRemarks.trim(),
        shipperRefNo: values.shipperRefNo.trim(),
        freightType: values.freightType
      }

      values.freightType === FREIGHT_TYPES.ECHO
        ? (formValues.quoteId = (order.cfWeightExceeded ||
          !getSafe(() => shippingQuotes.rates[this.state.selectedShippingQuote].quoteId, '')
            ? values.shipmentQuoteId
            : getSafe(() => shippingQuotes.rates[this.state.selectedShippingQuote].quoteId, '')
          ).trim())
        : null,
        await this.props.purchaseShipmentOrder(orderId, formValues)
      this.props.getPurchaseOrder(orderId)
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  onDateChange = debounce(async (event, { name, value }) => {
    if (!value || this.errors.pickupDate) return
    let pickupDate = moment(getStringISODate(value)) // Value is date only (it means time = 00:00:00)
    if (pickupDate.isBefore(moment().add(1, 'minutes'))) {
      // if current date (today) is selected the pickupDate (datetime) is in past
      pickupDate = moment().add(1, 'minutes') // BE needs to have pickupDate always in future
    }
    pickupDate = pickupDate.format()

    if (!this.props.order.cfWeightExceeded) {
      try {
        await this.props.getShippingQuotes(this.props.order.id, pickupDate)
      } catch {
      } finally {
      }
    }
  }, 250)

  requestManualShippingQuote = async () => {
    const { order } = this.props

    try {
      await this.props.getManualShippingQuote(order.id, {
        destinationCountryId: order.shippingAddressCountryReference.id,
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
      shipperRefNo: '',
      freightType: FREIGHT_TYPES.ECHO
    }

    if (initialValues.pickupDate && moment(initialValues.pickupDate).isAfter(moment()))
      initialValues.pickupDate = moment(initialValues.pickupDate).format(getLocaleDateFormat())
    else initialValues.pickupDate = moment().format(getLocaleDateFormat())

    return initialValues
  }

  validationSchema = () =>
    Yup.lazy(values => {
      return Yup.object().shape({
        pickupDate: dateValidation(false).concat(
          Yup.string().test(
            'min-date',
            errorMessages.mustBeInFuture,
            val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
          )
        )
      })
    })

  render() {
    const {
      intl: { formatMessage },
      orderId,
      order,
      isSending,
      shippingQuotesAreFetching,
      shippingQuotes
    } = this.props

    const manualShipmentQuoteId = order.cfWeightExceeded || getSafe(() => !shippingQuotes.rates.length, false)

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closePopup()} open={true} size='small'>
          <Dimmer
            active={isSending || (shippingQuotesAreFetching && getSafe(() => !shippingQuotes.rates.length, false))}
            inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.orderShippingCap' defaultMessage='ORDER SHIPPING' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                validationSchema={this.validationSchema()}
                enableReinitialize
                validateOnChange={true}
                initialValues={this.getInitialFormValues()}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {formikProps => {
                  let { touched, validateForm, resetForm, values, setFieldValue, errors, handleChange } = formikProps
                  const echoFreight = values.freightType === FREIGHT_TYPES.ECHO
                  this.errors = errors
                  return (
                    <>
                      <CustomGrid>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <DateInput
                              inputProps={{
                                //minDate: moment(),
                                fluid: true,
                                clearable: true,
                                placeholder: formatMessage({ id: 'global.selectDate', defaultMessage: 'Select Date' }),
                                onChange: async (event, val) => {
                                  await this.onDateChange(event, val)
                                }
                              }}
                              label={
                                <FormattedMessage
                                  id='order.preferredPickupDate'
                                  defaultMessage='Preferred pick-up date'
                                />
                              }
                              name='pickupDate'
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <FreightLabel
                          echoFreight={echoFreight}
                          setFieldValue={(fieldName, value) => {
                            this.setState({ selectedShippingQuote: null })
                            setFieldValue(fieldName, value)
                            if (value === 'OWN_FREIGHT') setFieldValue('shipmentQuoteId', '')
                          }}
                        />
                        {manualShipmentQuoteId ? (
                          <>
                            {order.cfWeightExceeded ? (
                              <GridRow>
                                <GridColumn computer={16}>
                                  <FormattedMessage
                                    id='order.weightLimitExceeded'
                                    defaultMessage={`Your order weight exceeds weight limit for automatic shipping quotes. Your shipping quote need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Blue Pallet team, who will send you an email with Quote Id.`}
                                  />
                                </GridColumn>
                              </GridRow>
                            ) : (
                              <GridRow>
                                <GridColumn computer={16}>
                                  <Rectangle>
                                    <CustomDivTitle>
                                      <AlertCircle color='orange' size={18} />
                                      <CustomDivInTitle>
                                        <FormattedMessage
                                          id='cart.noShippingQuotes.processManually.title'
                                          defaultMessage={`We are sorry, but no matching Shipping Quotes were provided by logistics company.`}
                                        />
                                      </CustomDivInTitle>
                                    </CustomDivTitle>
                                    <CustomDivContent>
                                      <FormattedMessage
                                        id='cart.noShippingQuotes.processManually'
                                        defaultMessage={`It was not possible to retrieve any automated shipping quotes for you order. Your shipping quote might need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by Blue Pallet team, who will send you an email with Quote Id.`}
                                      />
                                    </CustomDivContent>
                                  </Rectangle>
                                </GridColumn>
                              </GridRow>
                            )}
                            <Grid.Row>
                              <Grid.Column width={6}>
                                <CustomButton type='button' fluid onClick={() => this.requestManualShippingQuote()}>
                                  <FormattedMessage
                                    id='cart.requestShippingQuote'
                                    defaultMessage='Request Shipping Quote'
                                    tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </CustomButton>
                              </Grid.Column>
                            </Grid.Row>
                          </>
                        ) : (
                          <Grid.Row>
                            <Grid.Column width={16}>
                              <ShippingQuote
                                selectionDisabled={!echoFreight}
                                currency={currency}
                                selectedShippingQuote={{ index: this.state.selectedShippingQuote }}
                                handleQuoteSelect={index => {
                                  this.setState({ selectedShippingQuote: index })
                                  setFieldValue('shipmentQuoteId', '')
                                }}
                                selectedAddress={1}
                                shippingQuotes={shippingQuotes}
                                shippingQuotesAreFetching={shippingQuotesAreFetching}
                              />
                            </Grid.Column>
                          </Grid.Row>
                        )}
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <Line />
                          </Grid.Column>
                        </Grid.Row>
                        <GridRow>
                          <GridColumnText computer={16}>
                            <FormattedMessage
                              id='order.quoteReceived'
                              defaultMessage='If you already received the shipping quote and agree, please type in the provided Quote Id and continue with shipping order.'
                            />
                          </GridColumnText>
                        </GridRow>
                        <Grid.Row>
                          <GridColumn computer={8}>
                            <Input
                              inputProps={{
                                placeholder: formatMessage({
                                  id: 'cart.shipmentQuote.enter',
                                  defaultMessage: 'Enter Shipment Quote'
                                }),
                                onChange: () => this.setState({ selectedShippingQuote: '' }),
                                disabled: values.freightType === 'OWN_FREIGHT'
                              }}
                              name='shipmentQuoteId'
                              label={formatMessage({
                                id: 'cart.shipmentQuote',
                                defaultMessage: 'Shipment Quote'
                              })}
                            />
                          </GridColumn>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <TextArea
                              inputProps={{
                                placeholder: formatMessage({
                                  id: 'order.pickupRemarks.enter',
                                  defaultMessage: 'Enter Pick-up Remarks'
                                })
                              }}
                              name='pickupRemarks'
                              label={formatMessage({
                                id: 'order.pickupRemarks',
                                defaultMessage: 'Pick-up Remarks'
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <TextArea
                              inputProps={{
                                placeholder: formatMessage({
                                  id: 'order.deliveryRemarks.enter',
                                  defaultMessage: 'Enter Delivery Remarks'
                                })
                              }}
                              name='deliveryRemarks'
                              label={formatMessage({
                                id: 'order.deliveryRemarks',
                                defaultMessage: 'Delivery Remarks'
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={8}>
                            <Input
                              inputProps={{
                                placeholder: formatMessage({
                                  id: 'order.shipperRefNo.enter',
                                  defaultMessage: 'Enter Shipper Reference Number'
                                })
                              }}
                              name='shipperRefNo'
                              label={formatMessage({
                                id: 'order.shipperRefNo',
                                defaultMessage: 'Shipper Reference Number'
                              })}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row></Grid.Row>
                        <GridRowLine>
                          <Grid.Column width={10}></Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <Button basic fluid onClick={() => this.props.closePopup()}>
                              <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </Button>
                          </Grid.Column>
                          <Grid.Column floated='right' width={3}>
                            <CustomSubmitButton primary fluid type='submit'>
                              <FormattedMessage id='global.save' defaultMessage='Save' tagName='span'>
                                {text => text}
                              </FormattedMessage>
                            </CustomSubmitButton>
                          </Grid.Column>
                        </GridRowLine>
                      </CustomGrid>
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
    shippingQuotes: getSafe(() => orders.shippingQuotes, {})
    /*
    shippingQuotes: [ // ! ! temporary
      {
        "carrierName": "Carrier name 1",
        "estimatedDeliveryDate": "2019-12-04T04:11:50.266Z",
        "estimatedPrice": 100,
        "fobPricePerLb": 10,
        "freightPricePerLb": 51,
        "quoteId": "Quote Id String 1",
        "serviceType": "Service Type 1",
        "totalPricePerLb": 11
      },
      {
        "carrierName": "Carrier name 2",
        "estimatedDeliveryDate": "2019-12-03T04:11:50.266Z",
        "estimatedPrice": 200,
        "fobPricePerLb": 20,
        "freightPricePerLb": 52,
        "quoteId": "Quote Id String 2",
        "serviceType": "Service Type 2",
        "totalPricePerLb": 22
      }
    ]
    */
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(PurchaseOrderShipping))
