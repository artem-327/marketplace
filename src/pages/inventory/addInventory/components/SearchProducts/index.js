import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {searchProducts} from "../../../../../modules/products";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    searchedProducts: store.products.data
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({searchProducts}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
