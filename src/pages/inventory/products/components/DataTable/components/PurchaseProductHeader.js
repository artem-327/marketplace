import React, {Component} from 'react';
import addInventoryLogo from '../../../../../../images/add-to-inventory.png'

class PurchaseProductHeader extends Component {

    render() {
        return (
            <div className="purchase-product-header product-header">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-12">
                    <span className="product-id">
                        67-63-0
                    </span>
                    </div>
                    <div className="col-lg-5 col-md-4 col-sm-12">
                    <span className="product-name">
                        Isopropyl Alcohol
                    </span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="purchase-options product-options">
                            <button className="product-options-button"><img alt="Button" src={addInventoryLogo}/>C of A</button>
                            <button className="product-options-button"><img alt="Button" src={addInventoryLogo}/>SDS</button>
                            <button className="product-options-button"><img alt="Button" src={addInventoryLogo}/>Spec Sheet</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PurchaseProductHeader