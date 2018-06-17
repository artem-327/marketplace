import {connect} from 'react-redux';
import SearchProduct from './SearchProduct';
import {bindActionCreators} from 'redux'
import {searchProduct} from "../../../modules/products";


function mapStateToProps(store) {
    return {
        results: store.products.data,
        isFetching: store.products.isFetching,
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchProduct}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchProduct);
