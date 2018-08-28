import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import NamesSynonyms from "./NamesSynonyms";
import {fetchAlternativeNames, searchProducts} from "../../../modules/products";


function mapStateToProps(store) {
    return {
        isSearching: store.products.isFetching,
        searchedProducts: store.products.data,
        alternativeNames: store.products.alternativeNames
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchProducts, fetchAlternativeNames}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NamesSynonyms);
