import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {searchProducts, mapProducts, fetchRecentAddedProducts} from "../../../../../modules/products";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    isMapping: store.products.isMapFetching,
    searchedProducts: store.products.data,
    mappedProducts: store.products.mappedData,
    recentProducts: store.products.recentProducts,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({searchProducts, mapProducts, fetchRecentAddedProducts}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
