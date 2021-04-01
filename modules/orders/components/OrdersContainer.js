import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'next/router'
import moment from 'moment/moment'

import Orders from './Orders'
import * as OrdersHelper from '~/components/helpers/Orders'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import { ArrayToMultiple } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { downloadAttachment, downloadAttachmentPdf } from '~/modules/inventory/actions'
import { getLocaleDateFormat } from '~/components/date-format'
import { getSafe } from '~/utils/functions'

const filterAttachments = (a, type) => {
  if (!a) return []
  let filtered = a.reduce((latest, a) => {
    if (a.documentType && a.documentType.id === type) {
      if (latest) {
        if (latest.id < a.id) {
          latest = a
        }
      } else {
        latest = a
      }
    }
    return latest
  }, null)
  return filtered ? [filtered] : []
}

function mapStateToProps(state, { router, datagrid, currentTab }) {
  const { orders } = state

  if (currentTab !== orders.dataType) {
    orders.data = []
  }

  return {
    endpointType: currentTab === 'sales' ? 'sale' : currentTab,
    ...orders,
    isOpen: state.isOpen,
    filterData: state.forms.filter,
    rows: datagrid.rows.map(r => ({
      id: r.id,
      rawData: r,
      clsName: 'tree-table root-row',
      root: true,
      treeRoot: true,
      globalStatus: r.cfGlobalStatus,
      date: r.orderDate && moment(r.orderDate).format(getLocaleDateFormat()),
      customerName: currentTab === 'sales' ? r.buyerCompanyName : r.sellerCompanyName,
      orderStatus: OrdersHelper.getOrderStatusWithIconCircle(r.orderStatus),
      shippingStatus: OrdersHelper.getShippingStatus(r.shippingStatus),
      reviewStatus: OrdersHelper.getReviewStatus(r.reviewStatus),
      creditStatus: OrdersHelper.getCreditStatus(r.creditReviewStatus),
      paymentStatus: OrdersHelper.getPaymentStatus(r.paymentStatus),
      disputeResolutionStatus: OrdersHelper.getDisputeStatus(r.disputeResolutionStatus),
      bl: '',
      sds: '',
      cofA: '',
      orderTotal: (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={r.cfPriceTotal}
        />
      ),
      accountingDocumentsCount: r.accountingDocumentsCount,
      attachments: r.attachments,
      orderItems: r.orderItems.map(item => {
        let cofA = filterAttachments(item.attachments, 1) // C of A
        let sds = filterAttachments(item.attachments, 3) // SDS
        let bl = filterAttachments(item.attachments, 10) // B/L
        return {
          ...item,
          rawData: item,
          id: r.id + '_' + item.id,
          clsName: 'tree-table nested-row',
          cofA,
          sds,
          bl,
          packaging:
            item.packagingSize && item.packagingType && item.packagingUnit
              ? item.packagingSize + ' ' + item.packagingUnit.name.toLowerCase() + ' ' + item.packagingType.name
              : 'N/A',
          fobPrice: (
            <FormattedNumber
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              style='currency'
              currency={currency}
              value={item.pricePerUOM}
            />
          ),
          orderTotal: (
            <FormattedNumber
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              style='currency'
              currency={currency}
              value={item.priceSubtotal}
            />
          )
        }
      })
    })),
    activeStatus: orders.statusFilter,
    listDocumentTypes: orders.listDocumentTypes,
    documentTypesFetching: orders.documentTypesFetching,
    tutorialCompleted: getSafe(() => state.auth.identity.tutorialCompleted, false)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...Actions, downloadAttachment, downloadAttachmentPdf, dispatch, applyFilter }, dispatch)
}

export default withDatagrid(withRouter(connect(mapStateToProps, mapDispatchToProps)(Orders)))
