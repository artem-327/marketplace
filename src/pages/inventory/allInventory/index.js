import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory';
import {deleteProductOffersList, fetchAllProductOffers} from '../../../modules/productOffers';
import {addPopup} from '../../../modules/popup';
import {resetFilterTags} from "../../../modules/filter";
import {resetForm} from '../../../utils/functions';
import {fetchMerchant} from '../../../modules/merchants';
import {fetchOffice} from '../../../modules/companies';

const mapStateToProps = store => ({
    productOffers: store.productOffers.allProductOffers,
    isFetching: store.productOffers.isFetching,
    identity: store.identity.identity,
    merchantDetail: store.merchants.merchantDetail
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({fetchAllProductOffers, fetchOffice, fetchMerchant, addPopup, resetFilterTags, resetForm, deleteProductOffersList}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
