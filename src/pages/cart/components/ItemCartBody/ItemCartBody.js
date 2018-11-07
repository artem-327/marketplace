import React from 'react';
import PropTypes from "prop-types";
import Button from '../../../../components/Button/Button'
import AddCart from "../AddCart"
import {getUnit} from '../../../../utils/functions'

const ItemCartBody = ({cartItem, addPopup, removeProductFromCart, history}) => {
  const {productOffer} = cartItem;
  const {unit, capacity} = productOffer.packaging;
  const unitName = `${getUnit(unit.name)}${capacity > 1 && 's'}`;
  const location =`${productOffer.warehouse.address.city}, ${productOffer.warehouse.address.province.name}`;
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
      <footer className="add-cart-footer">
        <Button color="grey" onClick={() => removeProductFromCart(productOffer.id)}>Remove</Button>
        <Button 
          color="blue" 
          onClick={() => addPopup(<AddCart id={productOffer.id} isEdit
          history={history}/>)} 
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
