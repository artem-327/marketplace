import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {searchProducts, mapProducts, fetchRecentAddedProducts, saveMapping} from "../../../../../modules/products";
import {getUnitOfMeasurement, getUnitOfPackaging} from "../../../../../modules/productOffers";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    isMapping: store.products.isMapFetching,
    searchedProducts: store.products.data,
    mappedProducts: store.products.mappedData,
    recentProducts: store.products.recentProducts,
    unitOfMeasurement:store.productOffers.unitOfMeasurement,
    unitOfPackaging:store.productOffers.unitOfPackaging
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({searchProducts, saveMapping, getUnitOfPackaging, getUnitOfMeasurement, mapProducts, fetchRecentAddedProducts, dispatch}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
