import React, {Component} from 'react';
// import { Translate } from 'react-localize-redux';
import '../cart.css';
import Dropdown from "../../Dropdown/Dropdown";
import {removePopup} from "../../../modules/popup";

class AddCart extends Component {

    componentDidMount(){
        this.props.getCurrentAdded();
    }

    render() {
        let {name, merchant, availableProducts, packageSize, quantity } = this.props
        return (
            <div className="add-cart">
                <i className="fas fa-times close-mark" onClick={()=>this.props.removePopup()}> </i>
                <h1><span className='check-mark'> </span>ADDED TO CART</h1>
                <p className='name'>{name}</p>
                <p><b>Merchan: </b>{merchant}</p>
                <p><b>Available Products: </b>{availableProducts}</p>
                <p><b>Package Size: </b>{packageSize}</p>
                <Dropdown opns={quantity} placeholder='Select Quantity'/>
                <p className='price'>Totat: unknown</p>
                <div className='button-group'>
                    <button className='button'>View Cart</button>
                    <button className='button green'>Checkout</button>
                </div>
            </div>
        );
    }
}

AddCart.propTypes = {
    // links: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         label: PropTypes.string,
    //         url: PropTypes.string,
    //         class: PropTypes.string,
    //         exact: PropTypes.bool,
    //     })
    // ),
    // search: PropTypes.bool,
    // filter: PropTypes.bool,
};


export default AddCart;