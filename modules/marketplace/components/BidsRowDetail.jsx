/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Formik } from 'formik'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'

// Components
import { Input, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Form, Dimmer, Loader, GridRow, GridColumn, List, Radio, Image } from 'semantic-ui-react'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import RowDescription from './RowDescription'
import ErrorFocus from '~/components/error-focus'
import DeaPopup from '../listings/components/ConfirmationPopups/DeaPopup'
import DhsPopup from '../listings/components/ConfirmationPopups/DhsPopup'

// Constants
import { errorMessages } from '~/constants/yupValidation'
import { currency } from '~/constants/index'

// Styles
import {
  DivScrollContent, DivDetailRow, DivFieldRectangle, DivMessageInputHeader, DivSmallText, GridStyled
} from './BidsRowDetail.styles'
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

// Services
import * as Actions from '../actions'
import { removeEmpty, getSafe, getPricing } from '~/utils/functions'

import { formValidation, submitOffer, handleCheckout, checkBuyAttempt } from './BidsRowDetail.services'

const BidsRowDetail = props => {
  let formikPropsSelf = {}
  const [initialFormValues, setInitialFormValues] = useState({ id: '', message: '', pkgAmount: '', pricePerUOM: '' })
  const [detailExpandedIds, setDetailExpandedIds] = useState([])
  const [touched, setTouched] = useState(false)
  const [radioState, setRadioState] = useState('')
  const [buyAttemptHasDea, setBuyAttemptHasDea] = useState(null)
  const [buyAttemptHasDhs, setBuyAttemptHasDhs] = useState(null)

  const state = {
    initialFormValues, setInitialFormValues, detailExpandedIds, setDetailExpandedIds,
    touched, setTouched, radioState, setRadioState,
    buyAttemptHasDea, setBuyAttemptHasDea,
    buyAttemptHasDhs, setBuyAttemptHasDhs
  }

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
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    const { popupValues, initValues } = props

    if (initValues && initValues.values && initValues.values.id === popupValues.id) {
      setInitialFormValues(initValues.values)
      setDetailExpandedIds(initValues.state.detailExpandedIds)
      setTouched(initValues.state.touched)
      setRadioState(initValues.state.radioState)
    } else {
      setInitialFormValues({
        id: popupValues.id,
        message: '',
        pkgAmount: popupValues.cfHistoryLastPkgAmount,
        pricePerUOM: ''
      })
      setDetailExpandedIds([])
      setTouched(false)
    }
  }, [])  // If [] is empty then is similar as componentDidMount.

  useEffect(() => { // componentWillUnmount work-around
    return () => {
      if ((touched || Object.keys(formikPropsSelf.touched).length) && props.onUnmount) {
        props.onUnmount({
          values: formikPropsSelf.values,
          state: { detailExpandedIds, touched, radioState }
        })
      }
    }
  }, [formikPropsSelf, detailExpandedIds, touched, radioState])

  const getDetailTable = table => {
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

  const lastHistory = popupValues.histories[popupValues.histories.length - 1]
  const disabledInputPrice = radioState !== 'counter'

  const lastStatus = lastHistory.status
  const lastHistoryType = lastHistory.historyType
  const showBidSummary = lastStatus === 'NEW'

  const showAcceptRejectCounterSection =
    lastStatus === 'NEW' && (
      lastHistoryType === 'COUNTER' && !seller ||
      lastHistoryType === 'NORMAL' && seller
    )

  const histories =
    showAcceptRejectCounterSection || showBidSummary || lastStatus === 'ACCEPTED' || lastStatus === 'REJECTED'
      ? popupValues.histories.slice(0, popupValues.histories.length - 1)
      : popupValues.histories

  return (
    <Formik
      autoComplete='off'
      enableReinitialize
      initialValues={initialFormValues}
      validationSchema={formValidation(!disabledInputPrice)}
      onSubmit={(formikProps) => submitOffer(formikProps, props, state)}>
      {formikProps => {
        let { values } = formikProps
        formikPropsSelf = formikProps
        const pkgAmount = parseInt(values.pkgAmount)
        let amount = pkgAmount
        if (isNaN(pkgAmount)) amount = 1

        const listFobPrice = popupValues.originalPricePerUOM
        const totalListPrice = amount * packagingSize * listFobPrice

        return (
          <>
            <DivScrollContent>
              <DivDetailRow>
                <Dimmer active={isSending || loading} inverted>
                  <Loader />
                </Dimmer>
                <Form>
                  <GridStyled>
                    {histories.map((r, index) => {
                      const UserIcon = r.createdBy.avatarUrl
                        ? (<Image src={r.createdBy.avatarUrl} avatar size='small' />)
                        : DefaultIcon

                      return (
                        <HistoryRow>
                          <GridColumn style={{ padding: '0' }}>
                            <HistoryDetailGrid>
                              <HistoryDetailRow
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                  if (detailExpandedIds.length) {
                                    if (detailExpandedIds[0] === index) {
                                      setDetailExpandedIds([])
                                      setTouched(true)
                                    } else {
                                      setDetailExpandedIds([index])
                                      setTouched(true)
                                    }
                                  } else {
                                    setDetailExpandedIds([index])
                                    setTouched(true)
                                  }
                                }}>
                                <GridColumn width={4}>
                                  <NameWrapper>
                                    <IconWrapper>{UserIcon}</IconWrapper>
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
                                      {getDetailTable([
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
                                              minimumFractionDigits={3}
                                              maximumFractionDigits={3}
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
                            {getDetailTable([
                              [
                                <FormattedMessage id='marketplace.productName' defaultMessage='Product Name' />,
                                props.productName
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
                                    minimumFractionDigits={3}
                                    maximumFractionDigits={3}
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
                            {getDetailTable([
                              [
                                <FormattedMessage
                                  id='marketplace.offeredFobPrice'
                                  defaultMessage='Offered FOB Price'
                                />,
                                <>
                                  <FormattedNumber
                                    minimumFractionDigits={3}
                                    maximumFractionDigits={3}
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
                                  showAcceptRejectCounterSection ? (
                                    <FormattedMessage
                                      id='marketplace.messageFromBuyer'
                                      defaultMessage='Message from Buyer'
                                    />
                                  ) : (
                                    <FormattedMessage
                                      id='marketplace.messageToBuyer'
                                      defaultMessage='Message to Buyer'
                                    />
                                  )
                                ) : showAcceptRejectCounterSection ? (
                                  <FormattedMessage
                                    id='marketplace.messageFromSeller'
                                    defaultMessage='Message from Seller'
                                  />
                                ) : (
                                  <FormattedMessage
                                    id='marketplace.messageToSeller'
                                    defaultMessage='Message to Seller'
                                  />
                                )}
                              </div>
                              <div className='message'>{lastHistory.message}</div>
                            </StyledRectangle>
                          </GridColumn>
                        </GridRow>

                        {showAcceptRejectCounterSection && !!productOffer && (
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
                                  <DivFieldRectangle className={disabledInputPrice ? 'disabled' : ''}>
                                    <FormattedNumber
                                      minimumFractionDigits={2}
                                      maximumFractionDigits={2}
                                      style='currency'
                                      currency={currency}
                                      value={values.pkgAmount * packagingSize * values.pricePerUOM}
                                    />
                                  </DivFieldRectangle>
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
                                    setRadioState(value)
                                    setTouched(true)
                                  }}
                                  label={formatMessage({ id: 'marketplace.counter', defaultMessage: 'Counter' })}
                                />
                                <Radio
                                  checked={radioState === 'accept'}
                                  value={'accept'}
                                  onChange={(_e, { value }) => {
                                    setRadioState(value)
                                    setTouched(true)
                                  }}
                                  label={formatMessage({ id: 'marketplace.accept', defaultMessage: 'Accept' })}
                                />
                                <Radio
                                  checked={radioState === 'reject'}
                                  value={'reject'}
                                  onChange={(_e, { value }) => {
                                    setRadioState(value)
                                    setTouched(true)
                                  }}
                                  label={formatMessage({ id: 'marketplace.reject', defaultMessage: 'Reject' })}
                                />
                              </GridColumn>
                              <GridColumn width={12}>
                                  <TextArea
                                    name='message'
                                    label={
                                      <DivMessageInputHeader>
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
                                        <DivSmallText>
                                          <FormattedMessage id='marketplace.optional' defaultMessage='Optional' />
                                        </DivSmallText>
                                      </DivMessageInputHeader>
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
                  </GridStyled>
                  <ErrorFocus />
                  {!(seller && lastStatus === 'ACCEPTED') && !!productOffer && (
                    <BottomButtons>
                      {!seller && (lastStatus === 'ACCEPTED' || lastStatus === 'REJECTED') ? (
                        <div style={{ display: 'flex' }}>
                            <span style={{ display: 'flex', margin: 'auto' }}>
                              {lastStatus === 'ACCEPTED' ? (
                                <>
                                  <div style={{ margin: 'auto 20px' }}>
                                    <FormattedMessage
                                      id='marketplace.detailRow.youMayCheckout'
                                      defaultMessage='You may now checkout with this order'
                                    />
                                  </div>
                                  <Button
                                    className='light'
                                    size='large'
                                    type='button'
                                    onClick={() => checkBuyAttempt(popupValues, state, props)}
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
                                    onClick={() => openPopup({
                                      ...popupValues.productOffer,
                                      pricingTiers: [{ quantityFrom: 1, pricePerUOM: popupValues.originalPricePerUOM }]
                                    })}
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
                          onClick={() => props.onClose(popupValues)}
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
                                submitOffer(formikProps, props, state)
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
              </DivDetailRow>
            </DivScrollContent>
            {buyAttemptHasDea && !buyAttemptHasDhs &&
            <DeaPopup
              onCancel={() => setBuyAttemptHasDea(null)}
              onAccept={() => {
                handleCheckout(buyAttemptHasDea.id, props)
                setBuyAttemptHasDea(null)
              }}
            />
            }
            {buyAttemptHasDhs &&
            <DhsPopup
              onCancel={() => {
                setBuyAttemptHasDea(null)
                setBuyAttemptHasDhs(null)
              }}
              onAccept={() => {
                if (buyAttemptHasDea) {
                  setBuyAttemptHasDhs(null)
                } else {
                  handleCheckout(buyAttemptHasDhs.id, props)
                  setBuyAttemptHasDhs(null)
                }
              }}
            />
            }
          </>
        )
      }}
    </Formik>
  )
}

BidsRowDetail.propTypes = {
  itemsCount: PropTypes.number
}

BidsRowDetail.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store, params) {
  const { popupValues } = params
  const productOffer = getSafe(() => popupValues.productOffer, null)
  const companyProduct = getSafe(() => productOffer.companyProduct, null)

  const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')

  return {
    popupValues,
    productOffer,
    isSending: store.marketplace.isSending,
    loading: store.marketplace.loading,
    productName: getSafe(() => companyProduct.intProductName, 'N/A'),
    listFobPriceUnit: priceUnit ? `/${priceUnit}` : '',
    packagingType: getSafe(() => companyProduct.packagingType.name, ''),
    packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
    packagingSize: getSafe(() => companyProduct.packagingSize, 1)
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, Actions)(BidsRowDetail)))