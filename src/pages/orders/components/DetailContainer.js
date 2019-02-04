import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Detail from './Detail'
import * as Actions from '../actions'

function mapStateToProps(state) {
    const {orders} = state
    return {
        detail: orders.detail
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
