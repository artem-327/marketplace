import { useEffect, useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  Modal,
  Button,
  Grid,
  Dimmer,
  Loader,
  GridColumn,
  GridRow,
} from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import moment from 'moment'
import { AlertCircle } from 'react-feather'
import { debounce } from 'lodash'
// Components
import ShippingQuote from '../../../purchase-order/components/ShippingQuote'
import FreightLabel from '../../../../components/freight'
import { DateInput } from '../../../../components/custom-formik'
// Services
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import { currency } from '../../../../constants/index'
import '../../../purchase-order/styles/PurchaseOrder.scss'
import { getLocaleDateFormat, getStringISODate } from '../../../../components/date-format'
import { getSafe } from '../../../../utils/functions'
// Constants
import { FREIGHT_TYPES } from '../../constants'
// Styles
import {
  ModalBody,
  CustomGrid,
  CustomButton,
  Rectangle,
  CustomDivTitle,
  CustomDivContent,
  CustomDivInTitle,
  CustomSubmitButton,
  Line,
  GridRowLine,
  GridColumnText
} from '../../styles'


const SaleReturnShipping = props => {
  const [state, setState] = useState({
    selectedShippingQuote: 0,
    shipmentQuoteId: ''
  })

  let errors

  useEffect(() => {
    if (!props.order.cfWeightExceeded) {
      let pickupDate = moment().add(1, 'minutes').format()
      props.getReturnShipmentRates(props.orderId, pickupDate)
    }
  }, [])

  const submitHandler = async (values, actions) => {
    const { closePopup, order, orderId, shippingQuotes } = props

    let formValues = {
      pickupRemarks: values.pickupRemarks.trim(),
      deliveryRemarks: values.deliveryRemarks.trim(),
      shipperRefNo: values.shipperRefNo.trim(),
      freightType: values.freightType
    }

    try {
      values.freightType === FREIGHT_TYPES.ECHO
        ? (formValues.quoteId = (order.cfWeightExceeded ||
          !getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
            ? values.shipmentQuoteId
            : getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
          ).trim())
        : null,
        await props.returnShipmentOrder(orderId, formValues)
      props.getSaleOrder(orderId)
      closePopup()
    } catch (e) {
      console.error(e.response)
    } finally {
      actions.setSubmitting(false)
    }
  }

  const onDateChange = debounce(async (event, { name, value }) => {
    if (!value || errors.pickupDate) return

    let pickupDate = moment(getStringISODate(value)) // Value is date only (it means time = 00:00:00)
    if (pickupDate.isBefore(moment().add(1, 'minutes'))) {
      // if current date (today) is selected the pickupDate (datetime) is in past
      pickupDate = moment().add(1, 'minutes') // BE needs to have pickupDate always in future
    }
    pickupDate = pickupDate.format()

    if (!props.order.cfWeightExceeded) {
      try {
        await props.getReturnShipmentRates(props.order.id, pickupDate)
      } catch {
      } finally {
      }
      setState({ ...state, selectedShippingQuote: 0 })
    }
  }, 250)

  const requestManualShippingQuote = async () => {
    const { order } = props

    try {
      //orderId, countryId, zip
      await props.getManualShippingQuote(order.id, {
        destinationCountryId: order.returnAddressCountryReference.id,
        destinationZIP: order.returnAddressZip
      })
    } catch {
    } finally {
    }
  }

  const getInitialFormValues = () => {
    const { order } = props

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

  const validationSchema = () =>
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

  
  const {
    intl: { formatMessage },
    orderId,
    isSending,
    order,
    shippingQuotesAreFetching,
    shippingQuotes,
    applicationName
  } = props

  const manualShipmentQuoteId =
    getSafe(() => order.cfWeightExceeded, false) || getSafe(() => !shippingQuotes.rates.length, false)

  return (
    <>
      <Modal closeIcon onClose={() => props.closePopup()} open={true} size='small'>
        <Dimmer active={isSending} inverted>
          <Loader />
        </Dimmer>
        <Modal.Header>
          <FormattedMessage id='order.returnShippingSale' defaultMessage='ORDER RETURN SHIPPING' />
        </Modal.Header>
        <ModalBody>
          <Modal.Description>
            <Form
              validationSchema={validationSchema()}
              enableReinitialize
              validateOnChange={true}
              initialValues={getInitialFormValues()}
              onSubmit={submitHandler}
              className='flex stretched'
              style={{ padding: '0' }}>
              {formikProps => {
                let { touched, validateForm, resetForm, values, setFieldValue, errors } = formikProps
                const echoFreight = values.freightType === FREIGHT_TYPES.ECHO
                errors = errors
                return (
                  <>
                    <CustomGrid>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <DateInput
                            inputProps={{
                              // minDate: moment(),
                              fluid: true,
                              placeholder: formatMessage({ id: 'global.selectDate', defaultMessage: 'Select Date' }),
                              onChange: async (event, val) => await onDateChange(event, val),
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
                      <FreightLabel
                        echoFreight={echoFreight}
                        setFieldValue={(fieldName, value) => {
                          setState({ ...state, selectedShippingQuote: null })
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
                                  defaultMessage={`Your order weight exceeds weight limit for automatic shipping quotes. Your shipping quote need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by {companyName} team, who will send you an email with Quote Id.`}
                                  values={{
                                    companyName: applicationName
                                  }}
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
                                      defaultMessage={`It was not possible to retrieve any automated shipping quotes for you order. Your shipping quote might need to be processed manually. If you wish to continue, click the 'Request Shipping Quote' button. Information about your order will be received by {companyName} team, who will send you an email with Quote Id.`}
                                      values={{
                                        companyName: applicationName
                                      }}
                                    />
                                  </CustomDivContent>
                                </Rectangle>
                              </GridColumn>
                            </GridRow>
                          )}
                          <Grid.Row>
                            <Grid.Column width={6}>
                              <CustomButton type='button' fluid onClick={() => requestManualShippingQuote()}>
                                <FormattedMessage
                                  id='cart.requestShippingQuote'
                                  defaultMessage='Request Shipping Quote'
                                  tagName='span' />
                              </CustomButton>
                            </Grid.Column>
                          </Grid.Row>
                        </>
                      ) : (
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <ShippingQuote
                              currency={currency}
                              selectedShippingQuote={{ index: state.selectedShippingQuote }}
                              handleQuoteSelect={index => {
                                setState({ ...state, selectedShippingQuote: index })
                                setFieldValue('shipmentQuoteId', '')
                              }}
                              selectedAddress={1}
                              shippingQuotes={shippingQuotes}
                              shippingQuotesAreFetching={shippingQuotesAreFetching}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      )}
                      <GridRow>
                        <GridColumn width={16}>
                          <Line />
                        </GridColumn>
                      </GridRow>
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
                              onChange: () => setState({ ...state, selectedShippingQuote: null }),
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
                            name='pickupRemarks'
                            label={formatMessage({
                              id: 'order.pickupRemarks',
                              defaultMessage: 'Pick-up remarks'
                            })}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={16}>
                          <TextArea
                            name='deliveryRemarks'
                            label={formatMessage({
                              id: 'order.deliveryRemarks',
                              defaultMessage: 'Delivery remarks'
                            })}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input
                            name='shipperRefNo'
                            label={formatMessage({
                              id: 'order.shipperRefNo',
                              defaultMessage: 'Shipper reference number'
                            })}
                          />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row></Grid.Row>
                      <GridRowLine>
                        <Grid.Column width={10}></Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <Button basic fluid onClick={() => props.closePopup()}>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span' />
                          </Button>
                        </Grid.Column>
                        <Grid.Column floated='right' width={3}>
                          <CustomSubmitButton primary fluid type='submit'>
                            <FormattedMessage id='global.save' defaultMessage='Save' tagName='span' />
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

export default injectIntl(SaleReturnShipping)
