import typeToReducer from 'type-to-reducer'
import {openBroadcast, closeBroadcast, updateLocalRules, updateFilter, saveRules, switchMode} from './actions'

const initialState = {
  id: null,
  open: false,
  loading: false,
  data: null,
  filter: {
    search: '',
    category: 'region'
  },
  mode: 'client' // price
}

export default typeToReducer({
  [openBroadcast.pending]: (state, action) => {
    return {...state,
      open: true,
      loading: true
    }
  },

  [openBroadcast.fulfilled]: (state, {payload: {data, id}}) => {
    return {...state,
      loading: false,
      data,
      id
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

  [switchMode]: (state, {payload: mode}) => ({ ...state,
    mode
  }),

  [updateFilter]: (state, {payload}) => ({
    ...state,
    filter: payload
  }),

  [saveRules.pending]: (state) => ({...state,
    loading: true
  }),

  [saveRules.fulfilled]: (state) => ({...state,
    loading: false,
    open: false
  }),

  [saveRules.rejected]: (state) => ({
    ...state,
    loading: false
  })

}, initialState)