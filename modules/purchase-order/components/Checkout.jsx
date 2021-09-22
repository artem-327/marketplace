import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import Head from 'next/head'
import { Grid, GridColumn, GridRow, Popup } from 'semantic-ui-react'
import { ArrowLeft } from 'react-feather'
import moment from 'moment/moment'

//Components
import HeaderRow from './HeaderRow/HeaderRow'
import OrderSummary from './OrderSummary/OrderSummary'
import ReviewItems from './ReviewItems/ReviewItems'
import ShippingTerms from './ShippingTerms/ShippingTerms'
import Payment from './Payment/Payment'
import FreightSelection from './FreightSelection/FreightSelection'
import Spinner from '../../../components/Spinner/Spinner'
import BasicButton from '../../../components/buttons/BasicButton'
import AuthenticationSelectPopup from '../../auth/components/AuthenticationSelectPopup'
import AuthenticationEnterPopup from '../../auth/components/AuthenticationEnterPopup'

//Services
import { getSafe, generateToastMarkup } from '../../../utils/functions'
import {
  getComponentParameters,
  submitButton,
  submitUpdateCartItem,
  getShippingQuotes,
  checkAllAccepted,
  findSectionToOpen,
  handleSubmit2FAOption,
  handleSubmit2FACode
} from './Checkout.services'
import { takeOverCompanyFinish } from '../../admin/actions'

// Styles
import {
  ContainerMain,
  DivTopButtonRow,
  DivScrollableContent,
  ContainerCheckout,
  GridSections,
  DivButtonContentWrapper,
  SpanButtonText,
  IconMinimize2,
  ReturnToAdmin,
  CustomDiv,
  Rectangle
} from './Checkout.styles'
import { CustomSpanReturn } from '../../../components/constants/layout'

//Constants
import { FREIGHT_TYPES } from './Checkout.constants'

