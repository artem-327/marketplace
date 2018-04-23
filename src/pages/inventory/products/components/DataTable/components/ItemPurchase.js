import React, {Component} from 'react';
import PurchaseProductHeader from './PurchaseProductHeader'
import PurchaseProductDetails from './PurchaseProductDetails'
import PurchaseProductForm from './PurchaseProductForm'
import PurchaseAddressForm from "./PurchaseAddressForm";

class ItemPurchase extends Component {

    render() {
        return (
            <div className="item-purchase">
                <div className="purchase-title">
                    <span>
                           Chemical Purchase
                    </span>
                </div>
                <PurchaseProductHeader/>
                <div className="purchase-product">
                    <div>
                        <PurchaseProductDetails/>
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <div>
                        <PurchaseProductForm/>
                    </div>
                </div>
                <PurchaseAddressForm/>
                <div className="purchase-product-form" style={{height:"400px"}}>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                         <span>
                            Chemical Purchase
                         </span>
                    </div>
                </div>


            </div>

        );
    }
}

export default ItemPurchase