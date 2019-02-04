import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Detail from './Detail'
import * as Actions from '../actions'
import * as OrdersHelper from "../../../helpers/Orders"
import moment from "moment/moment";

function actionRequired(data) {
    return (data.orderStatus === 1)
}

function prepareDetail(data) {
    if (typeof data.id === 'undefined')
        return {}

    return {
        id: data.id,
        orderDate: moment(data.orderDate).format('MMM Do, YYYY h:mm:ss A'),
        acceptanceDate: (typeof data.acceptanceDate !== 'undefined' ? moment(data.acceptanceDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
        confirmationDate: (typeof data.confirmationDate !== 'undefined' ? moment(data.confirmationDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
        sellerRejectionDate: (typeof data.sellerRejectionDate !== 'undefined' ? moment(data.sellerRejectionDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
        buyerRejectionDate: (typeof data.buyerRejectionDate !== 'undefined' ? moment(data.buyerRejectionDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
        orderStatus: OrdersHelper.getOrderStatus(data.orderStatus),
        shippingStatus: OrdersHelper.getShippingStatus(data.shippingStatus),
        reviewStatus: OrdersHelper.getReviewStatus(data.reviewStatus),
        creditStatus: OrdersHelper.getCreditStatus(data.creditStatus),
        paymentStatus: OrdersHelper.getPaymentStatus(data.paymentStatus),
        returnStatus: OrdersHelper.getReturnStatus(data.returnStatus),
        productName: (typeof data.orderItems[0].name !== 'undefined' ? data.orderItems[0].name : 'N/A'),
        productNumber: data.orderItems[0].casNumber,
        packaging: data.orderItems[0].packaging.packagingType.name,
        size: data.orderItems[0].packaging.size,
        totalPkg: data.orderItems[0].amount,
        quantityOrdered: data.orderItems[0].amount * data.orderItems[0].packaging.size,
        unit: data.orderItems[0].packaging.unit.name,
        carrier: data.shippingMethod,
        shipTo: data.buyer.firstname + (data.buyer.middlename ? ' ' + data.buyer.middlename : '') + ' ' + data.buyer.lastname
    }
}

function mapStateToProps(state) {
    const {orders} = state

    return {
        order: prepareDetail(orders.detail),
        action: actionRequired(orders)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
