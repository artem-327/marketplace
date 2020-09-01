import * as AT from './action-types'

export const initialState = {
  data: null,
  dailyStats: null,
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

    case AT.GET_DAILY_STATISTICS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case AT.GET_DAILY_STATISTICS_FULFILLED: {
      return {
        ...state,
        loading: false,
        dailyStats: payload.data
      }
    }
    case AT.GET_DAILY_STATISTICS_REJECTED: {
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
