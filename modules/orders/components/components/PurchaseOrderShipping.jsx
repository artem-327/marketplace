import { useEffect, useState } from 'react'
import { Form, Modal, Grid, Dimmer, Loader, GridColumn, GridRow } from 'semantic-ui-react'
import { Input, TextArea, Button } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { AlertCircle, ChevronDown, ChevronUp } from 'react-feather'
import { debounce } from 'lodash'
import PropTypes from 'prop-types'
// Components
import { DateInput } from '../../../../components/custom-formik'
import ShippingQuote from '../../../purchase-order/components/ShippingQuote'
import FreightLabel from '../../../../components/freight'
import ErrorFocus from '../../../../components/error-focus'
// Services
import { getSafe } from '../../../../utils/functions'
import { getStringISODate } from '../../../../components/date-format'
import { submitHandler, requestManualShippingQuote, getInitialFormValues, validationSchema } from './PurchaseOrderShipping.services'
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
  GridColumnText,
  DivShippingQuoteContainer,
  DivHeaderRow
} from '../../styles'

const PurchaseOrderShipping = props => {
  const [state, setState] = useState({
    selectedShippingQuote: '',
    shipmentQuoteId: '',
    isOpenOptionalInformation: false
  })

  let errors = {}

  useEffect(() => {
    if (!props.order.cfWeightExceeded) {
      let pickupDate = moment().endOf('day').format()
      const shipDate = props.order?.shipDate
      if (shipDate) {
        if (moment(shipDate).endOf('day').isSameOrAfter(moment())) {
          pickupDate = moment(shipDate).endOf('day').format()
        }
      }
      props.getShippingQuotes(props.orderId, pickupDate)
    }
  }, [])

  const onDateChange = debounce(async (event, { name, value }) => {
    if (!value || errors.pickupDate) return
    let pickupDate = moment(getStringISODate(value)).endOf('day') // Value is date only (it means time = 00:00:00)
    pickupDate = pickupDate.format()

    if (!props.order.cfWeightExceeded) {
      try {
        await props.getShippingQuotes(props.order.id, pickupDate)
      } catch {
      } finally {
      }
    }
  }, 250)
  
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
    <Formik
      validationSchema={validationSchema()}
      enableReinitialize
      validateOnChange={true}
      initialValues={getInitialFormValues(props)}
      onSubmit={(values, actions) => submitHandler(values, actions, props, state)}
      className='flex stretched'
      style={{ padding: '0' }}
    >
      {formikProps => {
        let { values, setFieldValue, errors, handleSubmit, isSubmitting } = formikProps
        const echoFreight = values.freightType === FREIGHT_TYPES.ECHO
        errors = errors
        return (
          <Modal closeIcon onClose={() => props.closePopup()} open={true} size='small'>
            <Dimmer
              active={isSubmitting || isSending || (shippingQuotesAreFetching && getSafe(() => !shippingQuotes.rates.length, false))}
              inverted>
              <Loader />
            </Dimmer>
            <Modal.Header>
              <FormattedMessage id='order.orderShippingCap' defaultMessage='ORDER SHIPPING' />
            </Modal.Header>
            <ModalBody scrolling>
              <Form>
                <CustomGrid>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <DateInput
                        inputProps={{
                          minDate: moment(),
                          fluid: true,
                          clearable: true,
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
                        <DivShippingQuoteContainer>
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
                        </DivShippingQuoteContainer>
                      </Grid.Column>
                    </Grid.Row>
                  )}
                  <Grid.Row>
                    <Grid.Column width={16}>
                      <Line />
                    </Grid.Column>
                  </Grid.Row>
                  <DivHeaderRow
                    style={{ cursor: 'pointer' }}
                    onClick={() => setState({ ...state, isOpenOptionalInformation: !state.isOpenOptionalInformation })}
                    data-test='purchase_order_shipping_optional_information_expand'
                  >
                    <FormattedMessage id='order.iAlreadyHaveQuote' defaultMessage='I already have a Quote' />
                    {state.isOpenOptionalInformation ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </DivHeaderRow>
                  {state.isOpenOptionalInformation && (
                    <>
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
                    </>
                  )}
                </CustomGrid>
                <ErrorFocus />
              </Form>
            </ModalBody>
            <Modal.Actions>
              <Button basic onClick={() => props.closePopup()} data-test='purchase_order_shipping_cancel_button'>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                  {text => text}
                </FormattedMessage>
              </Button>
              <Button.Submit onClick={handleSubmit} data-test='purchase_order_shipping_submit_button'>
                <FormattedMessage id='global.save' defaultMessage='Save' tagName='span'>
                  {text => text}
                </FormattedMessage>
              </Button.Submit>
            </Modal.Actions>
          </Modal>
        )
      }}
    </Formik>
  )
}

PurchaseOrderShipping.propTypes = {
  orderId: PropTypes.number,
  applicationName: PropTypes.string,
  order: PropTypes.object,
  intl: PropTypes.object,
  shippingQuotes: PropTypes.object,
  isSending: PropTypes.bool,
  shippingQuotesAreFetching: PropTypes.bool,
  getShippingQuotes: PropTypes.func,
  closePopup: PropTypes.func,
  purchaseShipmentOrder: PropTypes.func,
  getPurchaseOrder: PropTypes.func,
  getManualShippingQuote: PropTypes.func
}

PurchaseOrderShipping.defaultValues = {
  orderId: 0,
  applicationName: '',
  order: {},
  intl: {},
  shippingQuotes: {},
  isSending: false,
  shippingQuotesAreFetching: false,
  getShippingQuotes: () => {},
  closePopup: () => {},
  purchaseShipmentOrder: () => {},
  getPurchaseOrder: () => {},
  getManualShippingQuote: () => {}
}

export default injectIntl(PurchaseOrderShipping)
