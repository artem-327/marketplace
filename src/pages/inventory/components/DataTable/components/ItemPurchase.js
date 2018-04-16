import React, {Component} from 'react';
import PurchaseProductHeader from './PurchaseProductHeader'
import PurchaseProductDetails from './PurchaseProductDetails'

class ItemPurchase extends Component {

    render() {
        return (
            <div className="item-purchase">
               <div className="row purchase-title">
                   <span>
                           Chemical Purchase
                   </span>
               </div>
               <PurchaseProductHeader/>
               <PurchaseProductDetails/>
                <div className="row purchase-product-form">
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