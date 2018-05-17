import {connect} from 'react-redux';
import Dashboard from './Dashboard';
import {bindActionCreators} from 'redux'
import {addLocation, addProductOffer} from "../../modules/inventory";


function mapStateToProps(store) {
    return {
        inventory: {
            location: store.inventory.location,
            products: store.inventory.products
        }
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addLocation, addProductOffer}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
