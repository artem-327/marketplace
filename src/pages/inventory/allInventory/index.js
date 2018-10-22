import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory';
import {deleteProductOffersList, fetchAllProductOffers} from '../../../modules/productOffers';
import {addPopup} from '../../../modules/popup';
import {resetFilterTags} from "../../../modules/filter";
import {resetForm} from '../../../utils/functions';

const mapStateToProps = store => ({
    productOffers: store.productOffers.allProductOffers,
    isFetching: store.productOffers.isFetching
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({fetchAllProductOffers, addPopup, resetFilterTags, resetForm, deleteProductOffersList}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
