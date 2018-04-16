import React, {Component} from 'react';
// import addInventoryLogo from '../../../../../images/add-to-inventory.png'
// import addFavouriteLogo from '../../../../../images/add-favourite.png'
// import showStatisticLogo from '../../../../../images/show-statistic.png'
// import calculateDeliveryLogo from '../../../../../images/calculate-delivery.png'
// import {Translate} from 'react-localize-redux'

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
                        {/*<div className="product-options">*/}
                            {/*<button className="product-options-button"><img alt="Button" src={addInventoryLogo}/><Translate id="inventoryTable.header.addInventory"/></button>*/}
                            {/*<button className="product-options-button"><img alt="Button" src={addFavouriteLogo}/><Translate id="inventoryTable.header.addFavourite"/></button>*/}
                            {/*<button className="product-options-button"><img alt="Button" src={showStatisticLogo}/><Translate id="inventoryTable.header.addShowStatistic"/></button>*/}
                            {/*<button className="product-options-button"><img alt="Button" src={calculateDeliveryLogo}/><Translate id="inventoryTable.header.calculateDeliveryPrice"/></button>*/}

                            {/*/!*{calculate_delivery_component}*!/*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default TableHeader