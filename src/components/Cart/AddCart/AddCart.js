import React, {Component} from 'react';
// import { Translate } from 'react-localize-redux';
import '../cart.css';
import Dropdown from "../../Dropdown/Dropdown";

class AddCart extends Component {

    componentDidMount(){
        this.props.getCurrentAdded(this.props.id)
    }

    render() {
        
        return (
            
            <div className="add-cart">
                <div className="add-cart-header">
                    <div>PURCHASE</div>
                    <div className="fas fa-times close-mark" onClick={()=>this.props.removePopup()}> </div>
                </div>
                <hr/>
                
                <div className="add-cart-body">
                    <div className="add-cart-body-info">
                        <div className="add-cart-body-info-data">
                            <h1>Product Info</h1>
                            <div><b>{this.props.name}</b></div>
                            <div><b>Merchant: </b> {this.props.merchant}</div>
                            <div><b>Available Products: </b> {this.props.availableProducts}</div>
                            <div><b>Packaging: </b></div>
                            <div><b>Package Size: </b>{this.props.packageSize}</div>
                            <div><b>Form: </b></div>
                            <div><b>Location: </b> {this.props.location}</div>

                        </div>
                        <div className="add-cart-body-info-attachments">
                            <div><b>Attachments: </b></div>
                            
                        </div>
                    </div>
                    <hr className="vl"/>
                    <div className="add-cart-body-selecion">
                    <div className="add-cart-body-selection-schroll">
                            <h1>Product Info</h1>
                            <div><b>Select Price Level</b></div>
                            <div><Dropdown opns={[]} placeholder='Select Quantity'/></div>
                            <div><b>Select Quantity</b></div>
                            <div><Dropdown opns={[]} placeholder='Select Quantity'/></div>
                    </div>
                        <div className="add-cart-body-selection-totals">
                            <div><b>Total Quantity: </b></div>
                            <div><b>Price/LB: </b></div>
                            <div><b>Delivered Price/LB: </b></div>
                            <div><b>Total: </b></div>
                        </div>
                    </div>
                </div>

                <div className="add-cart-footer">
                    <button className='button'>Button1</button>
                    <button className='button green'>Button2</button>
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