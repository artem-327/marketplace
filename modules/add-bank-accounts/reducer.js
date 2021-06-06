import * as AT from './action-types'
//Services
import { getSafe } from '../../utils/functions'

export const initialState = {
  loading: false,
  vellociToken: '',
  vellociBusinessId: ''
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    /* GET_VELLOCI_TOKEN */
    case AT.GET_VELLOCI_TOKEN_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_VELLOCI_TOKEN_FULFILLED: {
      return {
        ...state,
        loading: false,
        vellociToken: payload
      }
    }

    case AT.GET_VELLOCI_TOKEN_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* GET_VELLOCI_BUSINESS_ID */
    case AT.GET_VELLOCI_BUSINESS_ID_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_VELLOCI_BUSINESS_ID_FULFILLED: {
      return {
        ...state,
        loading: false,
        vellociBusinessId: getSafe(() => payload.vellociBusinessId, '')
      }
    }

    case AT.GET_VELLOCI_BUSINESS_ID_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* ADD_VELLOCI_ACOUNT */
    case AT.ADD_VELLOCI_ACOUNT_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADD_VELLOCI_ACOUNT_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ADD_VELLOCI_ACOUNT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    /* ADD_VELLOCI_ACOUNT */
    case AT.ON_EVENT_VELLOCI_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ON_EVENT_VELLOCI_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.ON_EVENT_VELLOCI_REJECTED: {
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
