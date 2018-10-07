import React, {Component} from 'react'
import PropTypes from 'prop-types'
import '../cart.css'
import Dropdown from '../../Dropdown/Dropdown'
import Spinner from "../../../components/Spinner/Spinner";
import {getUnit} from '../../../utils/functions'

class AddCart extends Component {
  componentDidMount(){
     this.props.getCurrentAdded(this.props.id)
  }

  render() {
    if(this.props.isFetching) return <Spinner/>
    const {cart, removePopup} = this.props
    const location = `${cart.warehouse.location.country}, ${cart.warehouse.location.state}` //imho location should return state and city...(just US market?)
    const unit = getUnit(cart.packaging.unit.name)
    const packageSize = `${cart.packaging.capacity} ${unit}${cart.packaging.capacity > 1 && 's'}`
    return (
      <div className="add-cart">
        <header className="add-cart-header">
          <h1>PURCHASE</h1>
          <i className="fas fa-times close-mark" onClick={removePopup} />
        </header>

        <div className="add-cart-body">
          <div className="add-cart-body-section">
            <h3>Product Info</h3>
            <div>
              <b>{cart.product.casIndexName}</b>
            </div>
            <div>
              <b>Merchant: </b>
              {cart.merchant.email}
            </div>
            <div>
              <b>Available Products: </b>
              {cart.packaging.amount.formatNumber()}
            </div>
            <div>
              <b>Packaging: </b>
              {cart.packaging.container.name}
            </div>
            <div>
              <b>Package Size: </b>
              {packageSize}
            </div>
            <div>
              <b>Form: </b>
              {cart.productForm.name}
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
              <Dropdown opns={[{id: 1, name: 'test'}]} placeholder="Select Price Level" />
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

        <footer className="add-cart-footer">
          <button className="button">Cancel</button>
          <button className="button green">Continue</button>
        </footer>
      </div>
    )
  }
}

export default AddCart

AddCart.propTypes = {
  id: PropTypes.number,
  removePopup: PropTypes.func
}
