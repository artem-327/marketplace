import React, { Component } from 'react'
import { Grid, GridColumn, Segment, GridRow, Header, Button, Icon } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'

import moment from 'moment'
import Router from 'next/router'

import confirm from '~/src/components/Confirmable/confirm'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'

import AddCart from '~/src/pages/cart/components/AddCart'

import {
  CapitalizedText,
  CustomHeader,
  CartColumn,
  SummaryColumn,
  ContentSegment,
  VerticalUnpaddedColumn,
  StyledRow,
  TopUnpaddedRow,
  BottomUnpaddedRow,
  ItemDescriptionGrid,
  Item,
  DescriptionValue,
  TotalRow
} from './StyledComponents'

export default class Cart extends Component {
  state = {
    modalOpen: false
  }

  componentDidMount() {
    this.props.getCart()
  }

  handleContinueShopping = () => {
    Router.push('/marketplace/all')
  }

  handleContinue = () => {
    Router.push('/purchase-order')
  }

  editCart = cartItem => {
    let { id, pkgAmount } = cartItem
    this.props.getProductOffer(cartItem.productOffer.id, true)
    this.props.sidebarChanged({ isOpen: true, id, pkgAmount })
  }

  renderEmptyCart = () => {
    const { intl: { formatMessage } } = this.props

    return (
      <Grid verticalAlign='middle'>
        <GridRow>
          <GridColumn computer={16} textAlign='center'>
            {formatMessage({ id: 'cart.empty', defaultMessage: 'Your cart is empty.' })} <br /> <br />
            <Button basic onClick={this.handleContinueShopping}>
              <Icon name='shopping bag' />
              {formatMessage({ id: 'cart.keepShopping', defaultMessage: 'Keep Shopping' })}
            </Button>
          </GridColumn>
        </GridRow>
      </Grid>
    )
  }


  renderCartItem = (item, index) => {
    const { intl: { formatMessage }, cart, deleteCartItem, } = this.props

    const packagingType = getSafe(() => item.productOffer.companyProduct.packagingType.name, '')
    const unitName = getSafe(() => item.productOffer.companyProduct.packagingUnit.nameAbbreviation, '')
    const packagingSize = getSafe(() => item.productOffer.companyProduct.packagingSize, 0)
    const pkgAmount = getSafe(() => item.pkgAmount, 0)


    return (
      <Item key={index} bottomShadow={index !== cart.cartItems.length - 1}>
        <Grid>
          <GridRow>
            <GridColumn largeScreen={8}>
              <CustomHeader as='h2'>{item.productOffer.companyProduct.echoProduct.name}</CustomHeader>
              <FormattedMessage id='cart.manufacturer' defaultMessage='Manufacturer:' />{' '}
              {getSafe(() => item.productOffer.companyProduct.echoProduct.manufacturer.name, '')}
            </GridColumn>
            <GridColumn textAlign='right' largeScreen={8}>
              <Button negative basic onClick={() =>
                confirm('Remove item', 'Are you sure you want to remove item from Shopping Cart?')
                  .then(() => deleteCartItem(item.id))
              }>
                <Icon name='trash alternate outline' />
                {formatMessage({ id: 'global.delete', defaultMessage: 'Delete' })}
              </Button>
              <Button basic onClick={() => this.editCart(item)}>
                <Icon name='edit outline' />
                {formatMessage({ id: 'global.edit', defaultMessage: 'Edit' })}
              </Button>
            </GridColumn>
          </GridRow>

        </Grid>
        <ItemDescriptionGrid columns={2} divided>
          <GridRow>
            <GridColumn>
              <FormattedMessage id='cart.packaging' defaultMessage='Packaging:' /> <DescriptionValue><FormattedNumber minimumFractionDigits={0} value={packagingSize} />
                {' '} {unitName} &nbsp;
                <CapitalizedText>{packagingType}</CapitalizedText></DescriptionValue>
            </GridColumn>
            <GridColumn>
              <FormattedMessage id='cart.origin' defaultMessage='Origin:' />{' '} <DescriptionValue>{getSafe(() => item.productOffer.origin.name, 'N/A')}</DescriptionValue>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormattedMessage id='cart.numOfPackages' defaultMessage='# of Packages:' /> {' '}
              <DescriptionValue><FormattedNumber minimumFractionDigits={0} value={pkgAmount} /></DescriptionValue>
            </GridColumn>

            <GridColumn>
              <FormattedMessage id='cart.location' defaultMessage='Location:' /> {' '}
              <DescriptionValue>{getSafe(() => item.locationStr, 'N/A')}</DescriptionValue>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <FormattedMessage id='cart.totalQuantity' defaultMessage='Total Quantity:' /> {' '}
              <DescriptionValue>
                <FormattedNumber minimumFractionDigits={0} value={pkgAmount * packagingSize} />
                {unitName && ` ${unitName}`}
              </DescriptionValue>
            </GridColumn>

            <GridColumn>
              <FormattedMessage id='cart.expiration' defaultMessage='Expiration:' /> {' '}
              <DescriptionValue>
                {item.productOffer && item.productOffer.lotExpirationDate
                  ? moment(item.productOffer.lotExpirationDate).format(getLocaleDateFormat())
                  : 'N/A'}
              </DescriptionValue>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <FormattedMessage id='cart.fobPrice' defaultMessage='FOB Price:' /> {' '}
              <DescriptionValue>
                <FormattedNumber
                  id='cart.fobPrice'
                  style='currency'
                  currency={currency}
                  value={item.cfPricePerUOM}
                />
                {unitName && ` / ${unitName}`}
              </DescriptionValue>
            </GridColumn>
            <GridColumn>
              <FormattedMessage id='cart.productForm' defaultMessage='Form:' /> {' '}
              <DescriptionValue>
                {getSafe(() => item.productOffer.form.name, 'N/A')}
              </DescriptionValue>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <FormattedMessage id='cart.totalPerItem' defaultMessage='Total per Item:' /> {' '}
              <DescriptionValue bold>
                <FormattedNumber
                  id='cart.totalPerItem'
                  style='currency'
                  currency={currency}
                  value={item.cfPriceSubtotal}
                />
              </DescriptionValue>
            </GridColumn>

            <GridColumn>
              <FormattedMessage id='cart.condition' defaultMessage='Condition:' /> {' '}
              <DescriptionValue>
                {item.productOffer.conforming ? (
                  <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
                ) : (
                    <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
                  )}
              </DescriptionValue>
            </GridColumn>
          </GridRow>

        </ItemDescriptionGrid>
      </Item>
    )
  }


