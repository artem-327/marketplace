/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import {
  Container as SemanticContainer,
  Header,
  Button,
  Icon,
  Grid,
  GridColumn,
  GridRow,
  Segment,
  Popup,
  Message,
  Divider
} from 'semantic-ui-react'


import Logo from '~/assets/images/nav/logo-echo.svg'


//Components
import HeaderRow from './HeaderRow/HeaderRow'
import OrderSummary from './OrderSummary/OrderSummary'
import ReviewItems from './ReviewItems/ReviewItems'
import ShippingTerms from './ShippingTerms/ShippingTerms'
import Payment from './Payment/Payment'
import FreightSelection from './FreightSelection/FreightSelection'

//Hooks
import { usePrevious } from '../../../hooks'



//Services
import ErrorFocus from '../../../components/error-focus'
import { getSafe } from '../../../utils/functions'
import {
  getComponentParameters,
  submitUpdateCartItem,
  handleSummarySubmit,
  getShippingQuotes,
  handleSubmitOrder
} from './Checkout.services'

// Styles
import {
  DivCheckoutWrapper,
  ContainerCheckout,
  GridSections,



} from './Checkout.styles'


//Constants
import { FREIGHT_TYPES } from './Checkout.constants'

const Checkout = props => {
  const prevCartItems  = usePrevious(props.cartItems)

  const [openSection, setOpenSection] = useState('review')
  const [sectionState, setSectionState] = useState({
    'review': { accepted: true, value: null },    // 1. Review Items
    'shipping': { accepted: false, value: null },  // 2. Shipping & Terms
    'payment': { accepted: false, value: null },   // 3. Payment
    'freight': { accepted: false, value: null }    // 4. Freight Selection
  })
  const [summaryButtonCaption, setSummaryButtonCaption] = useState('')
  const [summarySubmitFunction, setSummarySubmitFunction] = useState(() => {})
  const [sectionSubmitValue, setSectionSubmitValue] = useState(null)

  const {
    cartItems,
    payments,
  } = props

  // Similar to call componentDidMount:
  useEffect(async () => {
    const { preFilledValues, clearPreFilledValues, getWarehouses, paymentProcessor } = props
    props.getDeliveryAddresses()
    props.getPayments(paymentProcessor)
    props.getIdentity()
    await props.getCart()

    const shippingQuoteId = getSafe(() => Router.router.query.shippingQuoteId, '')
    if (shippingQuoteId) {
      setSectionState({
        ...sectionState,
        freight: { accepted: false, value: shippingQuoteId }
      })
    }
    // If [] is empty then is similar as componentDidMount.
  }, [])

  const state = {
    openSection,
    setOpenSection,
    sectionState,
    setSectionState,
    setSummaryButtonCaption,
    setSummarySubmitFunction,
    setSectionSubmitValue
  }

  const allAccepted = sectionState.review.accepted && sectionState.shipping.accepted
    && sectionState.payment.accepted && sectionState.freight.accepted

  return (
    <DivCheckoutWrapper>
      <HeaderRow itemsCount={cartItems.length} />
      <ContainerCheckout>
        <Grid>
          <GridRow>
            <GridColumn width={12}>
              <GridSections>

                <ReviewItems
                  {...props}
                  {...getComponentParameters({name: 'review', ...state })}
                  onClickDelete={id => {
                    setSectionState({
                      ...sectionState,
                      review: { accepted: false, value: null },
                      freight: { accepted: false, value: null }
                    })
                  }}
                  onValueChange={value => {
                    setSectionState({
                      ...sectionState,
                      review: { accepted: false, value },
                      freight: { accepted: false, value: null }
                    })
                  }}
                  onSubmitClick={() => submitUpdateCartItem(props, sectionState, setSectionState, setOpenSection)}
                />

                <ShippingTerms
                  {...props}
                  {...getComponentParameters({name: 'shipping', ...state })}
                  onValueChange={value => {
                    setSectionState({
                      ...sectionState,
                      shipping: { accepted: false, value },
                      freight: { accepted: false, value: null }
                    })
                    const address = value.fullAddress.address
                    getShippingQuotes(props, address.country.id, address.zip.zip)
                  }}
                />

                <Payment
                  {...getComponentParameters({name: 'payment', ...state })}
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
                  {...getComponentParameters({name: 'freight', ...state })}
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
                cart={props.cart}
                sectionState={sectionState}
                onButtonClick={() => {
                  allAccepted
                    ? handleSubmitOrder(sectionState, props)
                    : handleSummarySubmit(
                      summarySubmitFunction,
                      props,
                      sectionState,
                      setSectionState,
                      setOpenSection,
                      openSection
                    )}
                }
                buttonText={
                  allAccepted
                    ? (
                      <FormattedMessage id='checkout.button.placeOrder' defaultMessage='Place Order'>
                        {text => text}
                      </FormattedMessage>
                    ) : summaryButtonCaption
                }
              />
            </GridColumn>
          </GridRow>
        </Grid>
      </ContainerCheckout>
    </DivCheckoutWrapper>
  )
}

Checkout.propTypes = {

}

Checkout.defaultProps = {

}

export default Checkout