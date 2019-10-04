import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Detail from './Detail'
import * as Actions from '../actions'
import * as OrdersHelper from "~/src/helpers/Orders"
import moment from "moment/moment"
import { getSafe } from "~/utils/functions"

function actionRequired(data) {
    // return statuses code
    return getSafe(() => data.orderStatus.toString(), 0) + getSafe(() => data.shippingStatus.toString(), 0)
}

function prepareDetail(data, type) {
    if (typeof data.id === 'undefined')
        return {}

    const totalPrice = getSafe(() => data.totalPrice, 0)

    return {
      acceptanceDate: (typeof data.acceptanceDate !== 'undefined' ? moment(data.acceptanceDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      amount: "$" + totalPrice.formatMoney(2),
      buyerRejectionDate: (typeof data.buyerRejectionDate !== 'undefined' ? moment(data.buyerRejectionDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      carrier: data.shippingMethod ? data.shippingMethod : 'N/A',
      chemicalName: getSafe(() => data.orderItems[0].chemicalName, 'N/A'),
      confirmationDate: (typeof data.confirmationDate !== 'undefined' ? moment(data.confirmationDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      contactEmail: 'N/A',
      contactNumber: 'N/A',
      createdBy: data.buyerName ? data.buyerName : 'N/A',
      creditStatus: OrdersHelper.getCreditStatus(data.creditStatus),
      deliveryCost: data.deliveryCost ? "$" + data.deliveryCost.formatMoney(2) : '$0.00',
      deliveryDate: (typeof data.deliveryDate !== 'undefined' ? moment(data.deliveryDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      deliveryTotal: data.deliveryTotal ? "$" + data.deliveryTotal.formatMoney(2) : '$0.00',
      feesAmount: "$" + parseInt(totalPrice * (0 / 100)).formatMoney(2),
      feesPercent: 0,
      freight: data.shippingPrice ? "$" + data.shippingPrice.formatMoney(2) : '$0.00',
      grossProfit: "$" + data.totalPriceWithShipping.formatMoney(2),
      id: data.id,
      incoterms: 'N/A',
      orderDate: moment(data.orderDate).format('MMM Do, YYYY h:mm:ss A'),
      orderStatus: OrdersHelper.getOrderStatus(data.orderStatus),
      orderType: type === 'sales' ? 'Sales' : 'Purchase',
      other: '$0.00',
      packaging: getSafe(() => data.orderItems[0].packagingType, 'N/A'),
      paymentInitiationDate: (typeof data.paymentInitiationDate !== 'undefined' ? moment(data.paymentInitiationDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      paymentReceivedDate: (typeof data.paymentReceivedDate !== 'undefined' ? moment(data.paymentReceivedDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      paymentSendDate: (typeof data.paymentSendDate !== 'undefined' ? moment(data.paymentSendDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      paymentStatus: OrdersHelper.getPaymentStatus(data.paymentStatus),
      pickUpAddress: data.sellerCompanyAddressStreet + ', ' + data.sellerCompanyAddressCity + ', ' + data.sellerCompanyAddressZip + ', ' + data.sellerCompanyAddressCountry,
      productCode: getSafe(() => data.orderItems[0].productCode, 'N/A'),
      productName: getSafe(() => data.orderItems[0].productName, 'N/A'),
      productOfferIds: data.orderItems.map(orderItem => orderItem.productOffer),
      proNumber: 'N/A',
      quantityOrdered: getSafe(() => data.orderItems[0].pkgAmount, 0) * getSafe(() => data.orderItems[0].packagingSize, 0),
      refundDate: (typeof data.refundDate !== 'undefined' ? moment(data.refundDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      returnDeliveryDate: (typeof data.returnDeliveryDate !== 'undefined' ? moment(data.returnDeliveryDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      returnShipDate: (typeof data.returnShipDate !== 'undefined' ? moment(data.returnShipDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      returnStatus: OrdersHelper.getReturnStatus(data.returnStatus),
      reviewStatus: OrdersHelper.getReviewStatus(data.reviewStatus),
      sellerRejectionDate: (typeof data.sellerRejectionDate !== 'undefined' ? moment(data.sellerRejectionDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      service: 'N/A',
      shipDate: (typeof data.shipDate !== 'undefined' ? moment(data.shipDate).format('MMM Do, YYYY h:mm:ss A') : 'N/A'),
      shippingContact: 'N/A',
      shippingStatus: OrdersHelper.getShippingStatus(data.shippingStatus),
      shipTo: data.buyerCompanyName,
      shipToAddress: data.buyerCompanyAddressStreet + ', ' + data.buyerCompanyAddressCity + ', ' + data.buyerCompanyAddressZip + ', ' + data.buyerCompanyAddressCountry,
      size: getSafe(() => data.orderItems[0].packagingSize, 'N/A'),
      subtotal: "$" + totalPrice.formatMoney(2),
      terms: 'N/A',
      total: "$" + totalPrice.formatMoney(2),
      totalPkg: getSafe(() => data.orderItems[0].pkgAmount, 'N/A'),
      unit: getSafe(() => data.orderItems[0].packagingUnit, 'N/A'),
      unitCost: "$" + parseInt(0).formatMoney(2),
      unitPrice: "$" + getSafe(() => data.orderItems[0].price, 0).formatMoney(2),
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
        openedAssignLots: orders.openedAssignLots,
        openedReinitiateTransfer: orders.openedReinitiateTransfer,
        action: actionRequired(orders.detail),
        reloadPage: orders.reloadPage
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
