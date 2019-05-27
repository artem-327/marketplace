import * as AT from './action-types'

export const initialState = {
  data: [],
  loading: false
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
    default: return state
  }
}