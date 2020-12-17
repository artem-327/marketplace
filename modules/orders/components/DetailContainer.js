import { connect } from 'react-redux'
import React from 'react'
import Detail from './Detail'
import * as Actions from '../actions'
import * as OrdersHelper from '~/src/helpers/Orders'
import moment from 'moment/moment'
import { getSafe, getFormattedAddress } from '~/utils/functions'
import { FormattedNumber } from 'react-intl'
import { ArrayToMultiple } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { downloadAttachment, addAttachment } from '~/modules/inventory/actions'

function actionRequired(data) {
  // return statuses code
  return getSafe(() => data.orderStatus.toString(), 0) + getSafe(() => data.shippingStatus.toString(), 0)
}

function getReturnAddress(data) {
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

function prepareDetail(data, type) {
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
        style='currency'
        currency={currency}
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
    deliveryDate:
      typeof data.deliveryDate !== 'undefined' ? moment(data.deliveryDate).toDate().toLocaleString() : 'N/A',
    echoFee: (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={data.echoFee ? data.echoFee : 0}
      />
    ),
    freight: (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={data.shippingPrice ? data.shippingPrice : 0}
      />
    ),
    cfTax: getSafe(() => data.cfTax > 0, '') ? (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={data.cfTax}
      />
    ) : null,
    grossProfit: (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
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
    subtotal: (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={subtotal}
      />
    ), //"$" + totalPrice.formatMoney(2),
    terms: data.cfPaymentTerms ? data.cfPaymentTerms : 'N/A',
    total: (
      <FormattedNumber
        minimumFractionDigits={2}
        maximumFractionDigits={2}
        style='currency'
        currency={currency}
        value={totalPriceWithShipping}
      />
    ), //"$" + totalPriceWithShipping.formatMoney(2),
    totalPkg: orderItems.map(d => d.pkgAmount),
    unit: orderItems.map(d => (d.packagingUnit ? d.packagingUnit.nameAbbreviation : 'N/A')),
    unitPrice: orderItems.map(d =>
      d.pricePerUOM ? (
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
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
          style='currency'
          currency={currency}
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
    attachments: getSafe(() => data.attachments, [])
  }
}

function mapStateToProps(state, ownProps) {
  const { orders } = state

  if (ownProps.router.query.type !== orders.detailType) {
    orders.detail = {}
  }

  return {
    order: prepareDetail(orders.detail, ownProps.router.query.type),
    echoSupportPhone: getSafe(
      () => state.auth.identity.settings.find(el => el.key === 'APP_SUPPORT_PHONE_NUMBER').value,
      'N/A'
    ),
    isPaymentCancellable: getSafe(() => orders.detail.isPaymentCancellable, false),
    openedAssignLots: orders.openedAssignLots,
    openedReinitiateTransfer: orders.openedReinitiateTransfer,
    openedEnterTrackingIdShip: orders.openedEnterTrackingIdShip,
    openedEnterTrackingIdReturnShip: orders.openedEnterTrackingIdReturnShip,
    openedPurchaseRejectDelivery: orders.openedPurchaseRejectDelivery,
    openedPurchaseRequestCreditDelivery: orders.openedPurchaseRequestCreditDelivery,
    openedPurchaseReviewCreditRequest: orders.openedPurchaseReviewCreditRequest,
    openedSaleReturnShipping: orders.openedSaleReturnShipping,
    openedSaleReviewCreditRequest: orders.openedSaleReviewCreditRequest,
    openedPurchaseOrderShipping: orders.openedPurchaseOrderShipping,
    action: actionRequired(orders.detail),
    opendSaleAttachingProductOffer: orders.opendSaleAttachingProductOffer,
    listDocumentTypes: orders.listDocumentTypes,
    loadingRelatedDocuments: orders.loadingRelatedDocuments,
    isAdmin: getSafe(() => state.auth.identity.isAdmin, false),
    isCompanyAdmin: getSafe(() => state.auth.identity.isCompanyAdmin, false),
    isOrderProcessing: getSafe(() => state.auth.identity.isOrderProcessing, false),
    isClientCompanyAdmin: getSafe(() => state.auth.identity.isClientCompanyAdmin, false)
  }
}

export default connect(mapStateToProps, { ...Actions, downloadAttachment, addAttachment })(Detail)
