import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import {bindActionCreators} from 'redux'
import {addLocation} from "../../modules/location";
import {addProductOffer} from "../../modules/productOffers";
import {getProduct} from "../../modules/dropdown";
import {getFormOptions} from '../../modules/dropdown';
import {getConditionOptions} from "../../modules/dropdown";
import {getPackageTypeOptions} from "../../modules/dropdown";

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
    return bindActionCreators({addLocation, addProductOffer, getProduct, getFormOptions, getConditionOptions, getPackageTypeOptions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
