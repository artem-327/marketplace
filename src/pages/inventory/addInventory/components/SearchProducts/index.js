import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {searchProducts, mappedProducts, fetchRecentAddedProducts} from "../../../../../modules/products";
import {getUnitOfMeasurement, getUnitOfPackaging} from "../../../../../modules/productOffers";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    searchedProducts: store.products.data,
    recentProducts: store.products.recentProducts,
    unitOfMeasurement:store.productOffers.unitOfMeasurement,
    unitOfPackaging:store.productOffers.unitOfPackaging
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({searchProducts, mappedProducts, getUnitOfPackaging, getUnitOfMeasurement,  fetchRecentAddedProducts, dispatch}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
