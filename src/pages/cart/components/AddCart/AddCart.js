import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Dropdown from '../../../../components/Dropdown/Dropdown'
import Spinner from '../../../../components/Spinner/Spinner'
import PopupComponent from '../../../../components/PopUp/PopupComponent'
import {getUnit} from '../../../../utils/functions'

import './AddCart.css';

class AddCart extends Component {
  componentDidMount() {
    this.props.getProductOffer(this.props.id)
  }

  //TODO Fix cart to send edited data
  handleContinue = () => {
    const {removePopup, createCartItem, offer} = this.props;
    const offerpayload= {
        "productOffer": offer.id,
        "quantity": 62607202
    }
    createCartItem(offerpayload)
    this.props.history.push("/cart/shopping-cart")
    removePopup()
  }

  render() {
    const {offer, removePopup, isFetching} = this.props;
    if (isFetching) return <Spinner />
    const location = offer.warehouse.address.province.name;
    const unit = getUnit(offer.packaging.unit.name)
    const packageSize = `${offer.packaging.capacity} ${unit}${offer.packaging.capacity > 1 && 's'}`
    const {tiers} = offer.pricing
    const priceLevelOptions = tiers.map(i => {
      i.name = `${i.quantityFrom} - ${i.quantityTo} / $${i.price}`;
      return i;
    })
    return (
        <PopupComponent handleContinue={this.handleContinue} removePopup={removePopup} headerTitle="Purchase">
        <div className="add-cart-body">
          <div className="add-cart-body-section">
            <h3>Product Info</h3>
            <div>
              <b>{offer.product.casIndexName}</b>
            </div>
            <div>
              <b>Merchant: </b>
              {offer.merchant.email}
            </div>
            <div>
              <b>Available Products: </b>
              {offer.packaging.amount.formatNumber()}
            </div>
            <div>
              <b>Packaging: </b>
              {offer.packaging.container.name}
            </div>
            <div>
              <b>Package Size: </b>
              {packageSize}
            </div>
            <div>
              <b>Form: </b>
              {offer.productForm.name}
            </div>
            <div>
              <b>Location: </b>
              {location}{' '}
            </div>
            <div>
              <b>Attachments: </b>
            </div>
          </div>

          <div className="divider" />

          <div className="add-cart-body-section">
            <h3>Purchase Info</h3>
            <div>
              <b>Select Price Level</b>
              <Dropdown opns={priceLevelOptions} placeholder="Select Price Level" />
            </div>
            <div>
              <b>Select Quantity</b>
              <Dropdown opns={[]} placeholder="Select Quantity" />
            </div>
            <div>
              <b>Total Quantity: </b>
            </div>
            <div>
              <b>Price/LB: </b>
            </div>
            <div>
              <b>Delivered Price/LB: </b>
            </div>
            <div>
              <b>Total: </b>
            </div>
          </div>
          </div>
        </PopupComponent>
    )
  }
}

export default AddCart

AddCart.propTypes = {
  offer: PropTypes.object,
  createCartItem: PropTypes.func,
  id: PropTypes.number,
  isFetching: PropTypes.bool,
  removePopup: PropTypes.func,
}
