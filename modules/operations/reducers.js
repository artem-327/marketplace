import * as AT from './action-types'
import { defaultTabs } from './constants'

export const initialState = {
  popupValues: null,
  isOpenPopup: false,
  tabsNames: defaultTabs,
  currentTab: defaultTabs[0],
  filterValue: '',
  loading: false,
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  companyProductUnmappedOnly: false
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
        currentTab: payload,
        filterValue: state.currentTab !== payload ? '' : state.filterValue
      }
    }

    case AT.OPERATIONS_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload
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
        currentTab: action.payload.tab,
        popupValues: null,
        isOpenPopup: false,
        filterValue: '',
        loading: false
      }
    }

    case AT.OPERATIONS_SEARCH_COMPANY_PENDING: {return { ...state, searchedCompaniesLoading: true }}
    case AT.OPERATIONS_SEARCH_COMPANY_REJECTED: {return { ...state, searchedCompaniesLoading: false }}
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

    default: {
      return state
    }
  }
}
