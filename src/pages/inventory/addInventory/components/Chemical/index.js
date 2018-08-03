import {connect} from 'react-redux';
import Chemical from './Chemical';
import {bindActionCreators} from 'redux'
import {
    mapProducts,
    searchProducts,
    saveMapping,
    fetchRecentAddedProducts,
    fetchProductForms,
    fetchProductGrade,
    fetchProductConditions,
    loadProductMapping,
} from "../../../../../modules/products";
import { getUnitOfMeasurement, getUnitOfPackaging, resetForm} from "../../../../../modules/productOffers";

const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    isMapping: store.products.isMapFetching,
    searchedProducts: store.products.data,
    mappedProducts: store.products.mappedData,
    productForms: store.products.productForms,
    productGrade: store.products.productGrade,
    productConditions: store.products.productConditions,
    originData: store.addInventory.origin,
    recentProducts: store.products.recentProducts,
    unitOfMeasurement: store.productOffers.unitOfMeasurement,
    unitOfPackaging: store.productOffers.unitOfPackaging,
    productMapping: store.forms.products.productsMapping,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        mapProducts,
        searchProducts,
        saveMapping,
        fetchRecentAddedProducts,
        getUnitOfPackaging,
        fetchProductForms,
        fetchProductGrade,
        getUnitOfMeasurement,
        fetchProductConditions,
        resetForm,
        loadProductMapping,
        dispatch
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Chemical);
