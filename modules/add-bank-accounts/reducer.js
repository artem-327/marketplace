import typeToReducer from 'type-to-reducer'
//Services
import { getSafe } from '../../utils/functions'
//Actions
import {
  onEventVelloci,
  getVellociToken,
  getVellociBusinessId,
  addVellociAcount
} from './actions'

export const initialState = {
  loading: false,
  vellociToken: '',
  vellociBusinessId: ''
}

export default typeToReducer(
  {
    [onEventVelloci.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [onEventVelloci.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false
      }
    },
    [onEventVelloci.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getVellociToken.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getVellociToken.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        vellociToken: payload
      }
    },
    [getVellociToken.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [getVellociBusinessId.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [getVellociBusinessId.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        vellociBusinessId: getSafe(() => payload.vellociBusinessId, '')
      }
    },
    [getVellociBusinessId.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
    [addVellociAcount.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [addVellociAcount.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false
      }
    },
    [addVellociAcount.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    },
  },

  /* ! !
   ADD_VELLOCI_ACOUNT
case AT.ON_EVENT_VELLOCI_PENDING: {
  return {
    ...state,
    loading: true
  }
}

case AT.ON_EVENT_VELLOCI_FULFILLED: {
  return {
    ...state,
    loading: false
  }
}

case AT.ON_EVENT_VELLOCI_REJECTED: {
  return {
    ...state,
    loading: false
  }
}

   */

  initialState
)
