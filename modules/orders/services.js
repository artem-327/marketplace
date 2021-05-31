import * as OrdersHelper from '../../components/helpers/Orders'
import moment from 'moment/moment'
import { getSafe, getFormattedAddress } from '../../utils/functions'
import { FormattedNumber } from 'react-intl'
import { currency, currencyUSSymbol } from '../../constants/index'
import { getLocaleDateFormat } from '../../components/date-format'

export const getOrderService = (state, ownProps) => {
    if (ownProps.router.query.type !== state.orders.detailType) {
      state.orders.detail = {}
    }
    
    const getReturnAddress = (data) => {
        let returnAddr = ''
        if (data.returnAddressStreet) {
        returnAddr = data.returnAddressStreet + ', '
        }
        if (data.returnAddressCity) {
        returnAddr += data.returnAddressCity + ', '
        }
        if (data.returnAddressCountry) {
        returnAddr += data.returnAddressCountry
        }
        return returnAddr
    }
    
    const prepareDetail = (data, type) => {
        if (typeof data.id === 'undefined') return {}
    
        const subtotal = getSafe(() => data.cfPriceSubtotal, 0)
        const totalPriceWithShipping = getSafe(() => data.cfPriceTotal, 0)
        const orderItems = getSafe(() => data.orderItems, [])
    
        let paymentNetDays = data.cfPaymentTerms && data.cfPaymentTerms.split(' ')
        paymentNetDays = paymentNetDays.length ? parseInt(paymentNetDays[paymentNetDays.length - 1], 10) : 0
    
        return {
        ...data,
        paymentTerms: data.paymentTerms,
        paymentNetDays,
        companyEin:
            type === 'sales'
            ? data.buyerCompanyTin
                ? data.buyerCompanyTin
                : 'N/A'
            : data.sellerCompanyTin
            ? data.sellerCompanyTin
            : 'N/A',
        acceptanceDate:
            typeof data.acceptanceDate !== 'undefined' ? moment(data.acceptanceDate).toDate().toLocaleString() : 'N/A',
        amount: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={subtotal}
            />
        ),
        buyerRejectionDate:
            typeof data.buyerRejectionDate !== 'undefined' ? moment(data.buyerRejectionDate).toDate().toLocaleString() : null,
        carrier: data.shippingCourierName ? data.shippingCourierName : 'N/A',
        chemicalName: orderItems.map(d => (d.companyGenericProductName ? d.companyGenericProductName : 'N/A')),
        confirmationDate:
            typeof data.confirmationDate !== 'undefined' ? moment(data.confirmationDate).toDate().toLocaleString() : 'N/A',
        contactEmail: data.sellerCompanyContactEmail ? data.sellerCompanyContactEmail : 'N/A',
        contactNumber: data.sellerCompanyContactPhone ? data.sellerCompanyContactPhone : 'N/A',
        createdBy: data.buyerName ? data.buyerName : 'N/A',
        creditStatus: OrdersHelper.getCreditStatus(data.creditReviewStatus),
        counterOrderId: getSafe(() => data.counterOrderId, 0),
        deliveryDate:
            typeof data.deliveryDate !== 'undefined' ? moment(data.deliveryDate).toDate().toLocaleString() : 'N/A',
        echoFee: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.echoFee ? data.echoFee : 0}
            />
        ),
        freight: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.shippingPrice ? data.shippingPrice : 0}
            />
        ),
        cfTax: getSafe(() => data.cfTax > 0, '') ? (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.cfTax}
            />
        ) : null,
        grossProfit: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={data.totalPriceWithShipping ? data.totalPriceWithShipping : 0}
            />
        ), // ! ! TBD
        id: data.id,
        incoterms: 'FOB', // ! ! TBD
        orderDate: data.orderDate && moment(data.orderDate).toDate().toLocaleString(),
        orderStatus: OrdersHelper.getOrderStatus(data.orderStatus),
        orderType: type === 'sales' ? 'Sales' : 'Purchase',
        packaging: orderItems.map(d =>
            d.packagingSize && d.packagingType && d.packagingUnit
            ? d.packagingSize + ' ' + d.packagingUnit.name.toLowerCase() + ' ' + d.packagingType.name
            : 'N/A'
        ),
        paymentInitiationDate:
            typeof data.paymentInitiationDate !== 'undefined'
            ? moment(data.paymentInitiationDate).toDate().toLocaleString()
            : 'N/A',
        paymentReceivedDate:
            typeof data.paymentReceivedDate !== 'undefined'
            ? moment(data.paymentReceivedDate).toDate().toLocaleString()
            : 'N/A',
        paymentSendDate:
            typeof data.paymentSendDate !== 'undefined' ? moment(data.paymentSendDate).toDate().toLocaleString() : 'N/A',
        paymentStatus: OrdersHelper.getPaymentStatus(data.paymentStatus),
        pickUpAddress: getFormattedAddress({
            street: data.returnAddressStreet,
            city: data.returnAddressCity,
            zip: data.returnAddressZip,
            province: data.returnAddressProvince,
            country: data.returnAddressCountry
        }),
        productCode: orderItems.map(d => (d.companyGenericProductCode ? d.companyGenericProductCode : 'N/A')),
        productName: orderItems.map(d => (d.companyGenericProductName ? d.companyGenericProductName : 'N/A')),
        productOfferIds: data.orderItems.map(orderItem => orderItem.productOffer),
        proNumber: 'N/A', // ! ! TBD
        quantityOrdered: orderItems.map(d =>
            d.packagingSize && d.packagingUnit
            ? `${Number.parseFloat(d.pkgAmount * d.packagingSize).toFixed(2)} ${d.packagingUnit.nameAbbreviation}`
            : 'N/A'
        ),
        refundDate: typeof data.refundDate !== 'undefined' ? moment(data.refundDate).toDate().toLocaleString() : null,
        returnDeliveryDate:
            typeof data.returnDeliveryDate !== 'undefined' ? moment(data.returnDeliveryDate).toDate().toLocaleString() : null,
        returnShipDate:
            typeof data.returnShipDate !== 'undefined' ? moment(data.returnShipDate).toDate().toLocaleString() : null,
        returnStatus: OrdersHelper.getReturnStatus(data.returnStatus),
        returnTo: data.sellerCompanyName,
        returnAddressName: data.returnAddressContactName,
        returnAddressContactEmail: data.returnAddressContactEmail,
        returnAddressContactPhone: data.returnAddressContactPhone,
        returnAddress: getReturnAddress(data),
        returnCourierName: data.returnCourierName,
        reviewStatus: OrdersHelper.getReviewStatus(data.reviewStatus),
        sellerRejectionDate:
            typeof data.sellerRejectionDate !== 'undefined'
            ? moment(data.sellerRejectionDate).toDate().toLocaleString()
            : null,
        service: 'N/A', // ! ! TBD
        shipDate: typeof data.shipDate !== 'undefined' ? moment(data.shipDate).toDate().toLocaleString() : 'N/A',
        shippingContact: data.sellerCompanyContactName ? data.sellerCompanyContactName : 'N/A',
        shippingStatus: OrdersHelper.getShippingStatus(data.shippingStatus),
        shipTo: data.shippingAddressContactName,
        shipToAddress: getFormattedAddress({
            street: data.shippingAddressStreet,
            city: data.shippingAddressCity,
            zip: data.shippingAddressZip,
            province: data.shippingAddressProvince,
            country: data.shippingAddressCountry
        }),
        shipToEmail: data.shippingAddressContactEmail,
        shipToPhone: data.shippingAddressContactPhone,
        frsId: data.shippingAddressEpaFrsId
            ? (
            data.shippingAddressEpaFacilityUrl
                ? (<a href={data.shippingAddressEpaFacilityUrl} target='_blank'>{data.shippingAddressEpaFrsId}</a>)
                : data.shippingAddressEpaFrsId
            ) : '',
        epaRegion: data.shippingAddressEpaRegion,
        subtotal: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={subtotal}
            />
        ), //"$" + totalPrice.formatMoney(2),
        terms: data.cfPaymentTerms ? data.cfPaymentTerms : 'N/A',
        total: (
            <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            children={val => <>{`${val} ${currencyUSSymbol}`}</>}
            value={totalPriceWithShipping}
            />
        ), //"$" + totalPriceWithShipping.formatMoney(2),
        totalPkg: orderItems.map(d => d.pkgAmount),
        unit: orderItems.map(d => (d.packagingUnit ? d.packagingUnit.nameAbbreviation : 'N/A')),
        unitPrice: orderItems.map(d =>
            d.pricePerUOM ? (
            <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
                value={d.pricePerUOM}
            />
            ) : (
            'N/A'
            )
        ),
        itemTotal: orderItems.map(d =>
            d.priceSubtotal ? (
            <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
                value={d.priceSubtotal}
            />
            ) : (
            'N/A'
            )
        ),
        //<FormattedNumber style='currency' currency={currency} value={0} />, //"$" + getSafe(() => data.orderItems[0].price, 0).formatMoney(2),
        // Vendor or Customer
        paymentType: type === 'sales' ? 'Customer' : 'Vendor',
        paymentAddress:
            type === 'sales'
            ? data.buyerCompanyAddressStreet +
                ', ' +
                data.buyerCompanyAddressCity +
                ', ' +
                data.buyerCompanyAddressZip +
                ' ' +
                data.buyerCompanyAddressCountry
            : data.sellerCompanyAddressStreet +
                ', ' +
                data.sellerCompanyAddressCity +
                ', ' +
                data.sellerCompanyAddressZip +
                ' ' +
                data.sellerCompanyAddressCountry,
        paymentEmail: type === 'sales' ? data.buyerCompanyContactEmail : data.sellerCompanyContactEmail,
        paymentName: type === 'sales' ? data.buyerCompanyName : data.sellerCompanyName,
        paymentPhone: type === 'sales' ? data.buyerCompanyContactPhone : data.sellerCompanyContactPhone,
        paymentContact: type === 'sales' ? data.buyerCompanyContactName : data.sellerCompanyContactName,
        shippingTrackingCode: data.shippingTrackingCode ? data.shippingTrackingCode : '',
        isTrackingNumberEditable: data.trackingNumberEditable ? data.trackingNumberEditable : false,
        isReturnTrackingNumberEditable: data.returnTrackingNumberEditable ? data.returnTrackingNumberEditable : false,
        returnShippingTrackingCode: data.returnShippingTrackingCode ? data.returnShippingTrackingCode : '',
        note: getSafe(() => data.note, ''),
        attachments: getSafe(() => data.attachments, []),
        brokerageFee:
            data?.brokerageFee && +data.brokerageFee > 0 ? (
            <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
                value={data.brokerageFee}
            />
            ) : null,
        transactionFee:
            data?.transactionFee && +data.transactionFee > 0 ? (
            <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                children={val => <>{`${val} ${currencyUSSymbol}`}</>}
                value={data.transactionFee}
            />
            ) : null
        }
    }
    return prepareDetail(state.orders.detail, ownProps.router.query.type)
}

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