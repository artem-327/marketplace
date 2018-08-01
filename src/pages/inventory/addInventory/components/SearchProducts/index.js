import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {searchProducts,
        mapProducts,
        fetchRecentAddedProducts,
        fetchProductForms,
        fetchProductGrade,
        fetchProductConditions
        saveMapping} from "../../../../../modules/products";
import {searchOrigin} from "../../../../../modules/productOffers";
import {getUnitOfMeasurement, getUnitOfPackaging} from "../../../../../modules/productOffers";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    isMapping: store.products.isMapFetching,
    searchedProducts: store.products.data,
    mappedProducts: store.products.mappedData,
    productForms: store.products.productForms,
    productGrade: store.products.productGrade,
    productConditions: store.products.productConditions,
    searchedOrigin: store.productOffers.data,
    recentProducts: store.products.recentProducts,
    unitOfMeasurement:store.productOffers.unitOfMeasurement,
    unitOfPackaging:store.productOffers.unitOfPackaging
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
                        mapProducts,
                        searchProducts,
                        saveMapping,
                        fetchRecentAddedProducts,
                        searchOrigin,
                        getUnitOfPackaging,
                        fetchProductForms,
                        fetchProductGrade,
                        getUnitOfMeasurement,
                        fetchProductConditions,}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
