import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as OrdersHelper from '../../../helpers/Orders'
import * as Actions from '../actions'
import {formatMoney} from "../../../utils/functions";
import moment from "moment/moment"

function transformToRows(data, type) {
    return data.map(i => ({
        id: i.id,
        globalStatus: i.globalStatus,
        date: moment(i.orderDate).format('MM/DD/YYYY'),
        customerName: (type === 'sales' ? i.buyer.name : i.seller.company.name),
        productName: (typeof i.orderItems[0].name !== 'undefined' ? i.orderItems[0].name : 'N/A'),
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

function mapStateToProps(state, ownProps) {
    const {orders} = state
    if (ownProps.match.params.type !== orders.dataType) {
        orders.data = []
    }
    return {
        endpointType: ownProps.match.params.type === 'sales' ? 'sale' : ownProps.match.params.type,
        ...orders,
        isOpen: state.isOpen,
        filterData: state.forms.filter,
        rows: transformToRows(orders.data, ownProps.match.params.type),
        activeStatus: orders.statusFilter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
