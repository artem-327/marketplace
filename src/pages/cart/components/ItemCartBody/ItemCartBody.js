import React, { Component } from 'react';
import PropTypes from "prop-types";
import AddCart from "../AddCart"
import {getUnit} from '../../../../utils/functions';
import confirm from '../../../../components/Confirmable/confirm';
import {FormattedMessage} from 'react-intl';
import {checkToken} from "../../../../utils/auth";
import { Button } from "semantic-ui-react"

class ItemCartBody extends Component {

  editCart(offerId, cartId) {
      // check that new popup has different id than previous
      if (checkToken(this.props)) return;
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
      const unit = productOffer.product.packagingUnit
      const size = productOffer.product.packagingSize
      const unitName = `${getUnit(unit.name)}${size > 1 && 's'}`;
      const location = `${productOffer.warehouse.address.city}, ${productOffer.warehouse.address.province.name}`;
      return (
          <div className="item-cart">
              <div className="item-cart-body">
                  <div className="item-cart-body-section">
                      <div className="item-cart-body-section-name">
                          {productOffer.product.casProduct.casIndexName}
                      </div>
                      <div>
                          <FormattedMessage
                            id='cart.merchant.email'
                            defaultMessage={'Merchant: ' + productOffer.merchant.email}
                            values={{merchant: productOffer.merchant.email}}
                          />
                      </div>
                      <div>
                          <FormattedMessage
                              id='cart.location'
                              defaultMessage={'Location: ' + location}
                              values={{location: location}}
                          />
                      </div>
                      <div>
                          <FormattedMessage
                            id='cart.pricePer'
                            defaultMessage={`Price per ${'Lb'}: $${productOffer.pricing.price}`}
                            values={{unit: 'Lb', price: productOffer.pricing.price}}
                          />
                      </div>
                      <div>
                          <FormattedMessage
                            id='cart.totalWeight'
                            defaultMessage={`Total Weight: ${cartItem.quantity * productOffer.product.packagingSize} ${unitName}`}
                            values={{weight: cartItem.quantity * productOffer.product.packagingSize, unit: unitName}}
                          />
                      </div>
                  </div>
                  <div className="item-cart-body-section">
                      <div>
                          <FormattedMessage
                            id='cart.origin'
                            defaultMessage={`Origin: ${productOffer.origin.name}`}
                            values={{origin: productOffer.origin.name}}
                          />
                      </div>
                      <div>
                          <FormattedMessage
                              id='cart.assay'
                              defaultMessage={`Assay: ${productOffer.assayMin || ''} - ${productOffer.assayMax || ''}`}
                              values={{first: productOffer.origin.name || '', second: productOffer.assayMax || ''}}
                          />
                      </div>
                      <div>
                          <FormattedMessage
                            id='cart.condition'
                            defaultMessage={`Condition: ${productOffer.productCondition.name}`}
                            values={{condition: productOffer.productCondition.name}}
                          />
                      </div>
                      <div>
                          <FormattedMessage
                            id='cart.form'
                            defaultMessage={`Form ${productOffer.productForm.name}`}
                            values={{form: productOffer.productForm.name}}
                          />
                          Form: {productOffer.productForm.name}
                      </div>
                  </div>
              </div>
              <footer className="popup-footer">
                  <Button control={Button}
                           color="grey"
                           onClick={() => confirm('Remove item', 'Are you sure you want to remove item from Shopping Cart?').then(
                              (result) => {
                                  // `proceed`
                                  // remove Edit Cart popup if opened currently deleted offer
                                  if (checkToken(this.props)) return;

                                  if (AddCart.openedPopup.id === productOffer.id) {
                                      AddCart.openedPopup.id = false;
                                      this.props.removePopup();
                                  }
                                  deleteCart(cartItem.id)
                              },
                              (result) => {
                                  // `cancel`
                              }
                          )}>
                      <FormattedMessage
                        id='global.remove'
                        defaultMessage='Remove'
                      />
                  </Button>
                  <Button control={Button}
                           color="blue"
                           onClick={() => this.editCart(productOffer.id, cartItem.id)}
                  >
                     <FormattedMessage
                        id='global.edit'
                        defaultMessage='Edit'
                     />
                  </Button>
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
