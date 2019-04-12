import React from 'react';
import PropTypes from "prop-types";
import {FormattedMessage} from 'react-intl';

const CartItemSummary = ({cartItem,  deleteCart, itemIndex}) => {
    const {productOffer} = cartItem;
    const location =`${productOffer.warehouse.address.city}, ${productOffer.warehouse.address.province.name}`;
    return (
      <div className="cart-item-summary">
        <table>
          <tbody>
            <tr>
                <td className="title">
                    <FormattedMessage
                        id='cart.item'
                        defaultMessage={'Item ' + itemIndex}
                        values={{index: itemIndex}}
                    />
                </td>
                <td className="action">
                    <span
                        className="headerAddtext"
                        onClick={() => deleteCart(productOffer.id)}>
                        <FormattedMessage
                            id='global.remove'
                            defaultMessage='Remove'
                        />
                    </span>
                </td>
            </tr>
            <tr>
                <td
                    className="subtitle"
                    colspan="2">
                        {productOffer.product.casIndexName}
                </td>
            </tr>
            <tr>
                <td>
                    <FormattedMessage
                        id='cart.merchant'
                        defaultMessage='Merchant'
                    />
                </td>
                <td>{productOffer.merchant.email}</td>
            </tr>
            <tr>
                <td>
                    <FormattedMessage
                        id='global.location'
                        defaultMessage='Location'
                    />
                </td>
                <td>{location}</td>
            </tr>
            <tr>
                <td>
                    <FormattedMessage
                        id='global.quantity'
                        defaultMessage='Quantity'
                    />
                </td>
                <td>
                    <FormattedMessage
                        id='cart.packs'
                        defaultMessage={cartItem.quantity + ' Packs'}
                        values={{quantity: cartItem.quantity}}
                    />
                </td>
            </tr>
            <tr>
                <td>
                    <FormattedMessage
                        id='global.weight'
                        defaultMessage='Weight'
                    />
                </td>
                <td>
                    {cartItem.quantity * productOffer.product.packagingSize} lbs
                </td>
            </tr>
            <tr>
                <td>
                    <FormattedMessage
                        id='global.pricePer'
                        defaultMessage='Price per Lb'
                        values={{unit: 'Lb'}}
                    />
                </td>
                <td>{productOffer.pricing.price}$</td>
            </tr>
            <tr className="total">
                <td>
                    <FormattedMessage
                        id='cart.productTotal'
                        defaultMessage='Product Total'
                    />
                </td>
                <td>{cartItem.selectedOfferPrice}$</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
};

export default CartItemSummary;

CartItemSummary.propTypes = {
  cartItem: PropTypes.object,
  deleteCart: PropTypes.func
}
