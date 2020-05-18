import * as AT from './action-types'

export const initialState = {
  data: [],
  companyLogo: null,
  loading: false,
  associations: []
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.BUSINESS_TYPES_FETCH_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.BUSINESS_TYPES_FETCH_REJECTED: {
      return {
        ...state,
        data: state.data,
        loading: false
      }
    }

    case AT.BUSINESS_TYPES_FETCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        data: payload
      }
    }

    case AT.GET_COMPANY_LOGO_FULFILLED: {
      return {
        ...state,
        companyLogo: payload.data.size ? payload.data : null
      }
    }

    case AT.GET_ASSOCIATIONS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_ASSOCIATIONS_REJECTED: {
      return {
        ...state,
        associations: state.associations,
        loading: false
      }
    }

    case AT.GET_ASSOCIATIONS_FULFILLED: {
      return {
        ...state,
        loading: false,
        associations: payload
      }
    }

    default:
      return state
  }
}
