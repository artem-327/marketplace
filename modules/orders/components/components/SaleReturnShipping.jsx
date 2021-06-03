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
import moment from 'moment'
import { AlertCircle } from 'react-feather'
// Components
import ShippingQuote from '../../../purchase-order/components/ShippingQuote'
import FreightLabel from '../../../../components/freight'
import { DateInput } from '../../../../components/custom-formik'
// Services
import { currency } from '../../../../constants/index'
import '../../../purchase-order/styles/PurchaseOrder.scss'
import { getSafe } from '../../../../utils/functions'
import { submitHandler, onDateChange, requestManualShippingQuote, getInitialFormValues, validationSchema } from './SaleReturnShipping.services'
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
              initialValues={getInitialFormValues(props)}
              onSubmit={(values, actions) => submitHandler(values, actions, props, state)}
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
                              onChange: async (event, val) => await onDateChange(event, val, errors, props, state, setState),
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
                              <CustomButton type='button' fluid onClick={() => requestManualShippingQuote(props)}>
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
