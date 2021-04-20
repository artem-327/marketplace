import * as AT from './action-types'
import { NETWORK_STATUS } from './constants'

export const initialState = {
  loading: false,
  updating: false,
  networkStatus: NETWORK_STATUS.ALL,
  all: 0,
  connected: 0,
  pending: 0,
  requested: 0,
  declined: 0,
  disconnected: 0,
  isOpenModal: false,
  companyNetworkConnection: null,
  isError: false,
  loadingDetailRow: false,
  detailRow: null,
  bluePalletModal: false
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
        connected: payload.connected || 0,
        pending: payload.pending || 0,
        requested: payload.requested || 0,
        declined: payload.declined || 0,
        disconnected: payload.disconnected || 0
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

    case AT.BLUE_PALLET_SHOW: {
      return {
        ...state,
        bluePalletModal: true
      }
    }

    case AT.BLUE_PALLET_HIDE: {
      return {
        ...state,
        bluePalletModal: false
      }
    }

    case AT.DISCONNECT_PENDING:
    case AT.REJECT_PENDING:
    case AT.ACCEPT_PENDING:
    case AT.REMOVE_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.REJECT_FULFILLED:
    case AT.REJECT_REJECTED:
    case AT.ACCEPT_FULFILLED:
    case AT.ACCEPT_REJECTED:
    case AT.DISCONNECT_FULFILLED:
    case AT.DISCONNECT_REJECTED:
    case AT.REMOVE_FULFILLED:
    case AT.REMOVE_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.INVITE_PENDING: {
      return {
        ...state,
        updating: true
      }
    }

    case AT.INVITE_FULFILLED:
    case AT.INVITE_REJECTED: {
      return {
        ...state,
        updating: false
      }
    }

    default:
      return state
  }
}
