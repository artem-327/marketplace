import React from 'react';

const CartItem = () => {
  return (
    <div className="item-cart">
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
      <footer className="add-cart-footer">
        <button className="button grey">Remove</button>
        <button className="button blue">Edit</button>
      </footer>
    </div>
  );
};

export default CartItem;