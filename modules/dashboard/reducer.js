import * as AT from './action-types'

export const initialState = {
  data: null,
  loading: false
}

export default function reducer(state = initialState, action) {
  const { payload, type } = action

  switch (type) {
    case AT.GET_DASHBOARD_DATA_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case AT.GET_DASHBOARD_DATA_FULFILLED: {
      return {
        ...state,
        loading: false,
        data: payload.data
      }
    }
    case AT.GET_DASHBOARD_DATA_REJECTED: {
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
