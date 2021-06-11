import typeToReducer from 'type-to-reducer'
import {
  getNextImmediate
} from './actions'

export const initialState = {
  nextImmediate: {}
}

export default typeToReducer(
  {
    [getNextImmediate.pending]: state => {
      return {
        ...state
      }
    },
    [getNextImmediate.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        nextImmediate: payload
      }
    },
    [getNextImmediate.rejected]: state => {
      return {
        ...state
      }
    }
  },

  initialState
)
