import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory';
import {deleteProductOffersList, fetchAllProductOffers} from '../../../modules/productOffers';
import {addPopup, removePopup} from '../../../modules/popup';
import {resetFilterTags} from "../../../modules/filter";
import {resetForm} from '../../../utils/functions';
import {getMerchant} from '../../../modules/merchants';
import {getOffice} from '../../../modules/companies';

const mapStateToProps = store => ({
    productOffers: store.productOffers.allProductOffers,
    isFetching: store.productOffers.isFetching,
    identity: store.identity.identity,
    merchantDetail: store.merchants.merchantDetail,
    officeDetail: store.companies.office,
    productOffersIsFetching: store.productOffers.productOffersIsFetching
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({fetchAllProductOffers, getOffice, getMerchant, addPopup, removePopup, resetFilterTags, resetForm, deleteProductOffersList}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
