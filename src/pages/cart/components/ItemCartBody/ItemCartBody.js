import React from 'react';
import Button from '../../../../components/Button/Button'

const ItemCartBody = ({cartItem}) => {
  const {productOffer} = cartItem;
  const location = `${productOffer.warehouse.location.country}, ${productOffer.warehouse.location.state}`
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
            Location:{location}
        </div>
          <div>
            Price Per Lb: productOffer.pricing.price (?)
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
        <Button color="grey">Remove</Button>
        <Button color="blue">Edit</Button>
      </footer>
    </div>
  );
};

export default ItemCartBody;