import React, { Component } from 'react'
import { object, func } from 'prop-types'
import confirm from '../../../../components/Confirmable/confirm'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { checkToken } from '../../../../utils/auth'
import { Button } from 'semantic-ui-react'
import { FormattedUnit } from '~/components/formatted-messages'

export default class ItemCartBody extends Component {
  render() {
    let { cartItem, deleteCart } = this.props
    let { productOffer } = cartItem

    let unitName = productOffer.product.packagingUnit.nameAbbreviation

    return (
      <div className='item-cart'>
        <div className='item-cart-body'>
          <div className='item-cart-body-section'>
            <div className='item-cart-body-section-name'>
              {productOffer.product.casProduct.casIndexName}
            </div>
            <div>
              {/* <FormattedMessage
                id='cart.merchant.email'
                defaultMessage={'Merchant: ' + productOffer.merchant ? productOffer.merchant.email : productOffer.warehouse.address.contactEmail}
                values={{ merchant: productOffer.merchant ? productOffer.merchant.company.name : productOffer.warehouse.address.contactEmail }}
              /> */}
            </div>
            <div>
              <FormattedMessage
                id='cart.location'
                defaultMessage={'Location: ' + location}
                values={{ location: cartItem.locationStr }}
              />
            </div>
            <div>
              <span>Price per {unitName}: </span>
              <FormattedNumber
                id='cart.pricePer'
                style='currency'
                currency={cartItem.productOffer.price.currency.code}
                value={cartItem.pricing.price}
              />
            </div>
            <div>
              <span>Total Weight: </span>
              <FormattedUnit
                value={cartItem.quantity * productOffer.product.packagingSize}
                unit={unitName} separator=''
              />
            </div>
          </div>
          <div className='item-cart-body-section'>
            <div>
              <FormattedMessage
                id='cart.origin'
                defaultMessage={`Origin: ${productOffer.origin.name} `}
                values={{ origin: productOffer.origin.name }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.assay'
                defaultMessage={`Assay: ${productOffer.assayMin || ''} - ${productOffer.assayMax || ''} `}
                values={{ first: productOffer.assayMin, second: productOffer.assayMax }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.condition'
                defaultMessage={`Condition: ${productOffer.productCondition.name} `}
                values={{ condition: productOffer.productCondition.name }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.form'
                defaultMessage={`Form ${productOffer.productForm.name} `}
                values={{ form: productOffer.productForm.name }}
              />
            </div>
          </div>
        </div>
        <footer className='popup-footer'>
          <Button control={Button}
            color='grey'
            onClick={() => confirm('Remove item', 'Are you sure you want to remove item from Shopping Cart?')
              .then(() => {
                // `proceed`
                // remove Edit Cart popup if opened currently deleted offer
                if (checkToken(this.props)) return
                deleteCart(cartItem.id)
              }, (result) => {
                // `cancel`
              }
              )}>
            <FormattedMessage
              id='global.remove'
              defaultMessage='Remove'
            />
          </Button>
          <Button control={Button}
            color='blue'
            onClick={() => this.props.editCart(cartItem)}>
            <FormattedMessage
              id='global.edit'
              defaultMessage='Edit'
            />
          </Button>
        </footer>
      </div>
    )
  }
}

ItemCartBody.propTypes = {
  cartItem: object,
  editCart: func,
  deleteCart: func
}
