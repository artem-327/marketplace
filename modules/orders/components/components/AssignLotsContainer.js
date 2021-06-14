import { connect } from 'react-redux'
import * as Actions from '../../actions'
import AssignLots from './AssignLots'
import { loadFile, addAttachment } from '../../../inventory/actions'
import {
    makeGetPoLots,
    makeGetOrderId,
    makeGetOrderItems
} from '../../selectors'

const makeMapStateToProps = () => {
    const getPoLots = makeGetPoLots()
    const getOrderId = makeGetOrderId()
    const getOrderItems = makeGetOrderItems()

    const mapStateToProps = (state) => {  
        return {
            poLots: getPoLots(state),
            orderId: getOrderId(state),
            orderItems: getOrderItems(state)
        }
    }
    return mapStateToProps
}
export default connect(makeMapStateToProps, { ...Actions, loadFile, addAttachment })(AssignLots)
