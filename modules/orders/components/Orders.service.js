import * as OrdersHelper from '../../../components/helpers/Orders'
import moment from 'moment/moment'
import { FormattedNumber } from 'react-intl'
import { currency } from '../../../constants/index'
import { getLocaleDateFormat } from '../../../components/date-format'

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
  
export const getRows = (datagrid, currentTab) => datagrid.rows.map(r => ({
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
}))