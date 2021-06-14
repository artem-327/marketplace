import typeToReducer from 'type-to-reducer'
import Router from 'next/router'
import { getSafe } from '../../utils/functions'
import {
  loadData,
  confirmOrder,
  confirmReturned,
  rejectOrder,
  shipOrder,
  returnShipOrder,
  downloadPdf,
  searchCompany,
  openAssignLots,
  closeAssignLots,
  assignLots,
  loadLotsToAssign,
  linkAttachment,
  removeAttachmentLink,
  removeAttachment,
  cancelPayment,
  openReinitiateTransfer,
  closeReinitiateTransfer,
  loadDwollaBankAccounts,
  loadVellociBankAccounts,
  payOrder,
  cancelOrder,
  clearRelatedOrders,
  getRelatedOrders,
  approveOrder,
  discardOrder,
  openPopupName,
  closePopup,
  receivedOrder,
  acceptDelivery,
  getReturnShipmentRates,
  returnShipmentOrder,
  rejectPurchaseOrder,
  creditCounterAccept,
  creditCounter,
  creditCounterReject,
  creditRequest,
  getShippingQuotes,
  getManualShippingQuote,
  purchaseShipmentOrder,
  downloadCreditRequestAttachments,
  creditAccept,
  getPurchaseOrder,
  getSaleOrder,
  applyDatagridFilter,
  getGroupedProductOffers,
  patchAssignProductOffers,
  deleteAssignProductOffers,
  clearGroupedProductOffer,
  linkAttachmentToOrderItem,
  removeLinkAttachmentToOrderItem,
  getDocumentTypes,
  unlinkAttachmentToOrder,
  linkAttachmentToOrder,
  clearOrderDetail,
  editTrackingCode,
  editReturnTrackingCode,
  saveFilters,
  orderResolutionReopen,
  orderResolutionAccept,
  downloadDisputeAttachment
} from './actions'

const initialState = {
  data: [],
  dataType: null,
  detail: {},
  detailType: null,
  isFetching: false,
  isDetailFetching: false,
  isSending: false,
  selectedIndex: -1,
  statusFilter: null,
  searchedCompanies: [],
  openedAssignLots: false,
  openedReinitiateTransfer: false,
  openedEnterTrackingIdShip: false,
  openedEnterTrackingIdReturnShip: false,
  openedPurchaseRejectDelivery: false,
  openedPurchaseRequestCreditDelivery: false,
  openedPurchaseReviewCreditRequest: false,
  openedSaleReviewCreditRequest: false,
  openedSaleReturnShipping: false,
  openedPurchaseOrderShipping: false,
  bankAccounts: [],
  bankAccountsLoading: false,
  relatedOrders: [],
  returnShipmentRates: {},
  shipmentOrderResult: {},
  returnShipmentOrderResult: {},
  loadRelatedOrders: false,
  shippingQuotesAreFetching: false,
  shippingQuotes: {},
  datagridFilter: { filters: [] },
  datagridFilterUpdate: false,
  opendSaleAttachingProductOffer: false,
  groupedProductOffers: [],
  loadingGroupedProductOffers: false,
  order: [],
  documentTypesFetching: false,
  listDocumentTypes: [],
  loadingRelatedDocuments: false,
  tableHandlersFilters: null,
  isThirdPartyConnectionException: false,
  openedDisputedRequest: false
}


