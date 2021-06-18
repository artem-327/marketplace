import { connect } from 'react-redux'
import * as Actions from '../../actions'
import PurchaseOrderShipping from './PurchaseOrderShipping'
import {
    makeGetOrderId,
    makeGetIsSending,
    makeGetDetail,
    makeGetApplicationName,
    makeGetShippingQuotesAreFetching,
    makeGetShippingQuotes
} from '../../selectors'

const makeMapStateToProps = () => {
    const getOrderId = makeGetOrderId()
    const getIsSending = makeGetIsSending()
    const getDetail = makeGetDetail()
    const getApplicationName = makeGetApplicationName()
    const getShippingQuotesAreFetching = makeGetShippingQuotesAreFetching()
    const getShippingQuotes = makeGetShippingQuotes()

    const mapStateToProps = (state) => {  
        return {
            applicationName: getApplicationName(state),
            order: getDetail(state),
            orderId: getOrderId(state),
            isSending: getIsSending(state),
            shippingQuotesAreFetching: getShippingQuotesAreFetching(state),
            shippingQuotes: getShippingQuotes(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions })(PurchaseOrderShipping)
