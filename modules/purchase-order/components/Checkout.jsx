import { useEffect, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import Head from 'next/head'
import { Grid, GridColumn, GridRow } from 'semantic-ui-react'

//Components
import HeaderRow from './HeaderRow/HeaderRow'
import OrderSummary from './OrderSummary/OrderSummary'
import ReviewItems from './ReviewItems/ReviewItems'
import ShippingTerms from './ShippingTerms/ShippingTerms'
import Payment from './Payment/Payment'
import FreightSelection from './FreightSelection/FreightSelection'
import Spinner from '../../../components/Spinner/Spinner'
import ChatWidget from '../../chatWidget/components/ChatWidgetContainer'

//Services
import ErrorFocus from '../../../components/error-focus'
import { getSafe } from '../../../utils/functions'
import {
  getComponentParameters,
  submitButton,
  submitUpdateCartItem,
  getShippingQuotes,
  handleSubmitOrder,
  confirmSection,
  checkAllAccepted
} from './Checkout.services'

// Styles
import { ContainerMain, DivScrollableContent, ContainerCheckout, GridSections } from './Checkout.styles'

//Constants
import { FREIGHT_TYPES } from './Checkout.constants'

const Checkout = props => {
  const [openSection, setOpenSection] = useState('review')
  const [sectionState, setSectionState] = useState({
    review: { accepted: false, value: null }, // 1. Review Items
    shipping: { accepted: false, value: null }, // 2. Shipping & Terms
    payment: { accepted: false, value: null }, // 3. Payment
    freight: { accepted: false, value: null } // 4. Freight Selection
  })
  const [summaryButtonCaption, setSummaryButtonCaption] = useState('')
  const [fixedFreightId, setfixedFreightId] = useState(false)

  const {
    cart,
    cartItems,
    payments,
    offerDetailIsFetching,
    cartIsFetching,
    purchaseHazmatEligible,
    intl: { formatMessage },
    loading
  } = props

  // Similar to call componentDidMount:
  useEffect(() => {
    const fetchCheckout = async () => {
      const { paymentProcessor } = props
      props.getDeliveryAddresses()
      props.getPayments(paymentProcessor)
      props.getIdentity()
      await props.getCart()
    }

    fetchCheckout()
    const shippingQuoteId = getSafe(() => Router.router.query.shippingQuoteId, '')
    if (shippingQuoteId) {
      setSectionState({
        ...sectionState,
        freight: {
          accepted: true,
          value: {
            carrierName: shippingQuoteId,
            estimatedPrice: '',
            estimatedDeliveryDate: '',
            quoteId: shippingQuoteId,
            freightType: FREIGHT_TYPES.ECHO
          }
        }
      })
      setfixedFreightId(true)
    }
  }, [])

  const allAccepted = checkAllAccepted(sectionState)

  const state = {
    allAccepted,
    openSection,
    setOpenSection,
    sectionState,
    setSectionState,
    setSummaryButtonCaption
  }

  if (cartIsFetching) return <Spinner />

  const orderTotal =
    getSafe(() => props.cart.cfPriceSubtotal, 0) + getSafe(() => sectionState.freight.value.estimatedPrice, 0)

  let isAnyItemHazardous = cart.cartItems.some(
    item => getSafe(() => item.productOffer.companyProduct.hazardous, false) === true
  )

  return (
    <>
      <Head>
        <title>{formatMessage({ id: 'checkout.titlePage', defaultMessage: 'Echosystem / Checkout' })}</title>
      </Head>
      <ContainerMain fluid>
        <HeaderRow itemsCount={cartItems.length} />
        <DivScrollableContent>
          <ContainerCheckout>
            <Grid>
              <GridRow>
                <GridColumn width={12}>
                  <GridSections>
                    <ReviewItems
                      {...props}
                      {...getComponentParameters(props, { name: 'review', ...state })}
                      onClickDelete={id => {
                        setSectionState({
                          ...sectionState,
                          review: { accepted: false, value: null },
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
                        setSectionState({
                          ...sectionState,
                          shipping: { accepted: false, value },
                          ...(!fixedFreightId && { freight: { accepted: false, value: null } })
                        })
                        const address = value.fullAddress.address

                        if (!cart.weightLimitExceed && !fixedFreightId && !cart.palletLimitExceed) {
                          getShippingQuotes(props, address.country.id, address.zip.zip)
                        }
                      }}
                    />
                    <Payment
                      {...getComponentParameters(props, { name: 'payment', ...state })}
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
                    cart={props.cart}
                    sectionState={sectionState}
                    onButtonClick={() => submitButton(props, state)}
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
        <ChatWidget />
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

export default injectIntl(Checkout)