  render() {
    const { intl: { formatMessage }, cartIsFetching, cart, sidebar } = this.props
    const itemsCount = getSafe(() => cart.cartItems.length, 0)

    return (
      <>
        <Grid>
          <CartColumn mobile={14} tablet={9} computer={9}>
            <ContentSegment loading={cartIsFetching}>
              <Grid>
                <StyledRow bottomShadow>
                  <VerticalUnpaddedColumn>
                    <Header as='h2'><FormattedMessage
                      id='cart.totalItems'
                      defaultMessage={`TOTAL ITEMS: ${itemsCount}`}
                      values={{ count: itemsCount }}
                    /></Header>
                  </VerticalUnpaddedColumn>
                </StyledRow>
              </Grid>
              {
                itemsCount === 0 && !cartIsFetching
                  ? this.renderEmptyCart()
                  : getSafe(() => cart.cartItems, []).map((item, i) => this.renderCartItem(item, i))
              }
            </ContentSegment>
          </CartColumn>
          <SummaryColumn mobile={14} tablet={6} computer={5}>
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
                    <FormattedNumber style='currency' currency={currency} value={0} />
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
                <GridColumn computer={9}>
                  {itemsCount !== 0 &&
                    <Button fluid onClick={this.handleContinueShopping}>
                      <Icon name='shopping bag' />
                      {formatMessage({ id: 'cart.keepShopping', defaultMessage: 'Keep Shopping' })}
                    </Button>
                  }
                </GridColumn>
                <GridColumn computer={7}>
                  <Button fluid primary disabled={itemsCount === 0 || cartIsFetching} onClick={this.handleContinue}>
                    {formatMessage({ id: 'global.continue', defaultMessage: 'Continue' })}
                    <Icon name='arrow right' />
                  </Button>
                </GridColumn>
              </GridRow>
            </Grid>
          </SummaryColumn>
        </Grid>
        {getSafe(() => sidebar.id, false) ? <AddCart isEdit={true} /> : null}
      </>
    )
  }
}