const Checkout = props => {
  const [openSection, setOpenSection] = useState('review')
  const [sectionState, setSectionState] = useState({
    review: { accepted: false, value: [] }, // 1. Review Items
    shipping: { accepted: false, value: null }, // 2. Shipping & Terms
    payment: { accepted: false, value: null }, // 3. Payment
    freight: { accepted: false, value: null } // 4. Freight Selection
  })
  const [summaryButtonCaption, setSummaryButtonCaption] = useState('')
  const [fixedFreightId, setfixedFreightId] = useState(false)
  const [shipmentQuoteId, setShipmentQuoteId] = useState('')
  const [clickedFriehgt, setClickedFriehgt] = useState(true)
  const [twoFactorAuthState, setTwoFactorAuthState] = useState('')
  const [twoFactorAuthOptions, setTwoFactorAuthOptions] = useState([])
  const [twoFactorAuthPass, setTwoFactorAuthPass] = useState('')
  const [twoFactorAuthLastSent, setTwoFactorAuthLastSent] = useState(null)
  const [twoFactorAuthtime, setTwoFactorAuthTime] = useState(Date.now())
  let twoFactorAuthTimeoutSecs

  useEffect(() => {   // To rerender every 1 second (to update timeout in seconds in Send button)
    twoFactorAuthTimeoutSecs = setInterval(() => setTwoFactorAuthTime(Date.now()), 1000)
    return () => {
      clearInterval(twoFactorAuthTimeoutSecs)
    }
  }, [])

  const {
    cart,
    cartItems,
    payments,
    offerDetailIsFetching,
    cartIsFetching,
    purchaseHazmatEligible,
    intl: { formatMessage },
    loading,
    isThirdPartyConnectionException,
    applicationName,
    manualQuoteById,
    toastManager,
    isReady,
    takeover,
    companyName,
    takeOverCompanyFinish,
    twoPhaseAuthLoading,
    twoPhaseErrorMessage
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    const init = async () => {
      await props.getIdentity()
      const { value } = await props.getCart()
      const initVal = value.cartItems.map(item => ({
        id: item.id,
        quantity: item.pkgAmount.toString(),
        minPkg: item.productOffer.minPkg,
        splitPkg: item.productOffer.splitPkg,
        pkgAvailable: item.productOffer.pkgAvailable,
        price: item.cfPriceSubtotal
      }))
      setSectionState({
        ...sectionState,
        review: { accepted: false, value: initVal }
      })

      const shippingQuoteId = getSafe(() => Router.router.query.shippingQuoteId, '')

      if (shippingQuoteId) {
        setfixedFreightId(true)
        setShipmentQuoteId(shippingQuoteId)
        await props.getManualQuoteById(shippingQuoteId)
      }
    }
    init()
  }, [])

  useEffect(() => {
    const fetchCheckout = async freight => {
      setSectionState({
        ...sectionState,
        freight
      })
    }

    let freight = sectionState.freight

    if (fixedFreightId && manualQuoteById) {
      freight = {
        accepted: true,
        value: {
          carrierName: manualQuoteById.carrierName,
          cfEstimatedSubtotal: manualQuoteById.price,
          estimatedDeliveryDate: '',
          quoteId: manualQuoteById.quoteId,
          freightType: FREIGHT_TYPES.ECHO
        }
      }

      fetchCheckout(freight)
    } else if (manualQuoteById) {
      setSectionState({
        ...sectionState,
        freight: {
          accepted: true,
          value: {
            carrierName: manualQuoteById.carrierName,
            cfEstimatedSubtotal: manualQuoteById.price,
            estimatedDeliveryDate: '',
            quoteId: manualQuoteById.quoteId,
            freightType: FREIGHT_TYPES.ECHO
          }
        }
      })
      const sectionToOpen = findSectionToOpen(sectionState)
      setOpenSection(sectionToOpen)
    } else if (shipmentQuoteId && fixedFreightId) {
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id='shippingQuote.noExistManualQuoteId.title'
            defaultMessage='Failed to get shipping quote data'
          />,
          <FormattedMessage
            id='shippingQuote.noExistManualQuoteId.content'
            defaultMessage='Such Quote ID does not exist. Please check your manual quote id again!'
          />
        ),
        {
          appearance: 'warning'
        }
      )
    }
  }, [manualQuoteById, clickedFriehgt])

  const allAccepted = checkAllAccepted(sectionState)

  const state = {
    allAccepted,
    openSection,
    setOpenSection,
    sectionState,
    setSectionState,
    setSummaryButtonCaption,
    shipmentQuoteId,
    setShipmentQuoteId,
    clickedFriehgt,
    setClickedFriehgt,
    twoFactorAuthState,
    setTwoFactorAuthState,
    twoFactorAuthOptions,
    setTwoFactorAuthOptions,
    twoFactorAuthPass,
    setTwoFactorAuthPass
  }

  if (cartIsFetching) return <Spinner />

  const orderTotal =
    getSafe(() => props.cart.cfPriceSubtotal, 0) + getSafe(() => sectionState.freight.value.cfEstimatedSubtotal, 0)

  let isAnyItemHazardous = cart.cartItems.some(
    item => getSafe(() => item.productOffer.companyProduct.hazardous, false) === true
  )

  let subTotalPrice = 0
  sectionState.review.value.forEach(item => (subTotalPrice += item.price))

  return (
    <>
      <Head>
        <title>
          {formatMessage(
            { id: 'checkout.titlePage', defaultMessage: '{companyName} / Checkout' },
            { companyName: applicationName }
          )}
        </title>
      </Head>
      <ContainerMain fluid>
        {isReady ? (
          <>
            {takeover ? (
              <CustomDiv>
                <Rectangle>
                  <IconMinimize2 size='28' />
                  <div>
                    <span>
                      <FormattedMessage
                        id='global.takeOverInfo'
                        defaultMessage={`You are working in take-over mode on behalf of '${companyName}'.`}
                        values={{ companyName: companyName }}
                      />
                    </span>
                    {
                      <Popup
                        content={<FormattedMessage id='global.returnToAdmin' defaultMessage='Return to Admin' />}
                        trigger={
                          <CustomSpanReturn onClick={() => takeOverCompanyFinish()}>
                            <ReturnToAdmin />
                          </CustomSpanReturn>
                        }
                      />
                    }
                  </div>
                </Rectangle>
              </CustomDiv>
            ) : null}
            <HeaderRow itemsCount={cartItems.length} />
            <DivScrollableContent takeover={takeover}>
              <ContainerCheckout>
                <DivTopButtonRow>
                  <BasicButton type='button' onClick={() => Router.push('/cart')}>
                    <DivButtonContentWrapper>
                      <ArrowLeft size='18' />
                      <SpanButtonText>
                        <FormattedMessage id='cart.backToShoppingCart' defaultMessage='Back to Shopping Cart'>
                          {text => text}
                        </FormattedMessage>
                      </SpanButtonText>
                    </DivButtonContentWrapper>
                  </BasicButton>
                </DivTopButtonRow>

                <Grid>
                  <GridRow>
                    <GridColumn width={12}>
                      <GridSections>
                        <ReviewItems
                          {...props}
                          {...getComponentParameters(props, { name: 'review', ...state })}
                          onClickDelete={index => {
                            let newValue = sectionState.review.value.slice()
                            newValue.splice(index, 1)
                            setSectionState({
                              ...sectionState,
                              review: { accepted: false, value: newValue },
                              ...(!fixedFreightId && { freight: { accepted: false, value: null } })
                            })
                          }}
                          onValueChange={value => {
                            setSectionState({
                              ...sectionState,
                              review: { accepted: false, ...value },
                              ...(!fixedFreightId && { freight: { accepted: false, value: null } })
                            })
                          }}
                          onSubmitClick={() => submitUpdateCartItem(props, state)}
                        />
                        <ShippingTerms
                          {...props}
                          {...getComponentParameters(props, { name: 'shipping', ...state })}
                          onValueChange={value => {
                            setShipmentQuoteId('')
                            setSectionState({
                              ...sectionState,
                              shipping: { accepted: false, value },
                              ...(!fixedFreightId && { freight: { accepted: false, value: null } })
                            })
                            const address = value.fullAddress.address

                            if (!cart.weightLimitExceed && !fixedFreightId && !cart.palletLimitExceed) {
                              getShippingQuotes(props, value)
                            }
                          }}
                        />
                        <Payment
                          {...getComponentParameters(props, { name: 'payment', ...state })}
                          isThirdPartyConnectionException={isThirdPartyConnectionException}
                          payments={payments}
                          onValueChange={value => {
                            setSectionState({
                              ...sectionState,
                              payment: { accepted: false, value }
                            })
                          }}
                        />
                        <FreightSelection
                          {...props}
                          {...getComponentParameters(props, { name: 'freight', ...state })}
                          shippingAddress={sectionState.shipping.value}
                          fixedFreightId={fixedFreightId}
                          orderTotal={orderTotal}
                          onValueChange={value => {
                            setSectionState({
                              ...sectionState,
                              freight: { accepted: false, value }
                            })
                          }}
                        />
                      </GridSections>
                    </GridColumn>
                    <GridColumn width={4}>
                      <OrderSummary
                        loading={loading}
                        allAccepted={allAccepted}
                        subTotalPrice={subTotalPrice}
                        cart={props.cart}
                        sectionState={sectionState}
                        onButtonClick={() => submitButton(props, state)}
                        isNotHazardousPermissions={!purchaseHazmatEligible && isAnyItemHazardous}
                        submitButtonDisabled={
                          (!purchaseHazmatEligible && isAnyItemHazardous) ||
                          (openSection === 'review' && sectionState.review.errors) ||
                          offerDetailIsFetching
                        }
                        buttonText={
                          allAccepted ? (
                            <FormattedMessage id='checkout.button.placeOrder' defaultMessage='Place Order'>
                              {text => text}
                            </FormattedMessage>
                          ) : summaryButtonCaption ? (
                            summaryButtonCaption
                          ) : (
                            ''
                          )
                        }
                      />
                    </GridColumn>
                  </GridRow>
                </Grid>
              </ContainerCheckout>
            </DivScrollableContent>
          </>
        ) : null}
        {twoFactorAuthState === 'select' && (
          <AuthenticationSelectPopup
            loading={twoPhaseAuthLoading}
            options={twoFactorAuthOptions}
            message={twoPhaseErrorMessage}
            description={(
              <FormattedMessage
                id='checkout.authenticationRequest'
                defaultMessage='This purchase requires your authentication. For your safety, select which device you would like a verification code to be sent.'
              />
            )}
            onAccept={value => {
              setTwoFactorAuthLastSent(Date.now())
              handleSubmit2FAOption(value, props, state)
            }}
            timeoutSeconds={twoFactorAuthLastSent ? 30 - moment().diff(twoFactorAuthLastSent, 'seconds') : 0}
          />
        )}
        {twoFactorAuthState === 'enter' && (
          <AuthenticationEnterPopup
            loading={twoPhaseAuthLoading}
            message={twoPhaseErrorMessage}
            description={(
              <FormattedMessage
                id='auth.pleaseEnterSixDigits'
                defaultMessage='Please Enter the six-digit code sent to your email.'
              />
            )}
            onAccept={value => handleSubmit2FACode(value, props, state)}
          />
        )}
      </ContainerMain>
    </>
  )
}

Checkout.propTypes = {
  loading: PropTypes.bool
}

Checkout.defaultProps = {
  loading: false
}

function mapStateToProps(store) {
  return {
    applicationName: store?.auth?.identity?.appInfo?.applicationName,
    isReady:
      getSafe(() => store.auth.identity, null) !== null && getSafe(() => store.auth.identity.isAdmin, null) !== null,
    takeover:
      getSafe(() => !!store.auth.identity.company.id, false) && getSafe(() => store.auth.identity.isAdmin, false),
    companyName: getSafe(() => store.auth.identity.company.name, '')
  }
}

export default connect(mapStateToProps, { takeOverCompanyFinish })(injectIntl(Checkout))
