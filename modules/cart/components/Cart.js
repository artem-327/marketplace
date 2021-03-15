/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { Grid, GridColumn, Segment, GridRow, Header, Button, Icon } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import Router from 'next/router'
//Components
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'
import AddCart from '~/components/AddCart'
import CartItem from './CartItem/CartItem'

//Styles
import {
  CartColumn,
  SummaryColumn,
  ContentSegment,
  VerticalUnpaddedColumn,
  StyledRow,
  TopUnpaddedRow,
  BottomUnpaddedRow,
  DescriptionValue,
  TotalRow,
  CartButtonGroup
} from './StyledComponents'

const Cart = props => {
  // Similar to call componentDidMount:
  useEffect(() => {
    props.getCart()
  }, [])  // If [] is empty then is similar as componentDidMount.

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
            <Grid>
              <StyledRow bottomShadow>
                <VerticalUnpaddedColumn>
                  <Header as='h2'>
                    <FormattedMessage
                      id='cart.totalItems'
                      defaultMessage={`TOTAL ITEMS: ${itemsCount}`}
                      values={{ count: itemsCount }}
                    />
                  </Header>
                </VerticalUnpaddedColumn>
              </StyledRow>
            </Grid>
            {itemsCount === 0 && !cartIsFetching
              ? (
                <Grid verticalAlign='middle'>
                  <GridRow>
                    <GridColumn computer={16} textAlign='center'>
                      {formatMessage({ id: 'cart.empty', defaultMessage: 'Your cart is empty.' })} <br /> <br />
                      <Button basic onClick={() => Router.push('/marketplace/listings')}>
                        <Icon name='shopping bag' />
                        {formatMessage({ id: 'cart.keepShopping', defaultMessage: 'Keep Shopping' })}
                      </Button>
                    </GridColumn>
                  </GridRow>
                </Grid>
              )
              : getSafe(() => cart.cartItems, []).map((item, i) => (
                <CartItem
                  key={i}
                  item={item}
                  index={i}
                  cart={cart}
                />
              ))}
          </ContentSegment>
        </CartColumn>
        <SummaryColumn mobile={14} tablet={7} computer={5}>
          <Segment loading={cartIsFetching}>
            <Grid>
              <StyledRow bottomShadow>
                <VerticalUnpaddedColumn>
                  <Header as='h2'>
                    <FormattedMessage id='cart.summary' defaultMessage='Summary' />
                  </Header>
                </VerticalUnpaddedColumn>
              </StyledRow>

              <BottomUnpaddedRow columns={2}>
                <VerticalUnpaddedColumn>
                  <FormattedMessage id='cart.subtotal' defaultMessage='Subtotal' />
                </VerticalUnpaddedColumn>
                <VerticalUnpaddedColumn textAlign='right'>
                  <FormattedNumber
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                    style='currency'
                    currency={currency}
                    value={cart.cfPriceSubtotal}
                  />
                </VerticalUnpaddedColumn>
              </BottomUnpaddedRow>

              <TopUnpaddedRow columns={2}>
                <VerticalUnpaddedColumn>
                  <FormattedMessage id='cart.estimatedTax' defaultMessage='Estimated Tax' />
                </VerticalUnpaddedColumn>
                <VerticalUnpaddedColumn textAlign='right'>
                  <FormattedNumber
                    minimumFractionDigits={2}
                    maximumFractionDigits={2}
                    style='currency'
                    currency={currency}
                    value={0}
                  />
                </VerticalUnpaddedColumn>
              </TopUnpaddedRow>
              <TotalRow columns={2}>
                <VerticalUnpaddedColumn>
                  <DescriptionValue bold>
                    <FormattedMessage id='cart.total' defaultMessage='Total' />
                  </DescriptionValue>
                </VerticalUnpaddedColumn>

                <VerticalUnpaddedColumn textAlign='right'>
                  <DescriptionValue bold>
                    <FormattedNumber
                      minimumFractionDigits={2}
                      maximumFractionDigits={2}
                      style='currency'
                      currency={currency}
                      value={cart.cfPriceSubtotal}
                    />
                  </DescriptionValue>
                </VerticalUnpaddedColumn>
              </TotalRow>
            </Grid>
          </Segment>

          <Grid>
            <GridRow>
              <GridColumn computer={16}>
                <CartButtonGroup fluid>
                  {itemsCount !== 0 && (
                    <Button onClick={() => Router.push('/marketplace/listings')}>
                      <Icon name='shopping bag' />
                      {formatMessage({ id: 'cart.keepShopping', defaultMessage: 'Keep Shopping' })}
                    </Button>
                  )}
                  <Button
                    primary
                    disabled={itemsCount === 0 || cartIsFetching}
                    onClick={() => Router.push('/purchase-order')}
                  >
                    {formatMessage({ id: 'cart.proceedToCheckout', defaultMessage: 'Proceed to Checkout' })}
                    <Icon name='arrow right' />
                  </Button>
                </CartButtonGroup>
              </GridColumn>
            </GridRow>
          </Grid>
        </SummaryColumn>
      </Grid>
      {getSafe(() => sidebar.id, false) ? <AddCart isEdit={true} /> : null}
    </>
  )
}

export default Cart