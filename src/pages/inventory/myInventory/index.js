import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import MyInventory from './MyInventory';
import {fetchAll as getProductOffers} from '../../../modules/productOffers';
import {fetchAll as getCompanies} from '../../../modules/companies';
import {sendRules} from "../../../modules/broadcastRule";
import {addPopup, removePopup} from "../../../modules/popup";
import {resetFilterTags, resetForm} from "../../../modules/filter";

const mapStateToProps = store => ({
    productOffers: store.productOffers.data,
    companies: store.companies.data,
    isFetching: store.productOffers.isFetching
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({getProductOffers, getCompanies, sendRules, addPopup, removePopup, resetFilterTags, resetForm}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MyInventory);
