import { connect } from 'react-redux'
import * as Actions from '../../actions'
import PurchaseRequestCreditDelivery from './PurchaseRequestCreditDelivery'
import {
    makeGetOrderId,
    makeGetIsSending,
    makeGetAppInfo
} from '../../selectors'

const makeMapStateToProps = () => {
    const getOrderId = makeGetOrderId()
    const getIsSending = makeGetIsSending()
    const getAppInfo = makeGetAppInfo()

    const mapStateToProps = (state) => {  
        return {
            orderId: getOrderId(state),
            isSending: getIsSending(state),
            appInfo: getAppInfo(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions })(PurchaseRequestCreditDelivery)
