import * as AT from './action-types'
import { defaultTabs } from './constants'

export const initialState = {
  popupValues: null,
  isOpenPopup: false,
  tabsNames: defaultTabs,
  currentTab: defaultTabs[0],
  filterValue: '',
  loading: false,
}

export default function reducers(state = initialState, action) {
  const {payload} = action

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
    case AT.OPERATIONS_DELETE_SHIPPING_QUOTE_PENDING: {
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
    case AT.OPERATIONS_CREATE_SHIPPING_QUOTE_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}