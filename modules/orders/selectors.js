import { createSelector } from 'reselect'
import { getSafe } from '../../utils/functions'


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
const getLoadingRelatedDocuments = state => state?.orders?.loadingRelatedDocuments
const getIsAdmin = state => getSafe(() => state.auth.identity.isAdmin, false)
const getIsCompanyAdmin = state => getSafe(() => state.auth.identity.isCompanyAdmin, false)
const getIsOrderProcessing = state => getSafe(() => state.auth.identity.isOrderProcessing, false)
const getIsThirdPartyConnectionException = state => getSafe(() => state.orders.isThirdPartyConnectionException, false)
const getIsSending = state => state?.orders?.isSending
const getopenedDisputedRequest = state => state?.orders?.openedDisputedRequest
const getAppInfo = state => state?.auth?.identity?.appInfo
const getIsOpen = state => state?.isOpen
const getFilterData = state => state?.forms?.filter
const getActiveStatus = state => state?.orders?.statusFilter
const getTutorialCompleted = state => getSafe(() => state.auth.identity.tutorialCompleted, false)
const getRelatedOrders = state => state?.orders?.relatedOrders
const getLoadRelatedOrders = state => state?.orders?.loadRelatedOrders
const getIsFetching = state => state?.orders?.isFetching
const getTableHandlersFilters = state => state?.orders?.tableHandlersFilters
const getOrderStatus = state => getSafe(() => state.orders.detail.orderStatus, 0)
const getShippingStatus = state => getSafe(() => state.orders.detail.shippingStatus, 0)
const getReviewStatus = state => getSafe(() => state.orders.detail.reviewStatus, 0)
const getCreditReviewStatus = state => getSafe(() => state.orders.detail.creditReviewStatus, 0)
const getDisputeResolutionStatus = state => getSafe(() => state.orders.detail.disputeResolutionStatus, 0)
const getReturnStatus = state => getSafe(() => state.orders.detail.returnStatus, 0)
const getDetail = state => state?.orders?.detail
const getShippingTrackingCode = state => getSafe(() => state.orders.detail.shippingTrackingCode, '')
const getReturnShippingTrackingCode = state => getSafe(() => state.orders.detail.returnShippingTrackingCode, '')
const getOrderCreditHistoryOpen = state => getSafe(() => state.orders.detail.orderCreditHistoryOpen, false)
const getOpenedPopup = state => state?.orders?.openedEnterTrackingIdShip |
    state?.orders?.openedEnterTrackingIdReturnShip |
    state?.orders?.openedPurchaseRejectDelivery |
    state?.orders?.openedPurchaseRequestCreditDelivery |
    state?.orders?.opendSaleAttachingProductOffer
