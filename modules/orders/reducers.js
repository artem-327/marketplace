import * as AT from './action-types'
import { INVENTORY_LINK_ATTACHMENT } from '~/modules/inventory/action-types'
import { getSafe } from '~/utils/functions'

const initialState = {
  data: [],
  dataType: null,
  detail: {},
  detailType: null,
  isFetching: false,
  isDetailFetching: false,
  isConfirmFetching: false,
  isRejectFetching: false,
  isSending: false,
  reloadPage: false,
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
  bankAccounts: [],
  bankAccountsLoading: false,
  relatedOrders: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    /*
        case AT.ORDERS_FETCH_REQUESTED:
            return {
                ...state,
                isFetching: true,
                reloadPage: false
            }
        */
    case AT.ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        //data: action.payload.data,
        dataType: action.payload.endpointType,
        reloadPage: false,
        statusFilter: action.payload.filter.status,
        activeStatus: action.payload.filter.status,
        filterData: action.payload.filter
      }
    /*
        case AT.ORDERS_FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                reloadPage: false
            }
            */
    case AT.ORDERS_DETAIL_FETCH_REQUESTED:
      return {
        ...state,
        isDetailFetching: true,
        reloadPage: false
      }
    case AT.ORDERS_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isDetailFetching: false,
        detail: action.payload.data,
        detailType: action.payload.detailType === 'sale' ? 'sales' : action.payload.detailType,
        reloadPage: false
      }
    case AT.ORDERS_DETAIL_FETCH_FAILURE:
      return {
        ...state,
        isDetailFetching: false,
        reloadPage: false
      }
    case AT.ORDER_CONFIRM_FETCH_PENDING:
      return {
        ...state,
        isConfirmFetching: true,
        reloadPage: false
      }
    case AT.ORDER_CONFIRM_FETCH_FULFILLED:
      return {
        ...state,
        isConfirmFetching: false,
        reloadPage: true
      }
    case AT.ORDER_CONFIRM_FETCH_REJECTED:
      return {
        ...state,
        isConfirmFetching: false,
        reloadPage: false
      }
    case AT.ORDER_REJECT_FETCH_PENDING:
      return {
        ...state,
        isRejectFetching: true,
        reloadPage: false
      }
    case AT.ORDER_REJECT_FETCH_FULFILLED:
      return {
        ...state,
        isRejectFetching: false,
        reloadPage: true
      }
    case AT.ORDER_REJECT_FETCH_REJECTED:
      return {
        ...state,
        isRejectFetching: false,
        reloadPage: false
      }

    case AT.ORDER_RETURN_SHIP_FETCH_PENDING:
    case AT.ORDER_SHIP_FETCH_PENDING:
      return {
        ...state,
        reloadPage: false,
        isSending: true
      }
    case AT.ORDER_RETURN_SHIP_FETCH_FULFILLED:
    case AT.ORDER_SHIP_FETCH_FULFILLED:
      return {
        ...state,
        reloadPage: true,
        isSending: false
      }
    case AT.ORDER_RETURN_SHIP_FETCH_REJECTED:
    case AT.ORDER_SHIP_FETCH_FETCH_REJECTED:
      return {
        ...state,
        reloadPage: false,
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
      console.log('!!!!!!!! ORDER_OPEN_POPUP_NAME', action.payload)
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
    case AT.RELATED_ORDERS_FULFILLED:
      return {
        ...state,
        relatedOrders: action.payload.data
      }
    case AT.ORDER_CANCEL_ORDER_FULFILLED:
      return {
        ...state,
        detail: action.payload.data
      }
    case AT.ORDER_APPROVE_ORDER_FULFILLED:
      return {
        ...state,
        detail: action.payload.data
      }
    case AT.ORDER_CONFIRM_RETURNED_FETCH_FULFILLED:
    case AT.ORDER_ACCEPT_DELIVERY_ORDER_FULFILLED:
    case AT.ORDER_RECEIVED_ORDER_FULFILLED:
    case AT.ORDER_DISAPPROVE_ORDER_FULFILLED:
      return {
        ...state,
        detail: action.payload.data
      }
    default:
      return state
  }
}
