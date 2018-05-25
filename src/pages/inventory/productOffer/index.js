import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import productOffer from './productOffer';
import {getData} from '../../../modules/productOff';


function mapStateToProps(store) {
    return {
        data: store.productOff.data,
        isFetching: store.productOff.isFetching
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(productOffer);
