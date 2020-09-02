import * as AT from './action-types'

import { getSafe } from '~/utils/functions'

export const initialState = {
  activeStep: 0,
  loading: false
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.NEXT_STEP: {
      return {
        ...state,
        activeStep: payload
      }
    }

    case AT.PREV_STEP: {
      return {
        ...state,
        activeStep: payload
      }
    }

    case AT.CLEARE_ACTIVE_STEP: {
      return {
        ...state,
        activeStep: 0
      }
    }

    case AT.REGISTER_VELLOCI_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.REGISTER_VELLOCI_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.REGISTER_VELLOCI_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    default:
      return state
  }
}
