import { createSelector } from 'reselect'
import { getSafe } from '../../utils/functions'
import { getOrderService } from './services'


const getOrder = (state, ownProps) => getOrderService(state, ownProps)
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
const getIsOpen = state => state?.isOpen
const getFilterData = state => state?.forms?.filter
const getActiveStatus = state => state?.orders?.statusFilter
const getDocumentTypesFetching = state => state?.orders?.documentTypesFetching
const getTutorialCompleted = state => getSafe(() => state.auth.identity.tutorialCompleted, false)
const getRelatedOrders = state => state?.orders?.relatedOrders
const getLoadRelatedOrders = state => state?.orders?.loadRelatedOrders
const getIsFetching = state => state?.orders?.isFetching
const getTableHandlersFilters = state => state?.orders?.tableHandlersFilters

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
export const makeGetIsOpen = () => createSelector([getIsOpen], isOpen => isOpen)
export const makeGetFilterData = () => createSelector([getFilterData], filterData => filterData)
export const makeGetActiveStatus = () => createSelector([getActiveStatus], activeStatus => activeStatus)
export const makeGetDocumentTypesFetching = () => createSelector([getDocumentTypesFetching], documentTypesFetching => documentTypesFetching)
export const makeGetTutorialCompleted = () => createSelector([getTutorialCompleted], tutorialCompleted => tutorialCompleted)
export const makeGetRelatedOrders = () => createSelector([getRelatedOrders], relatedOrders => relatedOrders)
export const makeGetLoadRelatedOrders = () => createSelector([getLoadRelatedOrders], loadRelatedOrders => loadRelatedOrders)
export const makeGetIsFetching = () => createSelector([getIsFetching], isFetching => isFetching)
export const makeGetTableHandlersFilters = () => createSelector([getTableHandlersFilters], tableHandlersFilters => tableHandlersFilters)
