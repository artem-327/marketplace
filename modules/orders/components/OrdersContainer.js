import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as OrdersHelper from '~/src/helpers/Orders'
import * as Actions from '../actions'
import {formatMoney} from '~/src/utils/functions'
import moment from "moment/moment"

function transformToRows(data, type) {
    return data.map(i => ({
        id: i.id,
        globalStatus: i.globalStatus,
        date: moment(i.orderDate).format('MM/DD/YYYY'),
        customerName: (type === 'sales' ? i.buyerCompanyName : i.sellerCompanyName),
        productName: (typeof i.orderItems[0].productName !== 'undefined' ? i.orderItems[0].productName : 'N/A'),
        orderStatus: OrdersHelper.getOrderStatus(i.orderStatus),
        shippingStatus: OrdersHelper.getShippingStatus(i.shippingStatus),
        reviewStatus: OrdersHelper.getReviewStatus(i.reviewStatus),
        creditStatus: OrdersHelper.getCreditStatus(i.creditStatus),
        paymentStatus: OrdersHelper.getPaymentStatus(i.paymentStatus),
        bl: '',
        sds: '',
        cofA: '',
        orderTotal: "$" + i.totalPrice.formatMoney(2)
    }))
}

function mapStateToProps(state, ownProps) {
    const {orders} = state
    const {router} = ownProps
    const query = router ? router.query : ownProps.match.params

    if (query.type !== orders.dataType) {
        orders.data = []
    }
    return {
        endpointType: query.type === 'sales' ? 'sale' : query.type,
        ...orders,
        isOpen: state.isOpen,
        filterData: state.forms.filter,
        rows: transformToRows(orders.data, query.type),
        activeStatus: orders.statusFilter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({...Actions, dispatch}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
