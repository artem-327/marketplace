import typeToReducer from 'type-to-reducer'
import { openBroadcast, closeBroadcast, updateFilter, saveRules, switchMode } from './actions'

const initialState = {
  id: null,
  offer: {
    pricingTiers: [{price: 0}],
    price: {}
  },
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
    return {
      ...initialState,
      open: true,
      loading: true
    }
  },

  [openBroadcast.fulfilled]: (state, { payload: { data, id, offer } }) => {
    return {
      ...state,
      loading: false,
      data,
      id,
      offer
    }
  },

  [closeBroadcast]: (state) => {
    return {
      ...state,
      open: false,
      data: null,
      loading: false
    }
  },

  [switchMode]: (state, { payload: mode }) => ({
    ...state,
    mode
  }),

  [updateFilter]: (state, { payload }) => ({
    ...state,
    filter: payload
  }),

  [saveRules.pending]: (state) => ({
    ...state,
    loading: true
  }),

  [saveRules.fulfilled]: (state) => ({
    ...state,
    loading: false,
    open: false
  }),

  [saveRules.rejected]: (state) => ({
    ...state,
    loading: false
  })

}, initialState)