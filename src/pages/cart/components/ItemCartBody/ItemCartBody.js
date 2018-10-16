import React from 'react';
import PropTypes from "prop-types";
import Button from '../../../../components/Button/Button'
import AddCart from "../AddCart"
const ItemCartBody = ({cartItem, addPopup, removeProductFromCart, history}) => {
  const {productOffer} = cartItem;
  //const location = productOffer.warehouse.address.province.name;
  return (
    <div className="item-cart">
      <div className="item-cart-body">
        <div className="item-cart-body-section">
          <div>
            <b>{productOffer.product.casIndexName}</b>
          </div>
          <div>
            Merchant: {productOffer.merchant.email}
        </div>
          <div>
            Location: location (!!)
        </div>
          <div>
            Price Per Lb: {productOffer.pricing.price}
        </div>
          <div>
            Total Weight: quantity * neco (?)
        </div>
        </div>
        <div className="item-cart-body-section">
          <div>
            Origin: {productOffer.origin}
        </div>
          <div>
            Assay: (?)
        </div>
          <div>
            Condition: {productOffer.productCondition.name}
        </div>
          <div>
            Form: {productOffer.productForm.name}
        </div>
        </div>
      </div>
      <footer className="add-cart-footer">
        <Button color="grey" onClick={() => removeProductFromCart(productOffer.id)}>Remove</Button>
        <Button 
          color="blue" 
          onClick={() => addPopup(<AddCart id={productOffer.id} history={history}/>)} 
        >Edit</Button>
      </footer>
    </div>
  );
};

export default ItemCartBody;

ItemCartBody.propTypes = {
  addPopup: PropTypes.func,
  cartItem: PropTypes.object,
  removeProductFromCart: PropTypes.func
}
