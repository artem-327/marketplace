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
        productCode: data.orderItems[0].casNumber,
        packaging: data.orderItems[0].packagingType,
        size: data.orderItems[0].packagingSize,
        totalPkg: data.orderItems[0].amount,
        quantityOrdered: data.orderItems[0].amount * data.orderItems[0].packagingSize,
        unit: data.orderItems[0].packagingUnit,
        unitPrice: "$" + data.orderItems[0].price.formatMoney(2),
        unitCost: "$" + parseInt(0).formatMoney(2),
        amount: "$" + data.totalPrice.formatMoney(2),
        feesPercent: 0,
        feesAmount: "$" + parseInt(data.totalPrice * (0 / 100)).formatMoney(2),
        total: "$" + data.totalPrice.formatMoney(2),
        pickUpAddress: data.sellerCompanyAddressStreet + ', ' + data.sellerCompanyAddressCity + ', ' + data.sellerCompanyAddressZip + ', ' + data.sellerCompanyAddressCountry,
        carrier: data.shippingMethod,
        shipTo: data.buyerCompanyName,
        shipToAddress: data.buyerCompanyAddressStreet + ', ' + data.buyerCompanyAddressCity + ', ' + data.buyerCompanyAddressZip + ', ' + data.buyerCompanyAddressCountry
    }
}

function mapStateToProps(state, ownProps) {
    const {orders} = state

    if (ownProps.router.query.type !== orders.detailType) {
        orders.detail = {}
    }

    return {
        order: prepareDetail(orders.detail),
        action: actionRequired(orders.detail),
        reloadPage: orders.reloadPage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
