import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory';
import {fetchAll} from '../../../modules/productOffers';
import {addPopup} from '../../../modules/popup';
import {resetFilterTags, resetForm} from '../../../modules/filter';

const mapStateToProps = store => ({
    productOffers: store.productOffers.data,
    isFetching: store.productOffers.isFetching
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({getData: fetchAll, addPopup, resetFilterTags, resetForm}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
