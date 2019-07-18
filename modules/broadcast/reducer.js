import typeToReducer from 'type-to-reducer'
import { openBroadcast, closeBroadcast, updateFilter, saveRules, switchMode, saveTemplate, getTemplates, getTemplate, updateTemplate, deleteTemplate } from './actions'

const initialState = {
  id: null,
  offer: {
    pricingTiers: [{ price: 0 }],
    price: {}
  },
  open: false,
  loading: false,
  data: null,
  templateSaving: false,
  loadingTemplates: false,
  templateDeleting: false,
  templates: [],
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
  }),

  [saveTemplate.pending]: (state) => ({
    ...state,
    templateSaving: true
  }),

  [saveTemplate.fulfilled]: (state) => ({
    ...state,
    templateSaving: false,
    // TODO - add to templates array
  }),

  [saveTemplate.rejeted]: (state) => ({
    ...state,
    templateSaving: false
  }),

  [getTemplates.pending]: (state) => ({
    ...state,
    loadingTemplates: true
  }),

  [getTemplates.fulfilled]: (state, { payload }) => ({
    ...state,
    loadingTemplates: false,
    templates: payload // not tested; BE has some issue at get templates endpoint
  }),

  [getTemplate.pending]: (state) => ({
    ...state,
    loading: true
  }),

  [getTemplate.fulfilled]: (state, { payload }) => {
    let { id, mappedBroadcastRules } = payload

    return ({
      ...state,
      id,
      data: mappedBroadcastRules,
      loading: false
    })
  },

  [getTemplate.rejected]: (state, ) => ({
    ...state,
    loading: false
  }),

  [getTemplates.rejected]: (state) => ({
    ...state,
    loadingTemplates: false
  }),

  
  [updateTemplate.pending]: (state) => ({
    ...state,
    templateSaving: true
  }),

  [updateTemplate.fulfilled]: (state) => ({
    ...state,
    templateSaving: false
  }),

  [updateTemplate.rejected]: (state) => ({
    ...state,
    templateSaving: false
  }),

  [deleteTemplate.pending]: (state) => ({
    ...state,
    templateDeleting: true
  }),

  [deleteTemplate.fulfilled]: (state) => ({
    ...state,
    // TODO - remove from templates array
    templateDeleting: false
  }),

  [deleteTemplate.rejected]: (state) => ({
    ...state,
    templateDeleting: false
  }),

}, initialState)