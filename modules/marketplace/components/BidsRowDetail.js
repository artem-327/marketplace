import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Input, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import Router from 'next/router'
import { Form, Dimmer, Loader, Grid, GridRow, GridColumn, List, Radio } from 'semantic-ui-react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import { currency } from '~/constants/index'
import styled from 'styled-components'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty, getSafe, getPricing } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'
import RowDescription from './RowDescription'

import {
  DefaultIcon,
  IconWrapper,
  StyledName,
  NameWrapper,
  HistoryRow,
  HistoryDetailGrid,
  HistoryDetailRow,
  TableSegment,
  StyledList,
  StyledRectangle,
  PriceInput,
  BottomButtons
} from '../constants/layout'
import moment from 'moment'

export const ScrollContent = styled.div`
  margin: -13px -10px;
  padding: 10px 20px 20px 20px;
  max-height: calc(80vh - 180px);
  overflow-y: auto;
`

export const DetailRow = styled.div`
  text-align: left;
  font-size: 14px;
  border: solid 1px #dee2e6;
  border-radius: 3px;
  background-color: #f8f9fb;
`

const FieldRectangle = styled.div`
  padding: 10px 15px;
  border-radius: 3px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.29;
  letter-spacing: normal;
  color: #20273a;

  &.disabled {
    opacity: 0.45;
  }
`

const MessageInputHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const SmallText = styled.div`
  font-size: 12px;
  color: #848893;
  position: relative;
  bottom: -6px;
`

const StyledGrid = styled(Grid)`
  &.ui.grid {
    margin: 0;

    .row {
      margin: 0;
      padding: 7.5px 0;

      .column {
        margin: 0;
        padding: 0 10px;
      }
    }

    .ui.input {
      height: 40px;
    }
  }
`

const formValidation = requiredInputs =>
  Yup.object().shape({
    ...(requiredInputs && {
      pricePerUOM: Yup.string().trim().required(errorMessages.requiredMessage),
      pkgAmount: Yup.number()
        .min(1, errorMessages.minimum(1))
        .required(errorMessages.requiredMessage)
        .test('int', errorMessages.integer, val => {
          return val % 1 === 0
        })
    })
  })

class BidsRowDetail extends React.Component {
  state = {
    initialFormValues: {
      id: '',
      message: '',
      pkgAmount: '',
      pricePerUOM: ''
    },
    detailExpandedIds: [],
    touched: false,
    radioState: ''
  }

  componentDidMount() {
    const { popupValues, initValues } = this.props

    if (initValues && initValues.values && initValues.values.id === popupValues.id) {
      this.setState({
        ...initValues.state,
        initialFormValues: initValues.values,
        touched: false
      })
    } else {
      this.setState({
        initialFormValues: {
          id: popupValues.id,
          message: '',
          pkgAmount: popupValues.cfHistoryLastPkgAmount,
          pricePerUOM: ''
        },
        detailExpandedIds: [],
        touched: false
      })
    }
  }

  componentWillUnmount() {
    if ((this.state.touched || Object.keys(this.formikProps.touched).length) && this.props.onUnmount) {
      this.props.onUnmount({
        values: this.formikProps.values,
        state: this.state
      })
    }
  }

  submitOffer = async ({ values, setSubmitting }) => {
    const { popupValues, onClose, counterOffer, acceptOffer, rejectOffer, datagrid } = this.props
    const { radioState } = this.state

    switch (radioState) {
      case 'counter': {
        const body = {
          pkgAmount: parseInt(values.pkgAmount),
          pricePerUOM: parseFloat(values.pricePerUOM),
          message: values.message
        }
        removeEmpty(body)

        try {
          const { value } = await counterOffer(popupValues.id, body)
          datagrid.updateRow(popupValues.id, () => value)
          onClose(popupValues)
        } catch (e) {
          console.error(e)
        }
        break
      }
      case 'accept': {
        try {
          const { value } = await acceptOffer(popupValues.id)
          datagrid.updateRow(popupValues.id, () => value)
          onClose(popupValues)
        } catch (e) {
          console.error(e)
        }
        break
      }
      case 'reject': {
        try {
          const { value } = await rejectOffer(popupValues.id)
          datagrid.updateRow(popupValues.id, () => value)
          onClose(popupValues)
        } catch (e) {
          console.error(e)
        }
        break
      }
    }
    setSubmitting(false)
  }

