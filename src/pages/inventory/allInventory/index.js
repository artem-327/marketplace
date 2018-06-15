import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory';
import {fetchAll} from '../../../modules/productOffers';
import {addPopup} from '../../../modules/popup';

const mapStateToProps = store => ({
    productOffers: store.productOffers.data,
    isFetching: store.productOffers.isFetching
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({getData: fetchAll, addPopup}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
