import * as AT from './action-types'
import { INVENTORY_LINK_ATTACHMENT } from '~/modules/inventory/action-types'
import { uniqueArrayByKey, getSafe } from '~/utils/functions'

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
  returnShipmentRates: [],
  shipmentOrderResult: {},
  returnShipmentOrderResult: {},
  loadRelatedOrders: false,
  shippingQuotesAreFetching: false,
  shippingQuotes: [],
  datagridFilter: { filters: [] },
  datagridFilterUpdate: false,
  opendSaleAttachingProductOffer: false,
  groupedProductOffers: [],
  loadingGroupedProductOffers: false,
  order: [],
  documentTypesFetching: false,
  listDocumentTypes: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    /*
        case AT.ORDERS_FETCH_REQUESTED:
            return {
                ...state,
                isFetching: true
            }
        */
    case AT.ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        //data: action.payload.data,
        dataType: action.payload.endpointType,
        statusFilter: action.payload.filter.status,
        activeStatus: action.payload.filter.status,
        filterData: action.payload.filter
      }
    /*
        case AT.ORDERS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false
            }
            */
    case AT.ORDER_GET_SALE_ORDER_FULFILLED:
    case AT.ORDER_GET_PURCHASE_ORDER_FULFILLED:
      return {
        ...state,
        isDetailFetching: false,
        detail: action.payload.data
      }
    case AT.ORDER_GET_SALE_ORDER_PENDING:
    case AT.ORDER_GET_PURCHASE_ORDER_PENDING:
    case AT.ORDERS_DETAIL_FETCH_REQUESTED:
      return {
        ...state,
        isDetailFetching: true
      }
    case AT.ORDERS_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isDetailFetching: false,
        detail: action.payload.data,
        detailType: action.payload.detailType === 'sale' ? 'sales' : action.payload.detailType
      }
    case AT.ORDER_GET_SALE_ORDER_REJECTED:
    case AT.ORDER_GET_PURCHASE_ORDER_REJECTED:
    case AT.ORDERS_DETAIL_FETCH_FAILURE:
      return {
        ...state,
        isDetailFetching: false
      }
    case AT.ORDER_CONFIRM_FETCH_PENDING:
    case AT.ORDER_APPROVE_ORDER_PENDING:
      return {
        ...state,
        isSending: 1
      }
    case AT.ORDER_DISCARD_ORDER_PENDING:
    case AT.ORDER_REJECT_FETCH_PENDING:
      return {
        ...state,
        isSending: 2
      }
    case AT.ORDER_ACCEPT_DELIVERY_ORDER_PENDING:
    case AT.ORDER_RECEIVED_ORDER_PENDING:
    case AT.ORDER_CONFIRM_RETURNED_FETCH_PENDING:
    case AT.ORDER_CANCEL_ORDER_PENDING:
    case AT.ACCEPT_CREDIT_PENDING:
    case AT.CREDIT_COUNTER_REJECT_PENDING:
    case AT.CREDIT_ACCEPT_PENDING:
    case AT.ORDER_RETURN_SHIP_FETCH_PENDING:
    case AT.ORDER_SHIP_FETCH_PENDING:
      return {
        ...state,
        isSending: true
      }
    case AT.ORDER_DISCARD_ORDER_REJECTED:
    case AT.ORDER_APPROVE_ORDER_REJECTED:
    case AT.ORDER_ACCEPT_DELIVERY_ORDER_REJECTED:
    case AT.ORDER_RECEIVED_ORDER_REJECTED:
    case AT.ORDER_CONFIRM_RETURNED_FETCH_REJECTED:
    case AT.ORDER_CANCEL_ORDER_REJECTED:
    case AT.ACCEPT_CREDIT_REJECTED:
    case AT.CREDIT_COUNTER_REJECT_REJECTED:
    case AT.CREDIT_ACCEPT_REJECTED:
    case AT.ORDER_CONFIRM_FETCH_REJECTED:
    case AT.ORDER_REJECT_FETCH_REJECTED:
    case AT.ORDER_PURCHASE_SHIPMENT_ORDER_REJECTED:
    case AT.ORDER_RETURN_SHIP_FETCH_REJECTED:
    case AT.ORDER_SHIP_FETCH_REJECTED:
      return {
        ...state,
        isSending: false
      }
    case AT.ORDER_DOWNLOAD_PDF_FULFILLED:
      return {
        ...state
      }
    case AT.ORDERS_SEARCH_COMPANY_FULFILLED:
      return {
        ...state,
        searchedCompanies: action.payload.data
      }
    case AT.ORDER_OPEN_ASSIGN_LOTS:
      return {
        ...state,
        openedAssignLots: true
      }
    case AT.ORDER_CLOSE_ASSIGN_LOTS:
      return {
        ...state,
        openedAssignLots: false
      }
    case AT.ORDER_OPEN_REINITIATE_TRANSFER:
      return {
        ...state,
        openedReinitiateTransfer: true
      }
    case AT.ORDER_CLOSE_REINITIATE_TRANSFER:
      return {
        ...state,
        openedReinitiateTransfer: false
      }
    case AT.ORDER_OPEN_POPUP_NAME:
      return {
        ...state,
        [action.payload]: true
      }
    case AT.ORDER_CLOSE_POPUP:
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
        opendSaleAttachingProductOffer: false
      }
    case AT.ORDER_LOAD_BANK_ACCOUNTS_PENDING:
      return {
        ...state,
        bankAccountsLoading: true
      }
    case AT.ORDER_LOAD_BANK_ACCOUNTS_FULFILLED:
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
    case AT.ORDER_LOAD_BANK_ACCOUNTS_REJECTED:
      return {
        ...state,
        bankAccountsLoading: false
      }
    case AT.ORDER_GET_LOTS_FULFILLED:
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
    case AT.ORDER_ASSIGN_LOTS_FULFILLED:
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
    case AT.ORDER_PAY_ORDER_FULFILLED:
      return {
        ...state,
        detail: {
          ...state.detail,
          ...action.payload.data
        }
      }
    case AT.ORDER_CANCEL_PAYMENT_FULFILLED:
      return {
        ...state,
        detail: {
          ...state.detail,
          paymentStatus: 4
        }
      }
    case AT.CLEAR_RELATED_ORDERS:
      return {
        ...state,
        relatedOrders: []
      }
    case AT.RELATED_ORDERS_PENDING:
      return {
        ...state,
        loadRelatedOrders: true
      }
    case AT.RELATED_ORDERS_FULFILLED:
      return {
        ...state,
        loadRelatedOrders: false,
        relatedOrders: action.payload.data
      }
    case AT.CREDIT_ACCEPT_FULFILLED:
    case AT.ORDER_RETURN_SHIP_FETCH_FULFILLED:
    case AT.ORDER_SHIP_FETCH_FULFILLED:
    case AT.ORDER_CONFIRM_FETCH_FULFILLED:
    case AT.ORDER_REJECT_FETCH_FULFILLED:
    case AT.ORDER_CANCEL_ORDER_FULFILLED:
    case AT.ORDER_APPROVE_ORDER_FULFILLED:
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    case AT.RETURN_SHIPMENT_RATES_FULFILLED:
      return {
        ...state,
        returnShipmentRates: action.payload.data,
        isSending: false
      }
    case AT.RETURN_SHIPMENT_RATES_PENDING:
      return {
        ...state,
        returnShipmentRates: [],
        isSending: true
      }
    case AT.RETURN_SHIPMENT_RATES_REJECTED:
      return {
        ...state,
        returnShipmentRates: [],
        isSending: false
      }
    case AT.ORDER_PURCHASE_SHIPMENT_ORDER_PENDING:
      return {
        ...state,
        shipmentOrderResult: {}
      }
    case AT.ORDER_PURCHASE_SHIPMENT_ORDER_FULFILLED:
      return {
        ...state,
        shipmentOrderResult: action.payload.data,
        isSending: false
      }
    case AT.RETURN_SHIPMENT_ORDER_PENDING:
      return {
        ...state,
        returnShipmentOrderResult: {}
      }
    case AT.RETURN_SHIPMENT_ORDER_FULFILLED:
      return {
        ...state,
        returnShipmentOrderResult: action.payload.data,
        isSending: false
      }
    case AT.ORDER_CONFIRM_RETURNED_FETCH_FULFILLED:
    case AT.ORDER_ACCEPT_DELIVERY_ORDER_FULFILLED:
    case AT.ORDER_RECEIVED_ORDER_FULFILLED:
    case AT.ORDER_DISCARD_ORDER:
    case AT.REJECT_PURCHASE_ORDER_FULFILLED:
    case AT.ACCEPT_CREDIT_FULFILLED:
    case AT.CREDIT_COUNTER_FULFILLED:
    case AT.CREDIT_COUNTER_REJECT_FULFILLED:
    case AT.CREDIT_REQUEST_UPDATE_FULFILLED:
      return {
        ...state,
        detail: action.payload.data,
        isSending: false
      }
    case AT.ORDER_SHIPPING_QUOTES_FETCH_PENDING: {
      return {
        ...state,
        shippingQuotesAreFetching: true
      }
    }
    case AT.ORDER_SHIPPING_QUOTES_FETCH_FULFILLED: {
      return {
        ...state,
        shippingQuotes: action.payload.data,
        shippingQuotesAreFetching: false
      }
    }
    case AT.ORDER_SHIPPING_QUOTES_FETCH_REJECTED: {
      return {
        ...state,
        shippingQuotesAreFetching: false,
        shippingQuotes: []
      }
    }

    case AT.ORDER_APPLY_FILTER: {
      return {
        ...state,
        datagridFilter: payload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    }

    case AT.DELETE_ASSIGN_PRODUCT_OFFERS_PENDING: {
      return {
        ...state
      }
    }
    case AT.DELETE_ASSIGN_PRODUCT_OFFERS_FULFILLED: {
      return {
        ...state
      }
    }
    case AT.DELETE_ASSIGN_PRODUCT_OFFERS_REJECTED: {
      return {
        ...state
      }
    }

    case AT.PATCH_ASSIGN_PRODUCT_OFFERS_PENDING: {
      return {
        ...state
      }
    }
    case AT.PATCH_ASSIGN_PRODUCT_OFFERS_FULFILLED: {
      return {
        ...state,
        order: action.payload.data
      }
    }
    case AT.PATCH_ASSIGN_PRODUCT_OFFERS_REJECTED: {
      return {
        ...state
      }
    }

    case AT.GET_GROUPED_PRODUCT_OFFERS_PENDING: {
      return {
        ...state,
        loadingProductOffer: true
      }
    }
    case AT.GET_GROUPED_PRODUCT_OFFERS_FULFILLED: {
      return {
        ...state,
        loadingGroupedProductOffer: false,
        groupedProductOffers: [action.payload.data].concat(state.groupedProductOffers)
      }
    }
    case AT.GET_GROUPED_PRODUCT_OFFERS_REJECTED: {
      return {
        ...state,
        loadingProductOffer: false
      }
    }
    case AT.CLEAR_GROUPED_PRODUCT_OFFERS: {
      return {
        ...state,
        loadingGroupedProductOffer: false,
        groupedProductOffers: []
      }
    }

    case AT.LINK_ATTACHMENT_TO_ORDER_ITEM_PENDING: {
      return {
        ...state,
        loadingProductOffer: true
      }
    }
    case AT.LINK_ATTACHMENT_TO_ORDER_ITEM_FULFILLED: {
      return {
        ...state,
        loadingGroupedProductOffer: false
      }
    }
    case AT.LINK_ATTACHMENT_TO_ORDER_ITEM_REJECTED: {
      return {
        ...state,
        loadingProductOffer: false
      }
    }

    case AT.REMOVE_LINK_ATTACHMENT_TO_ORDER_ITEM_PENDING: {
      return {
        ...state,
        loadingProductOffer: true
      }
    }
    case AT.REMOVE_LINK_ATTACHMENT_TO_ORDER_ITEM_FULFILLED: {
      return {
        ...state,
        loadingGroupedProductOffer: false
      }
    }
    case AT.REMOVE_LINK_ATTACHMENT_TO_ORDER_ITEM_REJECTED: {
      return {
        ...state,
        loadingProductOffer: false
      }
    }

    case AT.RELATED_GET_DOCUMENT_TYPES_PENDING: {
      return {
        ...state,
        documentTypesFetching: true
      }
    }

    case AT.RELATED_GET_DOCUMENT_TYPES_FULFILLED: {
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
    }

    case AT.RELATED_GET_DOCUMENT_TYPES_REJECTED: {
      return {
        ...state,
        documentTypesFetching: false
      }
    }

    default:
      return state
  }
}
