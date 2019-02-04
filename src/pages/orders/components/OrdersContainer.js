import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Orders from './Orders'
import * as Actions from '../actions'

function getOrderStatus(orderStatus = 0) {
    switch(orderStatus) {
        case 1:
            return 'Pending';
        case 2:
            return 'Confirmed';
        case 3:
            return 'Rejected';
        default:
            return 'N/A';
    }
}

function getShippingStatus(shippingStatus = 0) {
    switch(shippingStatus) {
        case 1:
            return 'Not Shipped';
        case 2:
            return 'In Transit';
        case 3:
            return 'Delivered';
        case 4:
            return 'Returned';
        default:
            return 'N/A';
    }
}

function getReviewStatus(reviewStatus = 0) {
    switch(reviewStatus) {
        case 1:
            return 'Pending';
        case 2:
            return 'Accepted';
        case 3:
            return 'Rejected';
        default:
            return 'N/A';
    }
}

function getPaymentStatus(paymentStatus = 0) {
    switch(paymentStatus) {
        case 1:
            return 'Escrow';
        case 2:
            return 'Paid';
        case 3:
            return 'Refunded';
        default:
            return 'N/A';
    }
}

function getCreditStatus(creditStatus = 0) {
    switch(creditStatus) {
        case 1:
            return 'Pending';
        case 2:
            return 'Counter Offer Pending';
        case 3:
            return 'Accepted';
        case 4:
            return 'Rejected';
        default:
            return 'N/A';
    }
}

function transformToRows(data) {
    // you can transform your data for rendering here
    return data.map(i => ({
        id: i.id,
        orderStatus: getOrderStatus(i.orderStatus),
        date: i.orderDate,
        customer: '',
        productName: '',
        order: '',
        shippingStatus: getShippingStatus(i.shippingStatus),
        reviewStatus: getReviewStatus(i.reviewStatus),
        creditStatus: getCreditStatus(i.creditStatus),
        paymentStatus: getPaymentStatus(i.paymentStatus),
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
