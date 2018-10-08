import React from 'react';
import './CartItem.css';

const CartItem = () => {
  return (
    <div className="item-cart-body">
      <div className="item-cart-body-section">
        <div>
          <b>product.casIndexName</b>
        </div>
        <div>
          Merchant:
        </div>
        <div>
          Location:
        </div>
        <div>
          Price Per Lb:
        </div>
        <div>
          Total Weight:
        </div>
      </div>
      <div className="item-cart-body-section">
        <div>
          Origin:
        </div>
        <div>
          Assay:
        </div>
        <div>
          Condition:
        </div>
        <div>
          Liquid:
        </div>
      </div>
    </div>
  );
};

export default CartItem;