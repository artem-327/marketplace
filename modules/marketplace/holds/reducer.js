import * as AT from './action-types'

import { uniqueArrayByKey, getSafe } from '~/utils/functions'
import { Datagrid } from '~/modules/datagrid'

export const initialState = {
  loading: false,
  holds: []
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AT.CREATED_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.CREATED_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload
      }
    }

    case AT.CREATED_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.GET_MY_HOLDS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_MY_HOLDS_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.GET_MY_HOLDS_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.GET_FOREIGN_HOLDS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_FOREIGN_HOLDS_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.GET_FOREIGN_HOLDS_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.REJECT_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.REJECT_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.REJECT_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.CANCEL_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.CANCEL_HOLD_FULFILLED: {
      Datagrid.loadData()
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.CANCEL_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.APPROVE_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.APPROVE_HOLD_FULFILLED: {
      Datagrid.loadData()
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.APPROVE_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.TO_CART_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.TO_CART_HOLD_FULFILLED: {
      Datagrid.loadData()
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.TO_CART_HOLD_REJECTED: {
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
