import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory';
import {fetchAll} from '../../../modules/productOffers';

const mapStateToProps = store => ({
    productOffers: store.productOffers.data,
    isFetching: store.productOffers.isFetching
});

const mapDispatchToProps = dispatch => (
    bindActionCreators({getData: fetchAll}, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory);
