import * as AT from './action-types'
//import { defaultTabs } from './constants'

export const initialState = {
  menuStatusFilter: '',
  markSeenSending: false,
  loadingCategories: false,
  categories: [],
}

export default function reducers(state = initialState, action) {
  const { payload } = action
  switch (action.type) {

    case AT.ALERTS_TAB_CHANGED:
      return {
        ...state,
        menuStatusFilter: action.payload.filter.status,
      }

    case AT.ALERTS_MARK_SEEN_PENDING: {
      return { ...state, markSeenSending: true }
    }
    case AT.ALERTS_MARK_SEEN_FULFILLED:
    case AT.ALERTS_MARK_SEEN_REJECTED: {
      return { ...state, markSeenSending: false }
    }

    case AT.ALERTS_MARK_UNSEEN_PENDING: {
      return { ...state, markSeenSending: true }
    }
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

    default: {
      return state
    }
  }
}