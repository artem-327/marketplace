import { connect } from 'react-redux'
import * as Actions from '../../actions'
import EnterTrackingIdShip from './EnterTrackingIdShip'
import {
    makeGetOrderId,
    makeGetIsSending
} from '../../selectors'

const makeMapStateToProps = () => {
    const getOrderId = makeGetOrderId()
    const getIsSending = makeGetIsSending()

    const mapStateToProps = (state) => {  
        return {
            orderId: getOrderId(state),
            isSending: getIsSending(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions })(EnterTrackingIdShip)
