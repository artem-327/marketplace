import React from 'react'
import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
import moment from 'moment/moment'

import Orders from './Orders'
import * as OrdersHelper from '~/src/helpers/Orders'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import { ArrayToMultiple } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { downloadAttachmentPdf } from '~/modules/inventory/actions'
import { getLocaleDateFormat } from '~/components/date-format'

function mapStateToProps(state, { router, datagrid }) {
  const { orders } = state
  const query = router ? router.query : { type: 'sales' }

  if (query.type !== orders.dataType) {
    orders.data = []
  }
  const { type } = query

  return {
    endpointType: type === 'sales' ? 'sale' : type,
    queryType: type,
    ...orders,
    isOpen: state.isOpen,
    filterData: state.forms.filter,
    rows: datagrid.rows.map(r => ({
      id: r.id,
      globalStatus: r.cfGlobalStatus,
      date: r.orderDate && moment(r.orderDate).format(getLocaleDateFormat()),
      customerName: type === 'sales' ? r.buyerCompanyName : r.sellerCompanyName,
      orderItems: r.orderItems,
      orderStatus: OrdersHelper.getOrderStatus(r.orderStatus),
      shippingStatus: OrdersHelper.getShippingStatus(r.shippingStatus),
      reviewStatus: OrdersHelper.getReviewStatus(r.reviewStatus),
      creditStatus: OrdersHelper.getCreditStatus(r.creditReviewStatus),
      paymentStatus: OrdersHelper.getPaymentStatus(r.paymentStatus),
      bl: '',
      sds: '',
      cofA: '',
      orderTotal: <FormattedNumber style='currency' currency={currency} value={r.cfPriceTotal} />,
      accountingDocumentsCount: r.accountingDocumentsCount
    })),
    activeStatus: orders.statusFilter
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...Actions, downloadAttachmentPdf, dispatch, applyFilter }, dispatch)
}

export default withDatagrid(withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders)))
