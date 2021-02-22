import * as AT from './action-types'

export const initialState = {
  topMenuTab: null,
  markSeenSending: false,
  loadingCategories: false,
  categories: [],
  tableHandlersFilters: null,
  countUnseen: 0
}

export default function reducers(state = initialState, action) {
  const { payload } = action
  switch (action.type) {

    case AT.ALERTS_TAB_CHANGED: {
      return {
        ...state,
        topMenuTab: action.payload,
      }
    }

    case AT.ALERTS_MARK_SEEN_ARRAY_PENDING:
    case AT.ALERTS_MARK_UNSEEN_ARRAY_PENDING:
    case AT.ALERTS_DELETE_ARRAY_PENDING: {
      return { ...state, markSeenSending: true }
    }

    case AT.ALERTS_MARK_SEEN_ARRAY_REJECTED:
    case AT.ALERTS_MARK_SEEN_ARRAY_FULFILLED:
    case AT.ALERTS_MARK_UNSEEN_ARRAY_REJECTED:
    case AT.ALERTS_MARK_UNSEEN_ARRAY_FULFILLED:
    case AT.ALERTS_DELETE_ARRAY_REJECTED:
    case AT.ALERTS_DELETE_ARRAY_FULFILLED: {
      return { ...state, markSeenSending: false }
    }

    /*
    case AT.ALERTS_MARK_SEEN_PENDING:
    case AT.ALERTS_MARK_UNSEEN_PENDING: {
      return { ...state, markSeenSending: true }
    }
    */

    case AT.ALERTS_MARK_SEEN_FULFILLED:
    case AT.ALERTS_MARK_SEEN_REJECTED:
    case AT.ALERTS_MARK_UNSEEN_FULFILLED:
    case AT.ALERTS_MARK_UNSEEN_REJECTED: {
      return { ...state, markSeenSending: false }
    }

    case AT.ALERTS_GET_CATEGORIES_PENDING: {
      return { ...state, loadingCategories: true }
    }

    case AT.ALERTS_GET_CATEGORIES_REJECTED: {
      return { ...state, loadingCategories: false }
    }

    case AT.ALERTS_GET_CATEGORIES_FULFILLED: {
      return {
        ...state,
        loadingCategories: false,
        categories: payload
      }
    }

    case AT.ALERTS_GET_COUNT_UNSEEN_FULFILLED: {
      return {
        ...state,
        countUnseen: payload
      }
    }

    case AT.ALERTS_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    case AT.ALERTS_SET_TYPE: {
      return {
        ...state,
        type: payload
      }
    }

    default: {
      return state
    }
  }
}