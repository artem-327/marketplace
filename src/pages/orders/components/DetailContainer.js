import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Detail from './Detail'
import * as Actions from '../actions'
import * as OrdersHelper from "../../../helpers/Orders"
import moment from "moment/moment";

function actionRequired(data) {
    return (data.orderStatus === 1)
}

function prepareDetail(data, type) {
    if (typeof data.id === 'undefined')
        return {}

    return {
      acceptanceDate: (typeof data.acceptanceDate !== 'undefined' ? moment(data.acceptanceDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      amount: "$" + data.totalPrice.formatMoney(2),
      buyerRejectionDate: (typeof data.buyerRejectionDate !== 'undefined' ? moment(data.buyerRejectionDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      carrier: data.shippingMethod,
      chemicalName: data.orderItems[0].chemicalName ? data.orderItems[0].chemicalName : 'N/A',
      confirmationDate: (typeof data.confirmationDate !== 'undefined' ? moment(data.confirmationDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      createdBy: data.buyerName ? data.buyerName : 'N/A',
      creditStatus: OrdersHelper.getCreditStatus(data.creditStatus),
      deliveryCost: data.deliveryCost ? "$" + data.deliveryCost.formatMoney(2) : '$0.00',
      deliveryDate: (typeof data.deliveryDate !== 'undefined' ? moment(data.deliveryDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      deliveryTotal: data.deliveryTotal ? "$" + data.deliveryTotal.formatMoney(2) : '$0.00',
      feesAmount: "$" + parseInt(data.totalPrice * (0 / 100)).formatMoney(2),
      feesPercent: 0,
      freight: data.shippingPrice ? "$" + data.shippingPrice.formatMoney(2) : '$0.00',
      grossProfit: "$" + data.totalPriceWithShipping.formatMoney(2),
      id: data.id,
      orderDate: moment(data.orderDate).format('MMM Do, YYYY h:mm:ss A'),
      orderStatus: OrdersHelper.getOrderStatus(data.orderStatus),
      orderType: type === 'sales' ? 'Sales' : 'Purchase',
      other: '$0.00',
      packaging: data.orderItems[0].packagingType,
      paymentInitiationDate: (typeof data.paymentInitiationDate !== 'undefined' ? moment(data.paymentInitiationDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      paymentReceivedDate: (typeof data.paymentReceivedDate !== 'undefined' ? moment(data.paymentReceivedDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      paymentSendDate: (typeof data.paymentSendDate !== 'undefined' ? moment(data.paymentSendDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      paymentStatus: OrdersHelper.getPaymentStatus(data.paymentStatus),
      pickUpAddress: data.sellerCompanyAddressStreet + ', ' + data.sellerCompanyAddressCity + ', ' + data.sellerCompanyAddressZip + ', ' + data.sellerCompanyAddressCountry,
      productCode: data.orderItems[0].casNumber,
      productName: (typeof data.orderItems[0].name !== 'undefined' ? data.orderItems[0].name : 'N/A'),
      quantityOrdered: data.orderItems[0].amount * data.orderItems[0].packagingSize,
      refundDate: (typeof data.refundDate !== 'undefined' ? moment(data.refundDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      returnDeliveryDate: (typeof data.returnDeliveryDate !== 'undefined' ? moment(data.returnDeliveryDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      returnShipDate: (typeof data.returnShipDate !== 'undefined' ? moment(data.returnShipDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      returnStatus: OrdersHelper.getReturnStatus(data.returnStatus),
      reviewStatus: OrdersHelper.getReviewStatus(data.reviewStatus),
      sellerRejectionDate: (typeof data.sellerRejectionDate !== 'undefined' ? moment(data.sellerRejectionDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      shipDate: (typeof data.shipDate !== 'undefined' ? moment(data.shipDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      shippingStatus: OrdersHelper.getShippingStatus(data.shippingStatus),
      shipTo: data.buyerCompanyName,
      shipToAddress: data.buyerCompanyAddressStreet + ', ' + data.buyerCompanyAddressCity + ', ' + data.buyerCompanyAddressZip + ', ' + data.buyerCompanyAddressCountry,
      size: data.orderItems[0].packagingSize,
      subtotal: "$" + data.totalPrice.formatMoney(2),
      total: "$" + data.totalPrice.formatMoney(2),
      totalPkg: data.orderItems[0].amount,
      unit: data.orderItems[0].packagingUnit,
      unitCost: "$" + parseInt(0).formatMoney(2),
      unitPrice: "$" + data.orderItems[0].price.formatMoney(2),
      // Vendor or Customer
      paymentType: type === 'sales' ? 'Customer' : 'Vendor',
      paymentAddress: type === 'sales' ? data.buyerCompanyAddressStreet + ', ' + data.buyerCompanyAddressCity + ', ' + data.buyerCompanyAddressZip + ' ' + data.buyerCompanyAddressCountry : data.sellerCompanyAddressStreet + ', ' + data.sellerCompanyAddressCity + ', ' + data.sellerCompanyAddressZip + ' ' + data.sellerCompanyAddressCountry,
      paymentEmail: type === 'sales' ? data.buyerCompanyContactEmail : data.sellerCompanyContactEmail,
      paymentName: type === 'sales' ? data.buyerCompanyName : data.sellerCompanyName,
      paymentPhone: type === 'sales' ? data.buyerCompanyContactPhone : data.sellerCompanyContactPhone,
      paymentContact: type === 'sales' ? data.buyerCompanyContactName : data.sellerCompanyContactName
    }
}

function mapStateToProps(state, ownProps) {
    const {orders} = state

    if (ownProps.router.query.type !== orders.detailType) {
        orders.detail = {}
    }

    return {
        order: prepareDetail(orders.detail, ownProps.router.query.type),
        action: actionRequired(orders.detail),
        reloadPage: orders.reloadPage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
