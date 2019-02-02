import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as Actions from '../actions'

function transformToRows(data) {
    // you can transform your data for rendering here
    return data.map(i => ({
        id: i.id,
        orderStatus: i.orderStatus,
        date: i.orderDate,
        customer: '',
        productName: '',
        order: '',
        shipping: i.shippingStatus,
        review: '',
        credit: '',
        payment: '',
        bl: '',
        sds: '',
        cofA: '',
        total: '',
        button: ''
    }))
}

function mapStateToProps(state) {
    const {orders} = state
    return {
        ...orders,
        rows: transformToRows(orders.data)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
