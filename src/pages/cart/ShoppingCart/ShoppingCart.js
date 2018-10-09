import React from 'react';
import "./ShoppingCart.css"
import SummaryTable from "../SummaryTable/SummaryTable"
import CartItem from "../CartItem/CartItem"
import Button from '../../../components/Button/Button'

const items = [{id: 1}, {id: 2}]

const ShoppingCart = () => {
    const CartItems = items.map(cartItem => <CartItem key={cartItem.id}/>);
    const itemsNumber = items.length;
    return (
        <div className="shopping-cart">
            <div className="shopping-cart-items">
            <header><h1>Items ({itemsNumber})</h1></header>
            {CartItems}
            </div>
            <div>
            <SummaryTable />
            <Button size="large" color="light-blue">Keep Shopping</Button>
            </div>
        </div>
    );
};

export default ShoppingCart;