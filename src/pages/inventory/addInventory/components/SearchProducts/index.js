import {connect} from 'react-redux';
import SearchProducts from './SearchProducts';
import {bindActionCreators} from 'redux'
import {
    searchProducts,
    fetchRecentAddedProducts,
    fetchProductForms,
    fetchProductGrade,
    fetchProductConditions} from "../../../../../modules/products";
import {searchOrigin} from "../../../../../modules/productOffers";


const mapStateToProps = store => ({
    isSearching: store.products.isFetching,
    searchedProducts: store.products.data,
    productForms: store.products.productForms,
    productGrade: store.products.productGrade,
    productConditions: store.products.productConditions,
    searchedOrigin: store.productOffers.data,
    recentProducts: store.products.recentProducts,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({searchProducts, searchOrigin, fetchProductForms, fetchProductGrade, fetchProductConditions, fetchRecentAddedProducts}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(SearchProducts);
