import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as Actions from '../actions'

function transformToRows(data) {
    // you can transform your data for rendering here
    return data.map(i => ({
        id: i.id,
        // you can add another fields here
    }))
}

function mapStateToProps(state) {
    const {orders} = state
    console.log(state)
    return {
        ...orders,
        rows: transformToRows(orders.data)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
