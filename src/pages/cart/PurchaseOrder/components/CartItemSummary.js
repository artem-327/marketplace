import React, { Component } from 'react'
import { array, string, func } from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Segment, Divider } from 'semantic-ui-react'
import styled from 'styled-components'

const RelaxedSegment = styled(Segment)`
  margin-top: 0px !important;
  background-color: #fafafa !important;
`

const RelaxedRow = styled(GridRow)`
  padding-bottom: 4px !important;
  padding-top: 10px !important;
`

const HeaderTextRow = styled(RelaxedRow)`
  font-size: 1.25rem;
  font-weight: 500;
`

const Title = styled(HeaderTextRow)`
  background-color: #e7e7e7;
  text-transform: uppercase;
`


export default class CartItemSummary extends Component {

  renderItem = (item, i, lastChild) => {
    let { productOffer } = item

    let currency = productOffer.pricing.price.currency.code

    return (
      <>
        <HeaderTextRow columns={2}>
          <GridColumn>
            {`Item ${i + 1}`}
          </GridColumn>
          <GridColumn floated='right'>
            <span
              className='headerAddtext'
              onClick={() => deleteCart(productOffer.id)}
              data-test={`cart_delete_item_${i}`}>
              <FormattedMessage
                id='global.remove'
                defaultMessage='Remove'
              />
            </span>
          </GridColumn>
        </HeaderTextRow>

        <HeaderTextRow>
          <GridColumn>
            {productOffer.product.casProduct.casIndexName}
          </GridColumn>
        </HeaderTextRow>

        <RelaxedRow columns={2}>
          <GridColumn>
            <FormattedMessage
              id='cart.merchant'
              defaultMessage='Merchant'
            />
          </GridColumn>

          <GridColumn floated='right'>
            {productOffer.merchant.email}
          </GridColumn>
        </RelaxedRow>


        <RelaxedRow columns={2}>
          <GridColumn>
            <FormattedMessage
              id='global.location'
              defaultMessage='Location'
            />
          </GridColumn>

          <GridColumn floated='right'>
            {item.locationStr}
          </GridColumn>
        </RelaxedRow>



        <RelaxedRow columns={2}>
          <GridColumn>
            <FormattedMessage
              id='global.quantity'
              defaultMessage='Quantity'
            />
          </GridColumn>

          <GridColumn floated='right'>
            <FormattedNumber
              id='cart.packs'
              value={item.quantity}
            /> {productOffer.product.packagingType.name}
          </GridColumn>
        </RelaxedRow>



        <RelaxedRow columns={2}>
          <GridColumn>
            <FormattedMessage
              id='global.weight'
              defaultMessage='Weight'
            />
          </GridColumn>

          <GridColumn floated='right'>
            <FormattedNumber
              id='cart.packs'
              value={item.quantity * productOffer.product.packagingSize}
            /> {productOffer.product.packagingUnit.nameAbbreviation}
          </GridColumn>
        </RelaxedRow>


        <RelaxedRow columns={2}>
          <GridColumn>
            <FormattedMessage
              id='global.pricePer'
              values={{ unit: productOffer.product.packagingUnit.nameAbbreviation }}
            />
          </GridColumn>

          <GridColumn floated='right'>
            <FormattedNumber
              style='currency'
              currency={currency}
              id='cart.packs'
              value={item.pricing.price}
            />
          </GridColumn>
        </RelaxedRow>


        <HeaderTextRow columns={2}>
          <GridColumn>
            <FormattedMessage
              id='cart.productTotal'
              defaultMessage='Product Total'
            />
          </GridColumn>

          <GridColumn floated='right'>
            <FormattedNumber
              style='currency'
              currency={currency}
              value={item.quantity * productOffer.product.packagingSize * productOffer.pricing.price.amount}
            />
          </GridColumn>
        </HeaderTextRow>

        {!lastChild ? <Divider /> : null}


      </>
    )

  }

  render() {
    let { cartItems, header } = this.props

   
    return (
      <RelaxedSegment className='cart-item-summary'>
        <Grid>
          <Title className='header'>
           
              <Header>{header}</Header>
           
          </Title>
          {
            cartItems.map((item, i) => this.renderItem(item, i, (cartItems.length - 1) === i))
          }


        </Grid>

      </RelaxedSegment>
    )
  }
}


CartItemSummary.propTypes = {
  cartItems: array,
  deleteCart: func,
  header: string
}

CartItemSummary.defaultProps = {
  header: 'YOUR ORDER'
}
