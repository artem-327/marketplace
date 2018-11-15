import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import MyInventory from './MyInventory';
import {deleteProductOffersList, fetchMyProductOffers, removeProductOffer} from '../../../modules/productOffers';
import {fetchAll as getCompanies} from '../../../modules/companies';
import {sendRules} from "../../../modules/broadcastRule";
import {addPopup, removePopup} from "../../../modules/popup";
import {resetFilterTags} from "../../../modules/filter";
import {resetForm} from '../../../utils/functions';

const mapStateToProps = store => ({
    productOffers: store.productOffers.myProductOffers,
    companies: store.companies.data,
    isFetching: store.productOffers.isFetching,
    productOffersTable: store.dataTables.myInventoryTable,
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({fetchMyProductOffers, getCompanies, sendRules, removeProductOffer, addPopup, removePopup, resetFilterTags, resetForm, deleteProductOffersList}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MyInventory);
