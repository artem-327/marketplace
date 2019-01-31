import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShippingQuotes from './ShippingQuotes';
import {getShippingQuotes} from '../../../../../modules/shippingQuotes';

function mapStateToProps(store) {
    return {
        quantity: 0,
        destinationZIP: '',
        maxTransit: 0,
        shippingQuotes: store.shippingQuotes.shippingQuotes,
        shippingQuotesIsFetching: store.shippingQuotes.shippingQuotesIsFetching,
        shippingQuotesForm: store.forms.shippingQuotes
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getShippingQuotes}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingQuotes);
