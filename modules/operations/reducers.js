import * as AT from './action-types'
import { defaultTabs } from './constants'

export const initialState = {
  popupValues: null,
  isOpenPopup: false,
  tabsNames: defaultTabs,
  currentTab: defaultTabs[0],
  loading: false,
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  companyProductUnmappedOnly: false,
  ordersStatusFilter: 'All',
  orderDetailData: null,
  documentTypesFetching: false,
  listDocumentTypes: [],
  orderProcessing: false
}

export default function reducers(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.OPERATIONS_OPEN_POPUP: {
      return {
        ...state,
        isOpenPopup: true,
        popupValues: action.payload
      }
    }

    case AT.OPERATIONS_CLOSE_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null
      }
    }

    case AT.OPERATIONS_TAB_CHANGED: {
      return {
        ...state,
        currentTab: payload
      }
    }

    case AT.OPERATIONS_HANDLE_FILTERS_VALUE: {
      return {
        ...state
      }
    }

    case AT.OPERATIONS_UPDATE_SHIPPING_QUOTE_PENDING:
    case AT.OPERATIONS_CREATE_SHIPPING_QUOTE_PENDING:
    case AT.OPERATIONS_DELETE_SHIPPING_QUOTE_PENDING:
    case AT.OPERATIONS_CREATE_TAG_PENDING:
    case AT.OPERATIONS_UPDATE_TAG_PENDING:
    case AT.OPERATIONS_DELETE_TAG_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.OPERATIONS_UPDATE_SHIPPING_QUOTE_FULFILLED:
    case AT.OPERATIONS_UPDATE_SHIPPING_QUOTE_REJECTED:
    case AT.OPERATIONS_DELETE_SHIPPING_QUOTE_FULFILLED:
    case AT.OPERATIONS_DELETE_SHIPPING_QUOTE_REJECTED:
    case AT.OPERATIONS_CREATE_SHIPPING_QUOTE_FULFILLED:
    case AT.OPERATIONS_CREATE_SHIPPING_QUOTE_REJECTED:
    case AT.OPERATIONS_CREATE_TAG_FULFILLED:
    case AT.OPERATIONS_UPDATE_TAG_FULFILLED:
    case AT.OPERATIONS_DELETE_TAG_FULFILLED:
    case AT.OPERATIONS_CREATE_TAG_REJECTED:
    case AT.OPERATIONS_UPDATE_TAG_REJECTED:
    case AT.OPERATIONS_DELETE_TAG_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.OPERATIONS_HANDLE_ACTIVE_TAB: {
      return {
        ...state,
        currentTab: payload.tab,
        popupValues: null,
        isOpenPopup: false,
        loading: false,
        orderDetailData: null
      }
    }

    case AT.OPERATIONS_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.OPERATIONS_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.OPERATIONS_SEARCH_COMPANY_FULFILLED: {
      return {
        ...state,
        searchedCompanies: action.payload,
        searchedCompaniesLoading: false
      }
    }

    case AT.OPERATIONS_SET_PRODUCT_MAPPED_UNMAPPED: {
      return {
        ...state,
        companyProductUnmappedOnly: payload
      }
    }

    case AT.OPERATIONS_ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        ordersStatusFilter: action.payload.filter.status,
      }

    case AT.OPERATIONS_OPEN_ORDER_DETAIL: {
      return {
        ...state,
        orderDetailData: payload
      }
    }

    case AT.OPERATIONS_GET_DOCUMENT_TYPES_PENDING: {
      return {
        ...state,
        documentTypesFetching: true
      }
    }

    case AT.OPERATIONS_GET_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        documentTypesFetching: false,
        listDocumentTypes: payload.data.map(docType => {
          return {
            key: docType.id,
            text: docType.name,
            value: docType.id
          }
        })
      }
    }

    case AT.OPERATIONS_GET_DOCUMENT_TYPES_REJECTED: {
      return {
        ...state,
        documentTypesFetching: false
      }
    }

    case AT.OPERATIONS_ORDERS_CANCEL_ORDER_PENDING: {
      return { ...state, orderProcessing: true }
    }
    case AT.OPERATIONS_ORDERS_CANCEL_ORDER_REJECTED:
    case AT.OPERATIONS_ORDERS_CANCEL_ORDER_FULFILLED: {
      return { ...state, orderProcessing: false }
    }

    default: {
      return state
    }
  }
}
