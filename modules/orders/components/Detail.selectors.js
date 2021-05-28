import { createSelector } from 'reselect'
import * as OrdersHelper from '../../../components/helpers/Orders'
import moment from 'moment/moment'
import { getSafe, getFormattedAddress } from '../../../utils/functions'
import { FormattedNumber } from 'react-intl'
import { currency, currencyUSSymbol } from '../../../constants/index'

const getOrder = (state, ownProps) => {
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
const getEchoSupportPhone = state => getSafe(() => state.auth.identity.settings.find(el => el.key === 'APP_SUPPORT_PHONE_NUMBER').value, 'N/A')
const getIsPaymentCancellable = state => getSafe(() => state.orders.detail.isPaymentCancellable, false)
const getOpenedAssignLots = state => state?.orders?.openedAssignLots
const getOpenedReinitiateTransfer = state => state?.orders?.openedReinitiateTransfer
const getOpenedEnterTrackingIdShip = state => state?.orders?.openedEnterTrackingIdShip
const getOpenedEnterTrackingIdReturnShip = state => state?.orders?.openedEnterTrackingIdReturnShip
const getOpenedPurchaseRejectDelivery = state => state?.orders?.openedPurchaseRejectDelivery
const getOpenedPurchaseRequestCreditDelivery = state => state?.orders?.openedPurchaseRequestCreditDelivery
const getOpenedPurchaseReviewCreditRequest = state => state?.orders?.openedPurchaseReviewCreditRequest
const getOpenedSaleReturnShipping = state => state?.orders?.openedSaleReturnShipping
const getOpenedSaleReviewCreditRequest = state => state?.orders?.openedSaleReviewCreditRequest
const getOpenedPurchaseOrderShipping = state => state?.orders?.openedPurchaseOrderShipping
const getAction = state => getSafe(() => state.orders.detail.orderStatus.toString(), 0) + getSafe(() => state.orders.detail.shippingStatus.toString(), 0)
const getopendSaleAttachingProductOffer = state => state?.orders?.opendSaleAttachingProductOffer
const getListDocumentTypes = state => state?.orders?.listDocumentTypes
const getLoadingRelatedDocuments = state => state?.orders?.loadingRelatedDocuments
const getIsAdmin = state => getSafe(() => state.auth.identity.isAdmin, false)
const getIsCompanyAdmin = state => getSafe(() => state.auth.identity.isCompanyAdmin, false)
const getIsOrderProcessing = state => getSafe(() => state.auth.identity.isOrderProcessing, false)
const getIsThirdPartyConnectionException = state => getSafe(() => state.orders.isThirdPartyConnectionException, false)
const getIsSending = state => state?.orders?.isSending
const getopenedDisputedRequest = state => state?.orders?.openedDisputedRequest
const getAppInfo = state => state?.auth?.identity?.appInfo

export const makeGetOrder = () => createSelector([getOrder], order => order)
export const makeGetEchoSupportPhone = () => createSelector([getEchoSupportPhone], echoSupportPhone => echoSupportPhone)
export const makeGetIsPaymentCancellable = () => createSelector([getIsPaymentCancellable], isPaymentCancellable => isPaymentCancellable)
export const makeGetOpenedAssignLots = () => createSelector([getOpenedAssignLots], openedAssignLots => openedAssignLots)
export const makeGetOpenedReinitiateTransfer = () => createSelector([getOpenedReinitiateTransfer], openedReinitiateTransfer => openedReinitiateTransfer)
export const makeGetOpenedEnterTrackingIdShip = () => createSelector([getOpenedEnterTrackingIdShip], openedEnterTrackingIdShip => openedEnterTrackingIdShip)
export const makeGetOpenedEnterTrackingIdReturnShip = () => createSelector([getOpenedEnterTrackingIdReturnShip], openedEnterTrackingIdReturnShip => openedEnterTrackingIdReturnShip)
export const makeGetOpenedPurchaseRejectDelivery = () => createSelector([getOpenedPurchaseRejectDelivery], openedPurchaseRejectDelivery => openedPurchaseRejectDelivery)
export const makeGetOpenedPurchaseRequestCreditDelivery = () => createSelector([getOpenedPurchaseRequestCreditDelivery], openedPurchaseRequestCreditDelivery => openedPurchaseRequestCreditDelivery)
export const makeGetOpenedPurchaseReviewCreditRequest = () => createSelector([getOpenedPurchaseReviewCreditRequest], openedPurchaseReviewCreditRequest => openedPurchaseReviewCreditRequest)
export const makeGetOpenedSaleReturnShipping = () => createSelector([getOpenedSaleReturnShipping], openedSaleReturnShipping => openedSaleReturnShipping)
export const makeGetOpenedSaleReviewCreditRequest = () => createSelector([getOpenedSaleReviewCreditRequest], openedSaleReviewCreditRequest => openedSaleReviewCreditRequest)
export const makeGetOpenedPurchaseOrderShipping = () => createSelector([getOpenedPurchaseOrderShipping], openedPurchaseOrderShipping => openedPurchaseOrderShipping)
export const makeGetAction = () => createSelector([getAction], action => action)
export const makeGetopendSaleAttachingProductOffer = () => createSelector([getopendSaleAttachingProductOffer], opendSaleAttachingProductOffer => opendSaleAttachingProductOffer)
export const makeGetListDocumentTypes = () => createSelector([getListDocumentTypes], listDocumentTypes => listDocumentTypes)
export const makeGetLoadingRelatedDocuments = () => createSelector([getLoadingRelatedDocuments], loadingRelatedDocuments => loadingRelatedDocuments)
export const makeGetIsAdmin = () => createSelector([getIsAdmin], isAdmin => isAdmin)
export const makeGetIsCompanyAdmin = () => createSelector([getIsCompanyAdmin], isCompanyAdmin => isCompanyAdmin)
export const makeGetIsOrderProcessing = () => createSelector([getIsOrderProcessing], isOrderProcessing => isOrderProcessing)
export const makeGetIsThirdPartyConnectionException = () => createSelector([getIsThirdPartyConnectionException], isThirdPartyConnectionException => isThirdPartyConnectionException)
export const makeGetIsSending = () => createSelector([getIsSending], isSending => isSending)
export const makeGetopenedDisputedRequest = () => createSelector([getopenedDisputedRequest], openedDisputedRequest => openedDisputedRequest)
export const makeGetAppInfo = () => createSelector([getAppInfo], appInfo => appInfo)
