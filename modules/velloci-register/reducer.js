import * as AT from './action-types'

import { getSafe } from '~/utils/functions'

export const initialState = {
  activeStep: 0
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

    default:
      return state
  }
}
