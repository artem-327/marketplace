import React, { Component } from 'react'
import { array, string, func } from 'prop-types'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Segment } from 'semantic-ui-react'
import './styles.scss'
import { RelaxedRow, HeaderTextRow } from './styledComponents'

export default class CartItemSummary extends Component {

  renderItem = ({ item, lastChild }) => {
    let { productOffer } = item
    let { deleteCart } = this.props
    
    //TODO Change when backend provides this info
    let currency = 'USD'
    return (
      <>
        <GridColumn computer={16}>
          <Grid columns={2} className='light-gray cart-item-summary'>
            <HeaderTextRow>
              <GridColumn>
                {productOffer.product.casProduct.casIndexName}
              </GridColumn>

              <GridColumn floated='right'>
                <span
                  className='headerAddtext'
                  onClick={() => deleteCart(item.id)}>
                  <FormattedMessage
                    id='global.remove'
                    defaultMessage='Remove'
                  />
                </span>
              </GridColumn>
            </HeaderTextRow>


            <RelaxedRow>
              <GridColumn>
                <FormattedMessage
                  id='cart.merchant'
                  defaultMessage='Merchant'
                />
              </GridColumn>

              <GridColumn floated='right'>
                {productOffer.merchant && productOffer.merchant.company.name}
              </GridColumn>
            </RelaxedRow>


            <RelaxedRow >
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



            <RelaxedRow >
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



            <RelaxedRow >
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


            <RelaxedRow >
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


            <HeaderTextRow>
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
                  value={item.price}
                />
              </GridColumn>
            </HeaderTextRow>

            {!lastChild ? <Divider /> : null}
          </Grid>
        </GridColumn>

      </>
    )

  }

  render() {
    let { cartItems, header } = this.props


    return (
      <Segment>
        <Grid className='bottom-padded'>
          <GridRow className='header'>
            <GridColumn>
              <Header>{header}</Header>
            </GridColumn>
          </GridRow>
          {
            cartItems.map((item, i) => this.renderItem({ item, i, lastChild: (cartItems.length - 1) === i }))
          }

        </Grid>

      </Segment>
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
