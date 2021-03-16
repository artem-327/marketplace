import * as AT from './action-types'
import { NETWORK_STATUS } from './constants'

export const initialState = {
  loading: false,
  networkStatus: NETWORK_STATUS.ALL,
  all: 0,
  active: 0,
  pending: 0,
  requested: 0,
  isOpenModal: false,
  companyNetworkConnection: null,
  isError: false,
  loadingDetailRow: false,
  detailRow: null
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.FILTER_NETWORK_STATUS: {
      return {
        ...state,
        networkStatus: payload
      }
    }

    case AT.CONNECTIONS_STATUSES: {
      return {
        ...state,
        all: payload?.all,
        active: payload?.active,
        pending: payload?.pending,
        requested: payload?.requested
      }
    }

    case AT.TRIGGER_MODAL: {
      return {
        ...state,
        isError: state.isOpenModal ? false : state.isError,
        loading: state.isOpenModal ? false : state.loading,
        companyNetworkConnection: state.isOpenModal ? null : state.companyNetworkConnection,
        isOpenModal: !state.isOpenModal
      }
    }

    case AT.SEARCH_PENDING: {
      return {
        ...state,
        loading: true,
        isError: false
      }
    }
    case AT.SEARCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        companyNetworkConnection: { connectedCompany: payload }, //connectedCompany is a attribute helper for better map all values via method getRowDetail
        isError: false
      }
    }
    case AT.SEARCH_REJECTED: {
      return {
        ...state,
        loading: false,
        isError: true
      }
    }

    case AT.GET_CONNECTION_PENDING: {
      return {
        ...state,
        loadingDetailRow: true
      }
    }
    case AT.GET_CONNECTION_FULFILLED: {
      return {
        ...state,
        loadingDetailRow: false,
        detailRow: payload
      }
    }

    case AT.GET_CONNECTION_REJECTED: {
      return {
        ...state,
        loadingDetailRow: false
      }
    }

    default:
      return state
  }
}
