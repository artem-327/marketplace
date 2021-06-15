import { FormattedNumber } from 'react-intl'
import moment from 'moment/moment'
import * as OrdersHelper from '../../../../components/helpers/Orders'
import { currency } from '../../../../constants/index'
import { getLocaleDateFormat } from '../../../../components/date-format'

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

export const getRows = datagrid => datagrid?.rows?.map(r => {
    const isCancelable =
        r.orderStatus === 4 /* Draft */ ||
        r.orderStatus === 1 /* Pending */ ||
        (r.orderStatus === 2 /* Confirmed */ &&
            r.reviewStatus === 0 &&
            r.creditReviewStatus === 0 &&
            r.paymentStatus === 0 &&
            (r.shippingStatus === 0 || r.shippingStatus === 1)) /* Not shipped */
    return {
        id: r.id,
        clsName: 'tree-table root-row',
        isCancelable,
        root: true,
        treeRoot: true,
        rawData: r,
        globalStatus: r.cfGlobalStatus,
        date: r.orderDate && moment(r.orderDate).format(getLocaleDateFormat()),
        customerName: r.sellerCompanyName,
        orderStatus: OrdersHelper.getOrderStatus(r.orderStatus),
        shippingStatus: OrdersHelper.getShippingStatus(r.shippingStatus),
        reviewStatus: OrdersHelper.getReviewStatus(r.reviewStatus),
        creditStatus: OrdersHelper.getCreditStatus(r.creditReviewStatus),
        paymentStatus: OrdersHelper.getPaymentStatus(r.paymentStatus),
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
        orderItems: r.orderItems
            ? r.orderItems.map(item => {
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
                bl
                }
            })
            : []
    }
})