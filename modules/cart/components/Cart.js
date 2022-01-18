/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, GridColumn, Button } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import Router from 'next/router'
//Components
import { currency } from '../../../constants/index'
import { getSafe } from '../../../utils/functions'
import { getLocaleDateFormat } from '../../../components/date-format'
import AddCart from '../../../components/AddCart'
import CartItem from './CartItem/CartItem'

//Styles
import {
  CartColumn,
  SummaryColumn,
  ContentSegment,
  VerticalUnpaddedColumn,
  StyledRow,
  TotalRow,
  ButtonStyled,
  GridStyled,
  DivHeader,
  StyledGridRow,
  DivNormalText,
  DivTotalHeader,
  DivButtonContent,
  IconShoppingBag
} from './StyledComponents'

const Cart = props => {
  // Similar to call componentDidMount:
  useEffect(() => {
    props.getCart()
  }, []) // If [] is empty then is similar as componentDidMount.

  const {
    intl: { formatMessage },
    cartIsFetching,
    cart,
    sidebar
  } = props
  const itemsCount = getSafe(() => cart.cartItems.length, 0)

  return (
    <>
      <Grid>
        <CartColumn mobile={14} tablet={9} computer={9}>
          <ContentSegment loading={cartIsFetching}>
            {itemsCount === 0 && !cartIsFetching ? (
              <GridStyled verticalAlign='middle'>
                <StyledGridRow padding='213px 0 7px'>
                  <GridColumn computer={16} textAlign='center'>
                    {formatMessage({ id: 'cart.empty', defaultMessage: 'Your cart is empty.' })}
                  </GridColumn>
                </StyledGridRow>
                <StyledGridRow padding='7px 0 213px'>
                  <GridColumn computer={16} textAlign='center'>
                    <Button
                      basic
                      onClick={() => Router.push('/marketplace/listings')}
                      data-test='cart_keep_shopping_btn_empty'>
                      <DivButtonContent>
                        <IconShoppingBag />
                        {formatMessage({ id: 'cart.keepShopping', defaultMessage: 'Keep Shopping' })}
                      </DivButtonContent>
                    </Button>
                  </GridColumn>
                </StyledGridRow>
              </GridStyled>
            ) : (
              <>
                <GridStyled>
                  <StyledRow bottomshadow>
                    <VerticalUnpaddedColumn>
                      <DivHeader data-test='cart_total_items_count'>
                        <FormattedMessage
                          id='cart.totalItems'
                          defaultMessage={`Total Items: ${itemsCount}`}
                          values={{ count: itemsCount }}
                        />
                      </DivHeader>
                    </VerticalUnpaddedColumn>
                  </StyledRow>
                </GridStyled>
                {getSafe(() => cart.cartItems, []).map((item, i) => (
                  <CartItem key={i} item={item} index={i} cart={cart} />
                ))}
              </>
            )}
          </ContentSegment>
        </CartColumn>
        <SummaryColumn mobile={14} tablet={7} computer={5}>
          <ContentSegment loading={cartIsFetching}>
            <GridStyled>
              <StyledRow bottomshadow>
                <VerticalUnpaddedColumn>
                  <DivHeader>
                    <FormattedMessage id='cart.summary' defaultMessage='Summary' />
                  </DivHeader>
                </VerticalUnpaddedColumn>
              </StyledRow>

              <StyledGridRow padding='16px 0 5px' columns={2}>
                <VerticalUnpaddedColumn>
                  <FormattedMessage id='cart.subtotal' defaultMessage='Subtotal' />
                </VerticalUnpaddedColumn>
                <VerticalUnpaddedColumn textAlign='right'>
                  <DivNormalText>
                    <FormattedNumber
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                      style='currency'
                      currency={currency}
                      value={cart.cfPriceSubtotal}
                    />
                  </DivNormalText>
                </VerticalUnpaddedColumn>
              </StyledGridRow>

              <StyledGridRow padding='5px 0 16px' columns={2}>
                <VerticalUnpaddedColumn>
                  <FormattedMessage id='cart.estimatedTax' defaultMessage='Estimated Tax' />
                </VerticalUnpaddedColumn>
                <VerticalUnpaddedColumn textAlign='right'>
                  <DivNormalText>
                    <FormattedNumber
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                      style='currency'
                      currency={currency}
                      value={0}
                    />
                  </DivNormalText>
                </VerticalUnpaddedColumn>
              </StyledGridRow>
              <TotalRow columns={2}>
                <VerticalUnpaddedColumn>
                  <DivTotalHeader>
                    <FormattedMessage id='cart.total' defaultMessage='Total' />
                  </DivTotalHeader>
                </VerticalUnpaddedColumn>

                <VerticalUnpaddedColumn textAlign='right'>
                  <DivHeader data-test='cart_total_price_header'>
                    <FormattedNumber
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                      style='currency'
                      currency={currency}
                      value={cart.cfPriceSubtotal}
                    />
                  </DivHeader>
                </VerticalUnpaddedColumn>
              </TotalRow>

              {itemsCount !== 0 && (
                <>
                  <StyledGridRow padding='20px 0 5px'>
                    <GridColumn computer={16}>
                      <ButtonStyled
                        basic
                        onClick={() => Router.push('/marketplace/listings')}
                        data-test='cart_keep_shopping_btn'>
                        <DivHeader>
                          {formatMessage({ id: 'cart.keepShopping', defaultMessage: 'Keep Shopping' })}
                        </DivHeader>
                      </ButtonStyled>
                    </GridColumn>
                  </StyledGridRow>
                  <StyledGridRow padding='5px 0 20px'>
                    <GridColumn computer={16}>
                      <ButtonStyled
                        primary
                        fuid
                        disabled={itemsCount === 0 || cartIsFetching}
                        onClick={() => Router.push('/purchase-order')}
                        data-test='cart_proceed_to_checkout_btn'>
                        {formatMessage({ id: 'cart.proceedToCheckout', defaultMessage: 'Proceed to Checkout' })}
                      </ButtonStyled>
                    </GridColumn>
                  </StyledGridRow>
                </>
              )}
            </GridStyled>
          </ContentSegment>
        </SummaryColumn>
      </Grid>
      {getSafe(() => sidebar.id, false) ? <AddCart isEdit={true} buyEnabled={true} /> : null}
    </>
  )
}

Cart.propTypes = {
  getCart: PropTypes.func,
  cartIsFetching: PropTypes.bool,
  intl: PropTypes.object,
  cart: PropTypes.object,
  sidebar: PropTypes.object
}

Cart.defaultProps = {
  getCart: () => { },
  cartIsFetching: false,
  intl: {
    formatMessage: () => {  }
  },
  cart: {},
  sidebar: {},
}

export default Cart
