import typeToReducer from 'type-to-reducer'
import * as AT from './action-types'

import {
  getDashboardData,
  getDailyStatistics
} from './actions'

export const initialState = {
  data: null,
  dailyStats: null,
  loading: false
}


export default typeToReducer(
  {
    [getDashboardData.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getDashboardData.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        data: payload.data
      }
    },
    [getDashboardData.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getDailyStatistics.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getDailyStatistics.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        dailyStats: payload.data
      }
    },
    [getDailyStatistics.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    }
  },

  initialState
)
