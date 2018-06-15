import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import {bindActionCreators} from 'redux'
import {addLocation} from "../../modules/location";
import {addProductOffer} from "../../modules/productOffers";
import {getProduct} from "../../modules/productOffers";

function mapStateToProps(store) {
    return {
        // inventory: {
        //     location: store.location.location,
        //     products: store.productOffers.products
        // }
        location: {
            location: store.location.location
        },
        productOffers: {
            products: store.productOffers.products
        },
        productType: {
            productType: store.dropdown.productType
        },
        form: {
            form: store.dropdown.form
        },
        condition: {
            condition: store.dropdown.condition
        },
        package: {
            package: store.dropdown.package
        }

    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addLocation, addProductOffer, getProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