const getActionNeeded = state => getSafe(() => state.orders.detail.actionNeeded, '')
const getSellEligible = state => getSafe(() => state.auth.identity.company.sellEligible, false)
const getPoLots = state => getSafe(() => state.orders.detail.poLots, [])
const getOrderId = state => state?.orders?.detail?.id
const getOrderItems = state => state?.orders?.detail?.orderItems.map(orderItem => {
    return {
        id: orderItem.id,
        lots: orderItem.lots,
        amount: orderItem.amount,
        productOffer: orderItem.productOffer
    }
})
const getApplicationName = state => state?.auth?.identity?.appInfo?.applicationName
const getShippingQuotesAreFetching = state => state?.orders?.shippingQuotesAreFetching
const getShippingQuotes = state => getSafe(() => state.orders.shippingQuotes, {})
const getCreditRequestHistory = state => state?.orders?.detail?.creditRequestHistory
const getBankAccounts = state => state?.orders?.bankAccounts
const getBankAccountsLoading = state => state?.orders?.bankAccountsLoading
const getPaymentProcessor = state => getSafe(() => state.auth.identity.company.paymentProcessor, '')
const getLoadingGroupedProductOffer = state => getSafe(() => state.orders.loadingGroupedProductOffer, false)
const getGroupedProductOffers = state => getSafe(() => state.orders.groupedProductOffers, false)
const getAvailable = state => getSafe(() => state.orders.groupedProductOffers, []).map(offer => {
    if (!Array.isArray(offer)) return
    return offer.reduce((total, pkg) => total + pkg.pkgAvailable)
})
const getAllocated = state => getSafe(() => state.orders.groupedProductOffers, []).map(offer => {
    if (!Array.isArray(offer)) return
    return offer.reduce((total, pkg) => total + pkg.pkgAllocated)
})

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
export const makeGetLoadingRelatedDocuments = () => createSelector([getLoadingRelatedDocuments], loadingRelatedDocuments => loadingRelatedDocuments)
export const makeGetIsAdmin = () => createSelector([getIsAdmin], isAdmin => isAdmin)
export const makeGetIsCompanyAdmin = () => createSelector([getIsCompanyAdmin], isCompanyAdmin => isCompanyAdmin)
export const makeGetIsOrderProcessing = () => createSelector([getIsOrderProcessing], isOrderProcessing => isOrderProcessing)
export const makeGetIsThirdPartyConnectionException = () => createSelector([getIsThirdPartyConnectionException], isThirdPartyConnectionException => isThirdPartyConnectionException)
export const makeGetIsSending = () => createSelector([getIsSending], isSending => isSending)
export const makeGetopenedDisputedRequest = () => createSelector([getopenedDisputedRequest], openedDisputedRequest => openedDisputedRequest)
export const makeGetAppInfo = () => createSelector([getAppInfo], appInfo => appInfo)
export const makeGetIsOpen = () => createSelector([getIsOpen], isOpen => isOpen)
export const makeGetFilterData = () => createSelector([getFilterData], filterData => filterData)
export const makeGetActiveStatus = () => createSelector([getActiveStatus], activeStatus => activeStatus)
export const makeGetTutorialCompleted = () => createSelector([getTutorialCompleted], tutorialCompleted => tutorialCompleted)
export const makeGetRelatedOrders = () => createSelector([getRelatedOrders], relatedOrders => relatedOrders)
export const makeGetLoadRelatedOrders = () => createSelector([getLoadRelatedOrders], loadRelatedOrders => loadRelatedOrders)
export const makeGetIsFetching = () => createSelector([getIsFetching], isFetching => isFetching)
export const makeGetTableHandlersFilters = () => createSelector([getTableHandlersFilters], tableHandlersFilters => tableHandlersFilters)
export const makeGetOrderStatus = () => createSelector([getOrderStatus], orderStatus => orderStatus)
export const makeGetShippingStatus = () => createSelector([getShippingStatus], shippingStatus => shippingStatus)
export const makeGetReviewStatus = () => createSelector([getReviewStatus], reviewStatus => reviewStatus)
export const makeGetCreditReviewStatus = () => createSelector([getCreditReviewStatus], creditReviewStatus => creditReviewStatus)
export const makeGetDisputeResolutionStatus = () => createSelector([getDisputeResolutionStatus], disputeResolutionStatus => disputeResolutionStatus)
export const makeGetReturnStatus = () => createSelector([getReturnStatus], returnStatus => returnStatus)
export const makeGetDetail = () => createSelector([getDetail], detail => detail)
export const makeGetShippingTrackingCode = () => createSelector([getShippingTrackingCode], shippingTrackingCode => shippingTrackingCode)
export const makeGetReturnShippingTrackingCode = () => createSelector([getReturnShippingTrackingCode], returnShippingTrackingCode => returnShippingTrackingCode)
export const makeGetOrderCreditHistoryOpen = () => createSelector([getOrderCreditHistoryOpen], orderCreditHistoryOpen => orderCreditHistoryOpen)
export const makeGetOpenedPopup = () => createSelector([getOpenedPopup], openedPopup => openedPopup)
export const makeGetActionNeeded = () => createSelector([getActionNeeded], actionNeeded => actionNeeded)
export const makeGetSellEligible = () => createSelector([getSellEligible], sellEligible => sellEligible)
export const makeGetPoLots = () => createSelector([getPoLots], poLots => poLots)
export const makeGetOrderId = () => createSelector([getOrderId], orderId => orderId)
export const makeGetOrderItems = () => createSelector([getOrderItems], orderItems => orderItems)
export const makeGetApplicationName = () => createSelector([getApplicationName], applicationName => applicationName)
export const makeGetShippingQuotesAreFetching = () => createSelector([getShippingQuotesAreFetching], shippingQuotesAreFetching => shippingQuotesAreFetching)
export const makeGetShippingQuotes = () => createSelector([getShippingQuotes], shippingQuotes => shippingQuotes)
export const makeGetCreditRequestHistory = () => createSelector([getCreditRequestHistory], creditRequestHistory => creditRequestHistory)
export const makeGetBankAccounts = () => createSelector([getBankAccounts], bankAccounts => bankAccounts)
export const makeGetBankAccountsLoading = () => createSelector([getBankAccountsLoading], bankAccountsLoading => bankAccountsLoading)
export const makeGetPaymentProcessor = () => createSelector([getPaymentProcessor], paymentProcessor => paymentProcessor)
export const makeGetLoadingGroupedProductOffer = () => createSelector([getLoadingGroupedProductOffer], loadingGroupedProductOffer => loadingGroupedProductOffer)
export const makeGetGroupedProductOffers = () => createSelector([getGroupedProductOffers], groupedProductOffers => groupedProductOffers)
export const makeGetAvailable = () => createSelector([getAvailable], available => available)
export const makeGetAllocated = () => createSelector([getAllocated], allocated => allocated)
