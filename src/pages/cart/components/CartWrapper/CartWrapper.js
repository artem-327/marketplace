import React from 'react';
import "../../ShoppingCart/ShoppingCart.css"


const CartWrapper = ({mainTitle, children}) => {
    return (
        <div className="shopping-cart">
          <h1 className='header inv-header'>{mainTitle}</h1>
          <div className="shopping-cart-body">
            {children[0]}  
            {children[1]}
          </div>
        </div>
    );
};

export default CartWrapper;
