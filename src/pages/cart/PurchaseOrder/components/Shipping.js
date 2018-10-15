import React from 'react';
import CartItem from "../../components/CartItem/CartItem";
import DropdownRedux from "../../../../components/Dropdown/DropdownRedux";
import {required} from "../../../../utils/validation";

const Shipping = () => {
    return (
        <CartItem headerTitle="1. Shipping">
        <div className="purchase-order-section">
          <div>
            Shipping Address
          </div>
        </div>
      </CartItem>
    );
};

export default Shipping;
