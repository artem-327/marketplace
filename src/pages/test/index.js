import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import TestPage from './Testpage';
import {addPopup} from '../../modules/popup';
import {searchProducts} from "../../modules/products";

function mapStateToProps(store) {
    return {
        identity: store.identity.identity.data,
        searchProductsItems: store.products.data,
        comboData: store.products.origin
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addPopup, searchProducts, dispatch},dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TestPage);