export default typeToReducer(
  {
    [loadData]: (state, action) => {
      return {
        ...state,
        isFetching: false,
        dataType: action.payload.endpointType,
        statusFilter: action.payload.filter.status,
        activeStatus: action.payload.filter.status,
        filterData: action.payload.filter
      }
    },
    [confirmOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: 1
      }
    },
    [confirmOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [confirmOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [confirmReturned.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [confirmReturned.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [confirmReturned.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [rejectOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: 2
      }
    },
    [rejectOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [rejectOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [shipOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [shipOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [shipOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [returnShipOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [returnShipOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [returnShipOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [downloadPdf.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [downloadPdf.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [downloadPdf.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [searchCompany.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [searchCompany.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [searchCompany.fulfilled]: (state, action) => {
      return {
        ...state,
        searchedCompanies: action.payload.data
      }
    },
    [openAssignLots]: (state, action) => {
      return {
        ...state,
        openedAssignLots: true
      }
    },
    [closeAssignLots]: (state, action) => {
      return {
        ...state,
        openedAssignLots: false
      }
    },
    [assignLots.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [assignLots.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [assignLots.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          orderItems: state.detail.orderItems.map(orderItem => {
            let foundOrderItem = action.payload.find(oi => oi.id === orderItem.id)
            if (foundOrderItem) {
              return {
                ...foundOrderItem
              }
            }
            return {
              ...orderItem
            }
          })
        }
      }
    },
    [loadLotsToAssign.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [loadLotsToAssign.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [loadLotsToAssign.fulfilled]: (state, action) => {
      // prepare lots for used product offers
      let poLots = state.detail.lots ? state.detail.lots : []
      poLots.push({
        id: action.payload.data.id,
        lots: action.payload.data.lots.map(lot => {
          return {
            id: lot.id,
            lotNumber: lot.lotNumber,
            total: lot.originalPkgAmount,
            available: lot.pkgAmount,
            allocated: 0,
            mfgDate: lot.manufacturedDate,
            expirationDate: lot.expirationDate,
            attachments: lot.attachments.map(att => {
              return {
                ...att,
                linked: true
              }
            }),
            selected: false
          }
        })
      })

      const statePoLots = getSafe(() => state.detail.poLots, [])

      return {
        ...state,
        detail: {
          ...state.detail,
          poLots: statePoLots.concat(poLots)
        }
      }
    },
    [linkAttachment.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [linkAttachment.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [linkAttachment.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [removeAttachmentLink.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [removeAttachmentLink.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [removeAttachmentLink.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [removeAttachment.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [removeAttachment.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [removeAttachment.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [cancelPayment.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [cancelPayment.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [cancelPayment.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentStatus: 4
        }
      }
    },
    [openReinitiateTransfer]: (state, action) => {
      return {
        ...state,
        openedReinitiateTransfer: true
      }
    },
    [closeReinitiateTransfer]: (state, action) => {
      return {
        ...state,
        openedReinitiateTransfer: false
      }
    },
    [loadDwollaBankAccounts.pending]: (state, action) => {
      return {
        ...state,
        bankAccountsLoading: true
      }
    },
    [loadDwollaBankAccounts.rejected]: (state, action) => {
      return {
        ...state,
        bankAccountsLoading: false,
        isThirdPartyConnectionException:
          getSafe(() => action.payload.response.data.exceptionMessage, '') === 'THIRD_PARTY_CONNECTION_EXCEPTION'
      }
    },
    [loadDwollaBankAccounts.fulfilled]: (state, action) => {
      return {
        ...state,
        bankAccounts: action.payload.data.map(bankAccount => {
          return {
            id: bankAccount.id,
            text: bankAccount.name,
            value: bankAccount.id
          }
        }),
        bankAccountsLoading: false
      }
    },
    [loadVellociBankAccounts.pending]: (state, action) => {
      return {
        ...state,
        bankAccountsLoading: true
      }
    },
    [loadVellociBankAccounts.rejected]: (state, action) => {
      return {
        ...state,
        bankAccountsLoading: false,
        isThirdPartyConnectionException:
          getSafe(() => action.payload.response.data.exceptionMessage, '') === 'THIRD_PARTY_CONNECTION_EXCEPTION'
      }
    },
    [loadVellociBankAccounts.fulfilled]: (state, action) => {
      return {
        ...state,
        bankAccounts: action.payload.data.map(bankAccount => {
          return {
            id: bankAccount.id,
            text: bankAccount.display_name,
            value: bankAccount.account_public_id
          }
        }),
        bankAccountsLoading: false
      }
    },
    [payOrder.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [payOrder.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [payOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          ...action.payload.data
        }
      }
    },
    [cancelOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [cancelOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [cancelOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [clearRelatedOrders]: (state, action) => {
      return {
        ...state,
        relatedOrders: []
      }
    },
    [getRelatedOrders.pending]: (state, action) => {
      return {
        ...state,
        loadRelatedOrders: true
      }
    },
    [getRelatedOrders.rejected]: (state, action) => {
      return {
        ...state,
        loadRelatedOrders: false
      }
    },
    [getRelatedOrders.fulfilled]: (state, action) => {
      return {
        ...state,
        loadRelatedOrders: false,
        relatedOrders: action.payload.data
      }
    },
    [approveOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: 1
      }
    },
    [approveOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [approveOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [discardOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: 2
      }
    },
    [discardOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [discardOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [openPopupName]: (state, action) => {
      return {
        ...state,
        [action.payload]: true
      }
    },
    [closePopup]: (state, action) => {
      return {
        ...state,
        openedEnterTrackingIdShip: false,
        openedEnterTrackingIdReturnShip: false,
        openedPurchaseRejectDelivery: false,
        openedPurchaseRequestCreditDelivery: false,
        openedPurchaseReviewCreditRequest: false,
        openedSaleReviewCreditRequest: false,
        openedSaleReturnShipping: false,
        openedPurchaseOrderShipping: false,
        opendSaleAttachingProductOffer: false,
        openedDisputedRequest: false
      }
    },
    [receivedOrder.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [receivedOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [receivedOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [acceptDelivery.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [acceptDelivery.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [acceptDelivery.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [getReturnShipmentRates.pending]: (state, action) => {
      return {
        ...state,
        returnShipmentRates: {},
        isSending: true
      }
    },
    [getReturnShipmentRates.rejected]: (state, action) => {
      return {
        ...state,
        returnShipmentRates: {},
        isSending: false
      }
    },
    [getReturnShipmentRates.fulfilled]: (state, action) => {
      return {
        ...state,
        returnShipmentRates: action.payload.data,
        isSending: false
      }
    },
    [returnShipmentOrder.pending]: (state, action) => {
      return {
        ...state,
        returnShipmentOrderResult: {}
      }
    },
    [returnShipmentOrder.rejected]: (state, action) => {
      return {
        ...state,
        returnShipmentOrderResult: {}
      }
    },
    [returnShipmentOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        returnShipmentOrderResult: action.payload.data,
        isSending: false
      }
    },
    [rejectPurchaseOrder.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [rejectPurchaseOrder.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [rejectPurchaseOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [creditCounterAccept.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [creditCounterAccept.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [creditCounterAccept.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [creditCounter.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [creditCounter.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [creditCounter.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [creditCounterReject.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [creditCounterReject.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [creditCounterReject.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [creditRequest.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [creditRequest.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [creditRequest.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [getShippingQuotes.pending]: (state, action) => {
      return {
        ...state,
        shippingQuotesAreFetching: true
      }
    },
    [getShippingQuotes.rejected]: (state, action) => {
      return {
        ...state,
        shippingQuotesAreFetching: false,
        shippingQuotes: {}
      }
    },
    [getShippingQuotes.fulfilled]: (state, action) => {
      return {
        ...state,
        shippingQuotes: action.payload.data,
        shippingQuotesAreFetching: false
      }
    },
    [getManualShippingQuote.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [getManualShippingQuote.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getManualShippingQuote.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [purchaseShipmentOrder.pending]: (state, action) => {
      return {
        ...state,
        shipmentOrderResult: {}
      }
    },
    [purchaseShipmentOrder.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [purchaseShipmentOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        shipmentOrderResult: action.payload.data,
        isSending: false
      }
    },
    [downloadCreditRequestAttachments.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [downloadCreditRequestAttachments.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [downloadCreditRequestAttachments.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [creditAccept.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [creditAccept.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [creditAccept.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    },
    [getPurchaseOrder.pending]: (state, action) => {
      return {
        ...state,
        isDetailFetching: true
      }
    },
    [getPurchaseOrder.rejected]: (state, action) => {
      action.payload === 'sale' ? Router.push('/orders/sales') : Router.push('/orders/purchase')
      return {
        ...state,
        isDetailFetching: false
      }
    },
    [getPurchaseOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        isDetailFetching: false,
        detail: action.payload.data
      }
    },
    [getSaleOrder.pending]: (state, action) => {
      return {
        ...state,
        isDetailFetching: true
      }
    },
    [getSaleOrder.rejected]: (state, action) => {
      action.payload === 'sale' ? Router.push('/orders/sales') : Router.push('/orders/purchase')
      return {
        ...state,
        isDetailFetching: false
      }
    },
    [getSaleOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        isDetailFetching: false,
        detail: action.payload.data
      }
    },
    [applyDatagridFilter]: (state, action) => {
      return {
        ...state,
        datagridFilter: action.payload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    },
    [getGroupedProductOffers.pending]: (state, action) => {
      return {
        ...state,
        loadingProductOffer: true
      }
    },
    [getGroupedProductOffers.rejected]: (state, action) => {
      return {
        ...state,
        loadingProductOffer: false
      }
    },
    [getGroupedProductOffers.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingGroupedProductOffer: false,
        groupedProductOffers: action.payload
      }
    },
    [patchAssignProductOffers.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [patchAssignProductOffers.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [patchAssignProductOffers.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data
      }
    },
    [deleteAssignProductOffers.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [deleteAssignProductOffers.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [deleteAssignProductOffers.fulfilled]: (state, action) => {
      return {
        ...state
      }
    },
    [clearGroupedProductOffer]: (state, action) => {
      return {
        ...state,
        loadingGroupedProductOffer: false,
        groupedProductOffers: []
      }
    },
    [linkAttachmentToOrderItem.pending]: (state, action) => {
      return {
        ...state,
        loadingProductOffer: true,
        loadingRelatedDocuments: true
      }
    },
    [linkAttachmentToOrderItem.rejected]: (state, action) => {
      return {
        ...state,
        loadingProductOffer: false,
        loadingRelatedDocuments: false
      }
    },
    [linkAttachmentToOrderItem.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingGroupedProductOffer: false,
        loadingRelatedDocuments: false
      }
    },
    [removeLinkAttachmentToOrderItem.pending]: (state, action) => {
      return {
        ...state,
        loadingProductOffer: true,
        loadingRelatedDocuments: true
      }
    },
    [removeLinkAttachmentToOrderItem.rejected]: (state, action) => {
      return {
        ...state,
        loadingProductOffer: false,
        loadingRelatedDocuments: false
      }
    },
    [removeLinkAttachmentToOrderItem.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingGroupedProductOffer: false,
        loadingRelatedDocuments: false
      }
    },
    [getDocumentTypes.pending]: (state, action) => {
      return {
        ...state,
        documentTypesFetching: true
      }
    },
    [getDocumentTypes.rejected]: (state, action) => {
      return {
        ...state,
        documentTypesFetching: false
      }
    },
    [getDocumentTypes.fulfilled]: (state, action) => {
      return {
        ...state,
        documentTypesFetching: false,
        listDocumentTypes: action.payload.data.map(docType => {
          return {
            key: docType.id,
            text: docType.name,
            value: docType.id
          }
        })
      }
    },
    [unlinkAttachmentToOrder.pending]: (state, action) => {
      return {
        ...state,
        loadingRelatedDocuments: true
      }
    },
    [unlinkAttachmentToOrder.rejected]: (state, action) => {
      return {
        ...state,
        loadingRelatedDocuments: false
      }
    },
    [unlinkAttachmentToOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingRelatedDocuments: false
      }
    },
    [linkAttachmentToOrder.pending]: (state, action) => {
      return {
        ...state,
        loadingRelatedDocuments: true
      }
    },
    [linkAttachmentToOrder.rejected]: (state, action) => {
      return {
        ...state,
        loadingRelatedDocuments: false
      }
    },
    [linkAttachmentToOrder.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingRelatedDocuments: false
      }
    },
    [clearOrderDetail]: (state, action) => {
      return {
        ...state,
        detail: {}
      }
    },
    [editTrackingCode.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [editTrackingCode.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [editTrackingCode.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data
      }
    },
    [editReturnTrackingCode.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [editReturnTrackingCode.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [editReturnTrackingCode.fulfilled]: (state, action) => {
      return {
        ...state,
        detail: action.payload.data
      }
    },
    [saveFilters]: (state, action) => {
      return {
        ...state,
        tableHandlersFilters: action.payload
      }
    },
    [orderResolutionReopen.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [orderResolutionReopen.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [orderResolutionReopen.fulfilled]: (state, action) => {
      return {
        ...state,
        isSending: false,
        detail: action.payload
      }
    },
    [orderResolutionAccept.pending]: (state, action) => {
      return {
        ...state,
        isSending: true
      }
    },
    [orderResolutionAccept.rejected]: (state, action) => {
      return {
        ...state,
        isSending: false
      }
    },
    [orderResolutionAccept.fulfilled]: (state, action) => {
      return {
        ...state,
        isSending: false,
        detail: action.payload
      }
    },
    [downloadDisputeAttachment.pending]: (state, action) => {
      return {
        ...state
      }
    },
    [downloadDisputeAttachment.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [downloadDisputeAttachment.fulfilled]: (state, action) => {
      return {
        ...state
      }
    }
  },
  initialState
)
