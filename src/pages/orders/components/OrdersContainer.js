import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as OrdersHelper from '../../../helpers/Orders'
import * as Actions from '../actions'
import {formatMoney} from "../../../utils/functions";
import moment from "moment/moment"

function transformToRows(data) {
    return data.map(i => ({
        id: i.id,
        globalStatus: i.globalStatus,
        date: moment(i.orderDate).format('MM/DD/YYYY'),
        customerName: (typeof i.buyer !== 'undefined' ? i.buyer.firstname + (i.buyer.middlename ? ' ' + i.buyer.middlename : '') + ' ' + i.buyer.lastname : ''),
        productName: '',
        orderStatus: OrdersHelper.getOrderStatus(i.orderStatus),
        shippingStatus: OrdersHelper.getShippingStatus(i.shippingStatus),
        reviewStatus: OrdersHelper.getReviewStatus(i.reviewStatus),
        creditStatus: OrdersHelper.getCreditStatus(i.creditStatus),
        paymentStatus: OrdersHelper.getPaymentStatus(i.paymentStatus),
        bl: '',
        sds: '',
        cofA: '',
        total: '',
        orderTotal: "$" + i.totalPrice.formatMoney(2)
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
