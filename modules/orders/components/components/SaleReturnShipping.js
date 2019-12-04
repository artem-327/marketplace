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
  componentWillMount = async () => {
    await this.props.returnShipmentRates()
  }

  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager } = this.props
    console.log('====================================')
    console.log(values)
    console.log('====================================')

    try {
      await this.props.returnShipmentOrder(orderId)
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

  renderFreightSelection(formikProps) {
    let { cart, shippingQuotes, shippingQuotesAreFetching, shipping, manualShipmentPending } = this.props

    let weightLimitStr = cart && cart.weightLimit ? `of ${cart.weightLimit} lbs` : ''

    return (
      <Segment>
        <Grid className='bottom-padded'>
          <GridRow className='header'>
            <GridColumn>
              <Header as='h4'>
                <FormattedMessage id='cart.2freightSelection' defaultMessage='2. Freight Selection' />
              </Header>
            </GridColumn>
          </GridRow>
          {cart && !cart.weightLimitExceed ? (
            <ShippingQuote
              currency={currency}
              selectedShippingQuote={cart.selectedShipping}
              handleQuoteSelect={this.handleQuoteSelect}
              selectedAddress={shipping.selectedAddress}
              shippingQuotes={shippingQuotes}
              shippingQuotesAreFetching={shippingQuotesAreFetching}
            />
          ) : (
            shipping &&
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
          {cart && cart.weightLimitExceed && shipping && shipping.selectedAddress && (
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

          {shippingQuotes &&
            shippingQuotes.length === 0 &&
            shipping &&
            shipping.selectedAddress &&
            !shippingQuotesAreFetching &&
            cart &&
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
          {shipping &&
            shipping.selectedAddress &&
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

  renderShipingQuotes(setFieldTouched) {
    const { loading } = this.props

    return (
      <Segment basic style={{ padding: 0 }} loading={loading}>
        <Table basic='very'>
          <Table.Header>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.vendor' defaultMessage='Vendor'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.Etd' defaultMessage='ETD'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.serviceType' defaultMessage='Service Type'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.fobPriceLb' defaultMessage='FOB Price/lb'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.freightLb' defaultMessage='Freight/lb'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.totalPriceLb' defaultMessage='Total Price/lb'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='shippingQuote.totalFreight' defaultMessage='Total Freight'>
                {text => text}
              </FormattedMessage>
            </Table.HeaderCell>
          </Table.Header>
          <Table.Body>
            {this.props.quotes &&
              this.props.quotes.map((sQuote, i) => {
                let now = moment()
                let deliveryDate = sQuote.shipmentRate.estimatedDeliveryDate
                let etd = now.diff(deliveryDate, 'days') * -1 + 1

                return (
                  <Table.Row key={i}>
                    <Table.Cell>
                      <Checkbox
                        radio
                        checked={this.state.selectedIndex === i}
                        onChange={() => this.handleQuoteSelect(i, sQuote, setFieldTouched)}
                        value={i}
                        data-test={`ShippingQuotes_row_${i}_chckb`}
                      />
                    </Table.Cell>
                    <Table.Cell>{sQuote.shipmentRate.carrierName}</Table.Cell>
                    <Table.Cell>{etd + (etd == 1 ? ' Day' : ' Days')}</Table.Cell>
                    <Table.Cell>{sQuote.shipmentRate.serviceType}</Table.Cell>
                    <Table.Cell>
                      <FormattedNumber
                        style='currency'
                        currency={currency}
                        value={getSafe(() => sQuote.shipmentRate.fobPricePerLb, 0)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <FormattedNumber
                        style='currency'
                        currency={currency}
                        value={getSafe(() => sQuote.shipmentRate.freightPricePerLb, 0)}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <FormattedNumber
                        style='currency'
                        currency={currency}
                        value={getSafe(() => sQuote.shipmentRate.totalPricePerLb, 0)}
                      />
                    </Table.Cell>
                    <Table.Cell className='a-right'>
                      <FormattedNumber
                        style='currency'
                        currency={currency}
                        value={getSafe(() => sQuote.shipmentRate.estimatedPrice, 0)}
                      />
                    </Table.Cell>
                  </Table.Row>
                )
              })}
          </Table.Body>
        </Table>
        {this.props.quotes && this.props.quotes.length === 0 && !loading && (
          <CustomContainer className='dx-g-bs4-fixed-block'>
            <big className='text-muted'>
              <FormattedMessage
                id='global.noShippingOptions'
                defaultMessage='No shipping options available based on parameters provided.'
              />
            </big>
          </CustomContainer>
        )}
      </Segment>
    )
  }

  render() {
    const {
      intl: { formatMessage },
      isSending
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

                            {this.renderShipingQuotes(formikProps.setFieldTouched)}
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
                            {this.renderFreightSelection(formikProps)}
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
