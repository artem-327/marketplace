import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {searchProducts, mappedProducts, fetchRecentAddedProducts} from "../../../../../modules/products";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    isSearchingMap: store.products.isMapFetching,
    searchedProducts: store.products.data,
    recentProducts: store.products.recentProducts,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({searchProducts, mappedProducts, fetchRecentAddedProducts}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
