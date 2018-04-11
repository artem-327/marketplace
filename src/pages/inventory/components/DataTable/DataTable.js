import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Motion, spring } from "react-motion"

import './dataTable.css'

import addInventoryLogo from '../../../../images/add-to-inventory.png'
import addFavouriteLogo from '../../../../images/add-favourite.png'
import showStatisticLogo from '../../../../images/show-statistic.png'
import calculateDeliveryLogo from '../../../../images/calculate-delivery.png'
import settingsLogo from '../../../../images/settings.png'


class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScreenBig: true,
            advancedFilter : false,
            setAlerts : false
        }
    }

    handleResize() {
        if(window.innerWidth < 1025) {
            this.setState({isScreenBig: false})
        } else {
            this.setState({isScreenBig: true});
        }
    }

    componentWillMount() {
        this.handleResize();
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }


    render() {
        const { advancedFilter,isScreenBig ,setAlerts, saveSearch} = this.state;

        const calculate_delivery_component = <div className="calculate-delivery-popup">
            <div className="delivery-popup-item">
                <input placeholder="Quantity"></input>
            </div>
            <div className="delivery-popup-item">
                <input placeholder="Delivery Zip"></input>
            </div>
            <div className="delivery-popup-item">
                <select className="">
                    <option>Grade</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div>
            <div className="delivery-popup-item">
                <button>Calculate</button>
            </div>
        </div>;

        const table_header = <div className="product-header">
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
                        <button className="product-options-button"><img src={addInventoryLogo}/>Add Inventory</button>
                        <button className="product-options-button"><img src={addFavouriteLogo}/>Add Favourite</button>
                        <button className="product-options-button"><img src={showStatisticLogo}/>Add Show statistic</button>
                        <button className="product-options-button"><img src={calculateDeliveryLogo}/>Calculate delivery price</button>
                        {/*{calculate_delivery_component}*/}
                    </div>
                </div>
            </div>
        </div>;

        const table_body = <div className="data-table">
            <div className="data-table-header">
                <span className="data-table-header-item">
                    Vendor
                </span>
                <span className="data-table-header-item">
                    MFR.
                </span>
                <span className="data-table-header-item">
                    ORIGIN
                </span>
                <span className="data-table-header-item">
                    QUANTITY
                </span>
                <span className="data-table-header-item">
                    FOB PRICE
                </span>
                <span className="data-table-header-item">
                    PACKAGING
                </span>
                <span className="data-table-header-item">
                    EXP.
                </span>
                <span className="data-table-header-item">
                    CONDITION
                </span>
                <span className="data-table-header-item">
                    FORM
                </span>
                <span className="data-table-header-item">
                    LOCATION
                </span>
                <span className="data-table-header-item">
                    ZIP CODE
                </span>
                <span className="data-table-header-item">
                    DISTANCE
                </span>
                <span className="data-table-header-item">
                    TERMS
                </span>
            </div>
            <div className="data-table-line">
                <hr/>
            </div>
            <div className="data-table-body">
                <span className="data-table-body-item">
                    BigChem
                </span>
                <span className="data-table-body-item">
                    DOW
                </span>
                <span className="data-table-body-item">
                    USA
                </span>
                <span className="data-table-body-item">
                   13.897/lib
                </span>
                <span className="data-table-body-item">
                   $3.2650/lib
                </span>
                <span className="data-table-body-item">
                    Drums
                </span>
                <span className="data-table-body-item">
                    3 W
                </span>
                <span className="data-table-body-item">
                    Prime
                </span>
                <span className="data-table-body-item">
                    Granular
                </span>
                <span className="data-table-body-item">
                    Dallas TX
                </span>
                <span className="data-table-body-item">
                    67543
                </span>
                <span className="data-table-body-item">
                    500 miles
                </span>
                <span className="data-table-body-item">
                    Net 30
                </span>
                <span>
                    <img src={settingsLogo}/>
                </span>
            </div>
        </div>;

        return (
            <div className="App-data-table">
                {table_header}
                {table_body}
                <div className="clearfix"> </div>
            </div>
        );
    }
}

export default DataTable;