import typeToReducer from 'type-to-reducer'
import {openBroadcast, closeBroadcast, updateLocalRules, updateFilter} from './actions'

const initialState = {
  open: false,
  loading: false,
  data: null,
  filter: {
    search: '',
    category: 'region'
  }
}

export default typeToReducer({
  [openBroadcast.pending]: (state, action) => {
    return {...state,
      open: true,
      loading: true
    }
  },

  [openBroadcast.fulfilled]: (state, {payload}) => {
    return {...state,
      loading: false,
      data: payload
    }
  },

  [updateLocalRules]: (state, {payload}) => {
    return {...state,
      data: payload
    }
  },

  [closeBroadcast]: (state) => {
    return {...state,
      open: false,
      data: null,
      loading: false  
    }
  },

  [updateFilter]: (state, {payload}) => ({
    ...state,
    filter: payload
  })

}, initialState)