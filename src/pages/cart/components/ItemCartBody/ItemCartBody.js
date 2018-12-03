import React, { Component } from 'react';
import PropTypes from "prop-types";
import Button from '../../../../components/Button/Button'
import AddCart from "../AddCart"
import {getUnit} from '../../../../utils/functions';
import confirm from '../../../../components/Confirmable/confirm';

class ItemCartBody extends Component {

  editCart(offerId, cartId) {
      // check that new popup has different id than previous
      if (AddCart.openedPopup.id !== offerId) {
          // previous popup has different id - remove it
          if (AddCart.openedPopup.id) {
              AddCart.openedPopup.id = false;
              this.props.removePopup();
          }

          // create new popup
          AddCart.openedPopup.id = offerId;
          this.props.addPopup(<AddCart id={offerId} orderId={cartId} isEdit
                                       history={this.props.history} className='add-cart-popup'/>);
      }
  }

  render() {
      const {cartItem, deleteCart} = this.props;
      const {productOffer} = cartItem;
      const {unit, capacity} = productOffer.packaging;
      const unitName = `${getUnit(unit.name)}${capacity > 1 && 's'}`;
      const location = `${productOffer.warehouse.address.city}, ${productOffer.warehouse.address.province.name}`;
      return (
          <div className="item-cart">
              <div className="item-cart-body">
                  <div className="item-cart-body-section">
                      <div className="item-cart-body-section-name">
                          {productOffer.product.casIndexName}
                      </div>
                      <div>
                          Merchant: {productOffer.merchant.email}
                      </div>
                      <div>
                          Location: {location}
                      </div>
                      <div>
                          Price Per Lb: ${productOffer.pricing.price}
                      </div>
                      <div>
                          Total Weight: {cartItem.quantity * productOffer.packaging.capacity} {unitName}
                      </div>
                  </div>
                  <div className="item-cart-body-section">
                      <div>
                          Origin: {productOffer.origin.name}
                      </div>
                      <div>
                          Assay: {productOffer.assayMin} - {productOffer.assayMax}
                      </div>
                      <div>
                          Condition: {productOffer.productCondition.name}
                      </div>
                      <div>
                          Form: {productOffer.productForm.name}
                      </div>
                  </div>
              </div>
              <footer className="popup-footer">
                  <Button color="grey"
                          onClick={() => confirm('Remove item', 'Are you sure you want to remove item from Shopping Cart?').then(
                              (result) => {
                                  // `proceed`
                                  // remove Edit Cart popup if opened currently deleted offer
                                  if (AddCart.openedPopup.id === productOffer.id) {
                                      AddCart.openedPopup.id = false;
                                      this.props.removePopup();
                                  }
                                  deleteCart(cartItem.id)
                              },
                              (result) => {
                                  // `cancel`
                              }
                          )}>Remove</Button>
                  <Button
                      color="blue"
                      onClick={() => this.editCart(productOffer.id, cartItem.id)}
                  >Edit</Button>
              </footer>
          </div>
      );
  }
}

export default ItemCartBody;

ItemCartBody.propTypes = {
  addPopup: PropTypes.func,
  cartItem: PropTypes.object,
  deleteCart: PropTypes.func
}
