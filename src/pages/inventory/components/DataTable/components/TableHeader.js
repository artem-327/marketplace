import React, {Component} from 'react';
import addInventoryLogo from '../../../../../images/add-to-inventory.png'
import addFavouriteLogo from '../../../../../images/add-favourite.png'
import showStatisticLogo from '../../../../../images/show-statistic.png'
import calculateDeliveryLogo from '../../../../../images/calculate-delivery.png'

class TableHeader extends Component {

    render() {
        return (
            <div className="product-header">
                <div className="row">
                    <div className="col-lg-1 col-md-2 col-sm-12">
                    <span className="product-id">
                        67-63-0
                    </span>
                    </div>
                    <div className="col-lg-5 col-md-4 col-sm-12">
                    <span className="product-name">
                        Isopropyl Alcohol (2-Proponal)
                    </span>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="product-options">
                            <button className="product-options-button"><img alt="Button" src={addInventoryLogo}/>Add Inventory</button>
                            <button className="product-options-button"><img alt="Button" src={addFavouriteLogo}/>Add Favourite</button>
                            <button className="product-options-button"><img alt="Button" src={showStatisticLogo}/>Add Show statistic</button>
                            <button className="product-options-button"><img alt="Button" src={calculateDeliveryLogo}/>Calculate delivery price</button>
                            {/*{calculate_delivery_component}*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableHeader