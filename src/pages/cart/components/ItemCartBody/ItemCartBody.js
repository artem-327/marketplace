import React, { Component } from 'react'
import { object, func } from 'prop-types'
import AddCart from '../AddCart'
import { getUnit } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
import { FormattedMessage } from 'react-intl'
import { checkToken } from '../../../../utils/auth'
import { Button } from 'semantic-ui-react'

export default class ItemCartBody extends Component {
  render() {
    const { cartItem, deleteCart } = this.props
    const { productOffer } = cartItem
    const unit = productOffer.product.packagingUnit
    const size = productOffer.product.packagingSize
    const unitName = `${getUnit(unit.name)}${size > 1 && 's'}`
    const location = `${productOffer.warehouse.address.city}, ${productOffer.warehouse.address.city.name}`

    return (
      <div className='item-cart'>
        <div className='item-cart-body'>
          <div className='item-cart-body-section'>
            <div className='item-cart-body-section-name'>
              {productOffer.product.casProduct.casIndexName}
            </div>
            <div>
              <FormattedMessage
                id='cart.merchant.email'
                defaultMessage={'Merchant: ' + productOffer.merchant.email}
                values={{ merchant: productOffer.merchant.email }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.location'
                defaultMessage={'Location: ' + location}
                values={{ location: location }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.pricePer'
                defaultMessage={`Price per ${'Lb'}: $${productOffer.pricing.price.amount}`}
                values={{ unit: 'Lb', price: productOffer.pricing.price.amount }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.totalWeight'
                defaultMessage={`Total Weight: ${cartItem.quantity * productOffer.product.packagingSize} ${unitName}`}
                values={{ weight: cartItem.quantity * productOffer.product.packagingSize, unit: unitName }}
              />
            </div>
          </div>
          <div className='item-cart-body-section'>
            <div>
              <FormattedMessage
                id='cart.origin'
                defaultMessage={`Origin: ${productOffer.origin.name}`}
                values={{ origin: productOffer.origin.name }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.assay'
                defaultMessage={`Assay: ${productOffer.assayMin || ''} - ${productOffer.assayMax || ''}`}
                values={{ first: productOffer.origin.name || '', second: productOffer.assayMax || '' }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.condition'
                defaultMessage={`Condition: ${productOffer.productCondition.name}`}
                values={{ condition: productOffer.productCondition.name }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.form'
                defaultMessage={`Form ${productOffer.productForm.name}`}
                values={{ form: productOffer.productForm.name }}
              />
              Form: {productOffer.productForm.name}
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
                if (checkToken(this.props)) return;
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
