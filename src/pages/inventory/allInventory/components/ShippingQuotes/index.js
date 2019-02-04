import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ShippingQuotes from './ShippingQuotes';
import {getShippingQuotes} from '../../../../../modules/shippingQuotes';

function mapStateToProps(store) {
    return {
        quantity: store.shippingQuotes.quantity,
        destinationZIP: store.shippingQuotes.destinationZIP,
        maxTransit: store.shippingQuotes.maxTransit,
        shippingQuotes: store.shippingQuotes.shippingQuotes,
        shippingQuotesIsFetching: store.shippingQuotes.shippingQuotesIsFetching,
        shippingQuotesForm: store.forms.shippingQuotes
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getShippingQuotes}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingQuotes);
