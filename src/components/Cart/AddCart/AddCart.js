import React, {Component} from 'react';
// import { Translate } from 'react-localize-redux';
import '../cart.css';
import Dropdown from "../../Dropdown/Dropdown";

class AddCart extends Component {

    componentDidMount(){
        this.props.getCurrentAdded();
    }

    render() {
        let {name, merchant, availableProducts, packageSize, quantity } = this.props
        return (
            <div className="add-cart">
               <h1>ADDED TO CART</h1>
                <p className='name'>{name}</p>
                <p><b>Merchan: </b>{merchant}</p>
                <p><b>Available Products: </b>{availableProducts}</p>
                <p><b>Package Size: </b>{packageSize}</p>
                <Dropdown opns={quantity} placeholder='Select Quantity'/>
                <p className='price'>unknown</p>
                <button className='button'>View Cart</button>
                <button className='button'>Checkout</button>
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