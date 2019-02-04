import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Detail from './Detail'
import * as Actions from '../actions'

function actionRequired(data) {
    return (data.orderStatus === 1)
}

function mapStateToProps(state) {
    const {orders} = state
    return {
        detail: orders.detail,
        action: actionRequired(orders)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
