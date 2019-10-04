import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Orders from './Orders'
import * as OrdersHelper from '~/src/helpers/Orders'
import * as Actions from '../actions'
import { formatMoney } from '~/src/utils/functions'
import moment from "moment/moment"
import { withDatagrid } from '~/modules/datagrid'
import { withRouter } from 'next/router'
import { applyFilter } from '~/modules/filter/actions'
import { ArrayToMultiple } from '~/components/formatted-messages'
import React from "react";

function mapStateToProps(state, { router, datagrid }) {
  const { orders } = state
  const query = router ? router.query : { type: 'sales' }

  if (query.type !== orders.dataType) {
    orders.data = []
  }
  const { type } = query

  return {
    endpointType: query.type === 'sales' ? 'sale' : query.type,
    queryType: query.type,
    ...orders,
    isOpen: state.isOpen,
    filterData: state.forms.filter,
    rows: datagrid.rows.map(r => ({
      id: r.id,
      globalStatus: r.globalStatus,
      date: moment(r.orderDate).format('MM/DD/YYYY'),
      customerName: (type === 'sales' ? r.buyerCompanyName : r.sellerCompanyName),
      //productName: (typeof r.orderItems[0].productName !== 'undefined' ? r.orderItems[0].productName : 'N/A'),
      productName: 'N/A', //! ! missing in response from BE <ArrayToMultiple values={r.orderItems.map(d => (d.productName))} />,
      orderStatus: OrdersHelper.getOrderStatus(r.orderStatus),
      shippingStatus: OrdersHelper.getShippingStatus(r.shippingStatus),
      reviewStatus: OrdersHelper.getReviewStatus(r.reviewStatus),
      creditStatus: OrdersHelper.getCreditStatus(r.creditStatus),
      paymentStatus: OrdersHelper.getPaymentStatus(r.paymentStatus),
      bl: '',
      sds: '',
      cofA: '',
      orderTotal: "$" +
        r.totalPriceWithShipping
        ? r.totalPriceWithShipping.formatMoney(2)
        : r.totalPrice.formatMoney(2)
    })),
    activeStatus: orders.statusFilter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...Actions, dispatch, applyFilter }, dispatch)
}

export default withDatagrid(withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders)))
