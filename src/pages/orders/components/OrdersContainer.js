import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as OrdersHelper from '../../../helpers/Orders'
import * as Actions from '../actions'

function transformToRows(data) {
    // you can transform your data for rendering here
    return data.map(i => ({
        id: i.id,
        date: i.orderDate,
        customer: '',
        productName: '',
        orderStatus: OrdersHelper.getOrderStatus(i.orderStatus),
        shippingStatus: OrdersHelper.getShippingStatus(i.shippingStatus),
        reviewStatus: OrdersHelper.getReviewStatus(i.reviewStatus),
        creditStatus: OrdersHelper.getCreditStatus(i.creditStatus),
        paymentStatus: OrdersHelper.getPaymentStatus(i.paymentStatus),
        bl: '',
        sds: '',
        cofA: '',
        total: ''
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
