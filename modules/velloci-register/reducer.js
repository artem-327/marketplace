import * as AT from './action-types'

import { getSafe } from '~/utils/functions'

export const initialState = {
  activeStep: 0,
  loading: false,
  numberBeneficialOwners: 0,
  entityTypes: {
    data: [],
    loading: false
  },
  naicsCodes: {
    data: [],
    loading: false
  }
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

    case AT.COUNT_BENEFICIAL_OWNERS: {
      return {
        ...state,
        numberBeneficialOwners: payload
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

    case AT.GET_ENTITY_TYPES_PENDING: {
      return {
        ...state,
        entityTypes: { loading: true }
      }
    }

    case AT.GET_ENTITY_TYPES_REJECTED: {
      return {
        ...state,
        entityTypes: { loading: false }
      }
    }

    case AT.GET_ENTITY_TYPES_FULFILLED: {
      return {
        ...state,
        entityTypes: { data: payload, loading: false }
      }
    }

    case AT.GET_NAICS_CODES_PENDING: {
      return {
        ...state,
        naicsCodes: { loading: true }
      }
    }

    case AT.GET_NAICS_CODES_REJECTED: {
      return {
        ...state,
        naicsCodes: { loading: false }
      }
    }

    case AT.GET_NAICS_CODES_FULFILLED: {
      return {
        ...state,
        naicsCodes: { data: payload, loading: false }
      }
    }

    default:
      return state
  }
}
