import { useEffect, useState } from 'react'
import { Modal, Button, Grid, Dimmer, Loader, GridColumn, GridRow } from 'semantic-ui-react'
import { Form, Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import * as Yup from 'yup'
import { AlertCircle } from 'react-feather'
import { debounce } from 'lodash'
// Components
import { DateInput } from '../../../../components/custom-formik'
import ShippingQuote from '../../../purchase-order/components/ShippingQuote'
import FreightLabel from '../../../../components/freight'
// Services
import { getSafe } from '../../../../utils/functions'
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '../../../../components/date-format'
// Constants
import { currency } from '../../../../constants/index'
import { FREIGHT_TYPES } from '../../constants'
// Styled
import { 
  ModalBody, 
  CustomButton, 
  CustomGrid, 
  Rectangle, 
  CustomDivTitle, 
  CustomDivContent, 
  CustomDivInTitle, 
  CustomSubmitButton, 
  Line, 
  GridRowLine, 
  GridColumnText
} from '../../styles'

const PurchaseOrderShipping = props => {
  const [state, setState] = useState({
    selectedShippingQuote: '',
    shipmentQuoteId: ''
  })

  let errors = {}

  useEffect(() => {
    if (!props.order.cfWeightExceeded) {
      let pickupDate = moment().add(1, 'minutes').format()
      props.getShippingQuotes(props.orderId, pickupDate)
    }
  }, [])

  const submitHandler = async (values, actions) => {
    const { closePopup, order, orderId, shippingQuotes } = props

    try {
      let formValues = {
        pickupRemarks: values.pickupRemarks.trim(),
        deliveryRemarks: values.deliveryRemarks.trim(),
        shipperRefNo: values.shipperRefNo.trim(),
        freightType: values.freightType
      }

      values.freightType === FREIGHT_TYPES.ECHO
        ? (formValues.quoteId = (order.cfWeightExceeded ||
          !getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
            ? values.shipmentQuoteId
            : getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
          ).trim())
        : null,
        await props.purchaseShipmentOrder(orderId, formValues)
      props.getPurchaseOrder(orderId)
      closePopup()
    } catch (e) {
      console.error(e)
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
        await props.getShippingQuotes(props.order.id, pickupDate)
      } catch {
      } finally {
      }
    }
  }, 250)

  const requestManualShippingQuote = async () => {
    const { order } = props

    try {
      await props.getManualShippingQuote(order.id, {
        destinationCountryId: order.shippingAddressCountryReference.id,
        destinationZIP: order.shippingAddressZip
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
    order,
    isSending,
    shippingQuotesAreFetching,
    shippingQuotes,
    applicationName
  } = props

  const manualShipmentQuoteId = order.cfWeightExceeded || getSafe(() => !shippingQuotes.rates.length, false)

  return (
    <>
      <Modal closeIcon onClose={() => props.closePopup()} open={true} size='small'>
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
              validationSchema={validationSchema()}
              enableReinitialize
              validateOnChange={true}
              initialValues={getInitialFormValues()}
              onSubmit={submitHandler}
              className='flex stretched'
              style={{ padding: '0' }}>
              {formikProps => {
                let { touched, validateForm, resetForm, values, setFieldValue, errors, handleChange } = formikProps
                const echoFreight = values.freightType === FREIGHT_TYPES.ECHO
                errors = errors
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
                                await onDateChange(event, val)
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
                              selectionDisabled={!echoFreight}
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
                              onChange: () => setState({ ...state, selectedShippingQuote: '' }),
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

export default injectIntl(PurchaseOrderShipping)
