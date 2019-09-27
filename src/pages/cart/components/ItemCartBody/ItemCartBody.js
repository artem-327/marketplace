import React, { Component } from 'react'
import { object, func } from 'prop-types'
import confirm from '../../../../components/Confirmable/confirm'
import { FormattedMessage, FormattedNumber } from 'react-intl'

import { Button } from 'semantic-ui-react'
import { FormattedUnit } from '~/components/formatted-messages'

export default class ItemCartBody extends Component {
  render() {
    let { cartItem, deleteCartItem, casNumberChemName } = this.props
    let { productOffer } = cartItem

    let unitName = productOffer.companyProduct.packagingUnit.nameAbbreviation

    return (
      <div className='item-cart'>
        <div className='item-cart-body'>
          <div className='item-cart-body-section'>

            <div className='item-cart-body-section-name'>
              {productOffer.companyProduct.echoProduct.code + ' - ' + productOffer.companyProduct.echoProduct.name}
            </div>

            <div className='item-cart-body-section-name'>
              {casNumberChemName}
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
              <FormattedMessage id='global.pricePer' defaultMessage={`Price per ${unitName}`} values={{ unit: unitName }} />:{' '}
              <FormattedNumber
                id='cart.pricePer'
                style='currency'
                currency={cartItem.productOffer.pricingTiers[0].price.currency.code}
                value={cartItem.productOffer.pricingTiers[0].price.amount}
              />
            </div>
            <div>
              <FormattedMessage id='global.totalWeight' defaultMessage='Total Weight' />:{' '}
              <FormattedUnit
                value={cartItem.quantity * productOffer.companyProduct.packagingSize}
                unit={unitName} separator=''
              />
            </div>
          </div>
          <div className='item-cart-body-section'>
            <div>
              <FormattedMessage
                id='cart.origin'
                defaultMessage={`Origin: ${productOffer.origin ? productOffer.origin.name : 'N/A'} `}
                values={{ origin: productOffer.origin ? productOffer.origin.name : 'N/A'}}
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
                defaultMessage={`Condition: ${productOffer.productCondition ? productOffer.productCondition.name : 'N/A'} `}
                values={{ condition: productOffer.productCondition ? productOffer.productCondition.name : 'N/A' }}
              />
            </div>
            <div>
              <FormattedMessage
                id='cart.form'
                defaultMessage={`Form ${productOffer.productForm ? productOffer.productForm.name : 'N/A'} `}
                values={{ form: productOffer.productForm ? productOffer.productForm.name : 'N/A' }}
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
                deleteCartItem(cartItem.id)
              }, (result) => {
                // `cancel`
              }
              )}
            data-test='item_cart_remove_btn'>
            <FormattedMessage id='global.remove' defaultMessage='Remove'>{(text) => text}</FormattedMessage>
          </Button>
          <Button control={Button}
            color='blue'
            onClick={() => this.props.editCart(cartItem)}
            data-test='item_cart_edit_btn'>
            <FormattedMessage id='global.edit' defaultMessage='Edit'>{(text) => text}</FormattedMessage>
          </Button>
        </footer>
      </div>
    )
  }
}

ItemCartBody.propTypes = {
  cartItem: object,
  editCart: func,
  deleteCartItem: func,
  casNumberChemName: object
}
