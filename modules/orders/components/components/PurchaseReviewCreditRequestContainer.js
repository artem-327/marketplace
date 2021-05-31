import { connect } from 'react-redux'
import * as Actions from '../../actions'
import PurchaseReviewCreditRequest from './PurchaseReviewCreditRequest'
import {
    makeGetOrderId,
    makeGetIsSending,
    makeGetCreditRequestHistory
} from '../../selectors'

const makeMapStateToProps = () => {
    const getOrderId = makeGetOrderId()
    const getIsSending = makeGetIsSending()
    const getCreditRequestHistory = makeGetCreditRequestHistory()

    const mapStateToProps = (state) => {  
        return {
            orderId: getOrderId(state),
            isSending: getIsSending(state),
            creditRequestHistory: getCreditRequestHistory(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions })(PurchaseReviewCreditRequest)