  getDetailTable = table => {
    return (
      <TableSegment>
        <StyledList divided relaxed horizontal size='large'>
          {table.map(t => (
            <List.Item>
              <List.Content>
                <List.Header as='label'>{t[0]}</List.Header>
                <List.Description as='span' className={t[2] ? t[2] : ''}>
                  {t[1]}
                </List.Description>
              </List.Content>
            </List.Item>
          ))}
        </StyledList>
      </TableSegment>
    )
  }

  handleCheckout = async id => {
    const { addOfferToCart } = this.props

    try {
      await addOfferToCart(id)
      Router.push('/cart')
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    const {
      intl: { formatMessage },
      popupValues,
      productOffer,
      closePopup,
      isSending,
      loading,
      listFobPriceUnit,
      packagingType,
      packagingUnit,
      packagingSize,
      seller,
      openPopup
    } = this.props

    const { detailExpandedIds, radioState } = this.state

    const lastHistory = popupValues.histories[popupValues.histories.length - 1]
    const disabledInputPrice = radioState !== 'counter'

    const lastStatus = lastHistory.status
    const showBidSummary = lastStatus === 'NEW' && !seller

    const showAcceptRejectCounterSection =
      !(seller ^ (popupValues.histories.length & 1)) && !(lastStatus === 'ACCEPTED' || lastStatus === 'REJECTED')

    const histories =
      showAcceptRejectCounterSection || showBidSummary || lastStatus === 'ACCEPTED' || lastStatus === 'REJECTED'
        ? popupValues.histories.slice(0, popupValues.histories.length - 1)
        : popupValues.histories

    return (
      <Formik
        autoComplete='off'
        enableReinitialize
        initialValues={this.state.initialFormValues}
        validationSchema={formValidation(!disabledInputPrice)}
        onSubmit={this.submitOffer}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps
          this.formikProps = formikProps

          const pkgAmount = parseInt(values.pkgAmount)
          let amount = pkgAmount
          if (isNaN(pkgAmount)) amount = 1

          const listFobPrice = getPricing(popupValues.productOffer, amount).price
          const totalListPrice = amount * packagingSize * listFobPrice

          return (
            <ScrollContent>
              <DetailRow>
                <Dimmer active={isSending || loading} inverted>
                  <Loader />
                </Dimmer>
                <Form>
                  <StyledGrid>
                    {histories.map((r, index) => {
                      return (
                        <HistoryRow>
                          <GridColumn style={{ padding: '0' }}>
                            <HistoryDetailGrid>
                              <HistoryDetailRow
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  const { detailExpandedIds } = this.state
                                  if (detailExpandedIds.length) {
                                    if (detailExpandedIds[0] === index) {
                                      this.setState({ detailExpandedIds: [], touched: true })
                                    } else {
                                      this.setState({ detailExpandedIds: [index], touched: true })
                                    }
                                  } else {
                                    this.setState({ detailExpandedIds: [index], touched: true })
                                  }
                                }}>
                                <GridColumn width={4}>
                                  <NameWrapper>
                                    <IconWrapper>{DefaultIcon}</IconWrapper>
                                    <StyledName style={{ marginLeft: '10px', paddingTop: '2px' }}>
                                      <div className='name'>{r.createdBy.name}</div>
                                      <div className='company'>{r.createdBy.company.cfDisplayName}</div>
                                    </StyledName>
                                  </NameWrapper>
                                </GridColumn>
                                <GridColumn width={9}>
                                  <RowDescription
                                    history={r}
                                    productOffer={productOffer}
                                    index={index}
                                    lastHistory={popupValues.histories.length === index - 1}
                                  />
                                </GridColumn>
                                <GridColumn width={3} style={{ color: '#848893' }}>
                                  {moment(r.createdAt).fromNow()}
                                </GridColumn>
                              </HistoryDetailRow>
                              {detailExpandedIds.some(id => id === index) && (
                                <>
                                  <GridRow>
                                    <GridColumn>
                                      {this.getDetailTable([
                                        [
                                          <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity' />,
                                          `${r.pkgAmount} (${packagingSize} ${packagingUnit} ${packagingType})`,
                                          'green'
                                        ],
                                        [
                                          <FormattedMessage
                                            id='marketplace.offeredFobPrice'
                                            defaultMessage='Offered FOB Price'
                                          />,
                                          <>
                                            <FormattedNumber
                                              minimumFractionDigits={2}
                                              maximumFractionDigits={2}
                                              style='currency'
                                              currency={currency}
                                              value={r.pricePerUOM}
                                            />
                                            {listFobPriceUnit}
                                          </>,
                                          'green'
                                        ],
                                        [
                                          <FormattedMessage
                                            id='marketplace.totalOfferedPrice'
                                            defaultMessage='Total Offered Price'
                                          />,
                                          <FormattedNumber
                                            minimumFractionDigits={2}
                                            maximumFractionDigits={2}
                                            style='currency'
                                            currency={currency}
                                            value={r.pkgAmount * r.pricePerUOM * packagingSize}
                                          />,
                                          'green'
                                        ]
                                      ])}
                                    </GridColumn>
                                  </GridRow>
                                  <GridRow>
                                    <GridColumn>
                                      <StyledRectangle className='dark-grey'>
                                        <div className='header'>
                                          {seller ? (
                                            index & 1 ? (
                                              <FormattedMessage
                                                id='marketplace.messageToBuyer'
                                                defaultMessage='Message'
                                              />
                                            ) : (
                                              <FormattedMessage
                                                id='marketplace.messageFromBuyer'
                                                defaultMessage='Message'
                                              />
                                            )
                                          ) : index & 1 ? (
                                            <FormattedMessage
                                              id='marketplace.messageFromSeller'
                                              defaultMessage='Message'
                                            />
                                          ) : (
                                            <FormattedMessage
                                              id='marketplace.messageToSeller'
                                              defaultMessage='Message'
                                            />
                                          )}
                                        </div>
                                        <div className='message'>{r.message}</div>
                                      </StyledRectangle>
                                    </GridColumn>
                                  </GridRow>
                                </>
                              )}
                            </HistoryDetailGrid>
                          </GridColumn>
                        </HistoryRow>
                      )
                    })}

                    {(showAcceptRejectCounterSection || showBidSummary) && (
                      <>
                        <GridRow style={{ padding: '20px 10px 7.5px' }}>
                          <GridColumn>
                            {this.getDetailTable([
                              [
                                <FormattedMessage id='marketplace.productName' defaultMessage='Product Name' />,
                                this.props.productName
                              ],
                              [
                                <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity' />,
                                isNaN(pkgAmount)
                                  ? `${packagingSize} ${packagingUnit} ${packagingType}`
                                  : `${pkgAmount} (${packagingSize} ${packagingUnit} ${packagingType})`
                              ],
                              [
                                <FormattedMessage id='marketplace.listFobPrice' defaultMessage='List FOB Price' />,
                                <>
                                  <FormattedNumber
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                    style='currency'
                                    currency={currency}
                                    value={listFobPrice}
                                  />
                                  {listFobPriceUnit}
                                </>
                              ],
                              [
                                <FormattedMessage id='marketplace.totalListPrice' defaultMessage='Total List Price' />,
                                <FormattedNumber
                                  minimumFractionDigits={2}
                                  maximumFractionDigits={2}
                                  style='currency'
                                  currency={currency}
                                  value={totalListPrice}
                                />
                              ]
                            ])}
                          </GridColumn>
                        </GridRow>

                        <GridRow style={{ padding: '7.5px 10px' }}>
                          <GridColumn>
                            {this.getDetailTable([
                              [
                                <FormattedMessage
                                  id='marketplace.offeredFobPrice'
                                  defaultMessage='Offered FOB Price'
                                />,
                                <>
                                  <FormattedNumber
                                    minimumFractionDigits={2}
                                    maximumFractionDigits={2}
                                    style='currency'
                                    currency={currency}
                                    value={popupValues.cfHistoryLastPricePerUOM}
                                  />
                                  {listFobPriceUnit}
                                </>,
                                'green'
                              ],
                              [
                                <FormattedMessage
                                  id='marketplace.totalOfferedPrice'
                                  defaultMessage='Total Offered Price'
                                />,
                                <FormattedNumber
                                  minimumFractionDigits={2}
                                  maximumFractionDigits={2}
                                  style='currency'
                                  currency={currency}
                                  value={
                                    popupValues.cfHistoryLastPricePerUOM *
                                    packagingSize *
                                    popupValues.cfHistoryLastPkgAmount
                                  }
                                />,
                                'green'
                              ]
                            ])}
                          </GridColumn>
                        </GridRow>

                        <GridRow style={{ padding: `7.5px 10px ${showBidSummary ? '20px' : '7.5px'} 10px` }}>
                          <GridColumn>
                            <StyledRectangle className='dark-grey'>
                              <div className='header'>
                                {seller ? (
                                  showBidSummary ? (
                                    <FormattedMessage
                                      id='marketplace.messageToBuyer'
                                      defaultMessage='Message to Buyer'
                                    />
                                  ) : (
                                    <FormattedMessage
                                      id='marketplace.messageFromBuyer'
                                      defaultMessage='Message from Buyer'
                                    />
                                  )
                                ) : showBidSummary ? (
                                  <FormattedMessage
                                    id='marketplace.messageToSeller'
                                    defaultMessage='Message to Seller'
                                  />
                                ) : (
                                  <FormattedMessage
                                    id='marketplace.messageFromSeller'
                                    defaultMessage='Message from Seller'
                                  />
                                )}
                              </div>
                              <div className='message'>{lastHistory.message}</div>
                            </StyledRectangle>
                          </GridColumn>
                        </GridRow>

                        {showAcceptRejectCounterSection && (
                          <>
                            <GridRow style={{ padding: '7.5px 10px' }}>
                              <GridColumn width={5}>
                                <Input
                                  label={
                                    <>
                                      {formatMessage({ id: 'global.quantity', defaultMessage: 'Quantity' })}
                                      {!disabledInputPrice && <Required />}
                                    </>
                                  }
                                  name='pkgAmount'
                                  inputProps={{
                                    placeholder: formatMessage({
                                      id: 'global.enterQuantity',
                                      defaultMessage: 'Enter Quantity'
                                    }),
                                    type: 'number',
                                    min: 1,
                                    step: 1,
                                    disabled: disabledInputPrice
                                  }}
                                />
                              </GridColumn>
                              <GridColumn width={5}>
                                <PriceInput
                                  name='pricePerUOM'
                                  inputProps={{
                                    placeholder: formatMessage({
                                      id: 'marketplace.enterCounterBid',
                                      defaultMessage: 'Enter Counter Bid'
                                    }),
                                    min: 0,
                                    type: 'number',
                                    disabled: disabledInputPrice
                                  }}
                                  label={
                                    <>
                                      <FormattedMessage
                                        id='marketplace.yourFobPriceOffer'
                                        defaultMessage='Your FOB price offer'>
                                        {text => text}
                                      </FormattedMessage>
                                      {!disabledInputPrice && <Required />}
                                    </>
                                  }
                                  currencyLabel={'$'}
                                />
                              </GridColumn>
                              <GridColumn width={5}>
                                <Form.Field>
                                  <label>
                                    <FormattedMessage id='marketplace.YourTotalBid' defaultMessage='Your Total Bid'>
                                      {text => text}
                                    </FormattedMessage>
                                  </label>
                                  <FieldRectangle className={disabledInputPrice ? 'disabled' : ''}>
                                    <FormattedNumber
                                      minimumFractionDigits={2}
                                      maximumFractionDigits={2}
                                      style='currency'
                                      currency={currency}
                                      value={values.pkgAmount * packagingSize * values.pricePerUOM}
                                    />
                                  </FieldRectangle>
                                </Form.Field>
                              </GridColumn>
                            </GridRow>

                            <GridRow style={{ padding: '7.5px 10px 20px 7.5px' }}>
                              <GridColumn
                                width={4}
                                style={{ display: 'flex', flexDirection: 'column', paddingTop: '4px' }}>
                                <Radio
                                  checked={radioState === 'counter'}
                                  value={'counter'}
                                  onChange={(_e, { value }) => {
                                    this.setState({ radioState: value, touched: true })
                                  }}
                                  label={formatMessage({ id: 'marketplace.counter', defaultMessage: 'Counter' })}
                                />
                                <Radio
                                  checked={radioState === 'accept'}
                                  value={'accept'}
                                  onChange={(_e, { value }) => {
                                    this.setState({ radioState: value, touched: true })
                                  }}
                                  label={formatMessage({ id: 'marketplace.accept', defaultMessage: 'Accept' })}
                                />
                                <Radio
                                  checked={radioState === 'reject'}
                                  value={'reject'}
                                  onChange={(_e, { value }) => {
                                    this.setState({ radioState: value, touched: true })
                                  }}
                                  label={formatMessage({ id: 'marketplace.reject', defaultMessage: 'Reject' })}
                                />
                              </GridColumn>
                              <GridColumn width={12}>
                                <TextArea
                                  name='message'
                                  label={
                                    <MessageInputHeader>
                                      {seller ? (
                                        <FormattedMessage
                                          id='marketplace.messageToBuyer'
                                          defaultMessage='Message to Buyer'
                                        />
                                      ) : (
                                        <FormattedMessage
                                          id='marketplace.messageToSeller'
                                          defaultMessage='Message to Seller'
                                        />
                                      )}
                                      <SmallText>
                                        <FormattedMessage id='marketplace.optional' defaultMessage='Optional' />
                                      </SmallText>
                                    </MessageInputHeader>
                                  }
                                  inputProps={{
                                    'data-test': 'wanted_board_sidebar_specialNotes_inp',
                                    placeholder: formatMessage({
                                      id: 'marketplace.enterMessage',
                                      defaultMessage: 'Enter Message...'
                                    }),
                                    disabled: disabledInputPrice
                                  }}
                                />
                              </GridColumn>
                            </GridRow>
                          </>
                        )}
                      </>
                    )}
                  </StyledGrid>
                  <ErrorFocus />
                  {!(seller && lastStatus === 'ACCEPTED') && (
                    <BottomButtons>
                      {!seller && (lastStatus === 'ACCEPTED' || lastStatus === 'REJECTED') ? (
                        <div style={{ display: 'flex' }}>
                          <span style={{ display: 'flex', margin: 'auto' }}>
                            {lastStatus === 'ACCEPTED' ? (
                              <>
                                <div style={{ margin: 'auto 20px' }}>
                                  <FormattedMessage
                                    id='marketplace.detailRow.youMayCheckout'
                                    defaultMessage='ou may now checkout with this order'
                                  />
                                </div>
                                <Button
                                  className='light'
                                  size='large'
                                  type='button'
                                  onClick={() => this.handleCheckout(popupValues.id)}
                                  data-test='marketplace_bids_row_detail_checkout_btn'>
                                  {formatMessage({ id: 'marketplace.checkout', defaultMessage: 'Checkout' })}
                                </Button>
                              </>
                            ) : (
                              <>
                                <div style={{ margin: 'auto 20px' }}>
                                  <FormattedMessage
                                    id='marketplace.detailRow.youMaySubmitBid'
                                    defaultMessage='You may submit a new bid here'
                                  />
                                </div>
                                <Button
                                  className='light'
                                  size='large'
                                  type='button'
                                  onClick={() => openPopup(popupValues.productOffer)}
                                  data-test='marketplace_bids_row_detail_checkout_btn'>
                                  {formatMessage({ id: 'marketplace.bid', defaultMessage: 'Bid' })}
                                </Button>
                              </>
                            )}
                          </span>
                        </div>
                      ) : (
                        <Button
                          className='borderless'
                          size='large'
                          onClick={() => this.props.onClose(popupValues)}
                          data-test='marketplace_bids_row_detail_close_btn'>
                          {formatMessage({ id: 'marketplace.close', defaultMessage: 'Close' })}
                        </Button>
                      )}
                      {showAcceptRejectCounterSection && (
                        <Button.Submit
                          disabled={radioState === ''}
                          className='light'
                          size='large'
                          onClick={() => {
                            let { validateForm, submitForm } = formikProps
                            validateForm().then(err => {
                              const errors = Object.keys(err)
                              if (errors.length && errors[0] !== 'isCanceled') {
                                submitForm() // to show errors
                              } else {
                                this.submitOffer(formikProps)
                              }
                            })
                          }}
                          type='button'
                          data-test='marketplace_bids_row_detail_submit_btn'>
                          {formatMessage({ id: 'marketplace.submit', defaultMessage: 'Submit' })}
                        </Button.Submit>
                      )}
                    </BottomButtons>
                  )}
                  {seller && lastStatus === 'ACCEPTED' && (
                    <div style={{ backgroundColor: '#f8f9fb', height: '40px', display: 'flex' }}>
                      <div style={{ margin: 'auto' }}>
                        <FormattedMessage
                          id='marketplace.detailRow.youWillBeNotified'
                          defaultMessage="You'll be notified when they submit their purchase request."
                        />
                      </div>
                    </div>
                  )}
                </Form>
              </DetailRow>
            </ScrollContent>
          )
        }}
      </Formik>
    )
  }
}

function mapStateToProps(store, params) {
  const { popupValues } = params
  const productOffer = popupValues.productOffer
  const companyProduct = productOffer.companyProduct

  const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')

  return {
    popupValues,
    productOffer,
    isSending: store.marketplace.isSending,
    loading: store.marketplace.loading,
    productName: getSafe(() => companyProduct.intProductName, ''),
    listFobPriceUnit: priceUnit ? `/${priceUnit}` : '',
    packagingType: getSafe(() => companyProduct.packagingType.name, ''),
    packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
    packagingSize: getSafe(() => companyProduct.packagingSize, 1)
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(BidsRowDetail)))
