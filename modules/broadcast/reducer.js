import typeToReducer from 'type-to-reducer'
import { getSafe } from '../../utils/functions'

import {
  openBroadcast,
  closeBroadcast,
  switchTemplateModal,
  updateFilter,
  saveRules,
  switchMode,
  saveTemplate,
  getTemplates,
  getTemplate,
  updateTemplate,
  deleteTemplate,
  initGlobalBroadcast,
  loadingChanged,
  treeDataChanged,
  openModalCompanyInfo,
  closeModalCompanyInfo,
  getCompanyInfo,
  getAssociations,
  broadcastChange
} from './actions'

const initialState = {
  id: null,
  offer: {
    pricingTiers: [{ price: 0 }],
    price: {}
  },
  associations: [],
  associationsFetching: false,
  open: false,
  loading: false,
  data: null,
  broadcastTemplateName: null,
  loadedRulesTrig: false,
  templateSaving: false,
  loadingTemplates: false,
  templateDeleting: false,
  templates: [],
  filter: {
    search: '',
    category: 'branch',
    broadcast: 'all'
  },
  mode: 'client', // price
  isOpenModalCompanyInfo: false,
  dataCompanyInfo: {},
  isLoadingModalCompanyInfo: false,
  isOpenTemplateModal: false
}

export default typeToReducer(
  {
    [openBroadcast.pending]: (state, action) => {
      return {
        ...initialState,
        templates: state.templates,
        associations: state.associations,
        associationsFetching: state.associationsFetching,
        open: true,
        loading: true
      }
    },

    [openBroadcast.fulfilled]: (state, { payload: { data, broadcastTemplateName, id, offer } }) => {
      return {
        ...state,
        loading: false,
        data,
        broadcastTemplateName,
        loadedRulesTrig: !state.loadedRulesTrig,
        id,
        offer
      }
    },

    [closeBroadcast]: state => {
      return {
        ...state,
        open: false,
        data: null,
        loading: false
      }
    },

    [switchTemplateModal]: (state, { payload: { isOpenTemplateModal } }) => {
      return {
        ...state,
        isOpenTemplateModal
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

    [saveRules.pending]: state => ({
      ...state,
      loading: true
    }),

    [saveRules.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false,
        open: false,
        broadcastTemplateName: payload && payload.broadcastTemplateName ? payload.broadcastTemplateName : null
      }
    },

    [saveRules.rejected]: state => ({
      ...state,
      loading: false
    }),

    [saveTemplate.pending]: state => ({
      ...state,
      templateSaving: true
    }),

    [saveTemplate.fulfilled]: (state, { payload }) => ({
      ...state,
      templateSaving: false,
      templates: state.templates.concat(payload),
      isOpenTemplateModal: false
    }),

    [saveTemplate.rejected]: state => ({
      ...state,
      templateSaving: false
    }),

    [getTemplates.pending]: state => ({
      ...state,
      loadingTemplates: true
    }),

    [getTemplates.fulfilled]: (state, { payload }) => ({
      ...state,
      loadingTemplates: false,
      templates: payload
    }),

    [getTemplate.pending]: state => ({
      ...state,
      loading: true
    }),

    [getTemplate.fulfilled]: (state, { payload }) => {
      let { id, mappedBroadcastRules } = payload

      return {
        ...state,
        data: mappedBroadcastRules,
        loading: false
      }
    },

    [getTemplate.rejected]: state => ({
      ...state,
      loading: false
    }),

    [getTemplates.rejected]: state => ({
      ...state,
      loadingTemplates: false
    }),

    [updateTemplate.pending]: state => ({
      ...state,
      templateSaving: true
    }),

    [updateTemplate.fulfilled]: state => ({
      ...state,
      templateSaving: false,
      isOpenTemplateModal: false
    }),

    [updateTemplate.rejected]: state => ({
      ...state,
      templateSaving: false
    }),

    [deleteTemplate.pending]: state => ({
      ...state,
      templateDeleting: true
    }),

    [deleteTemplate.fulfilled]: (state, { payload }) => ({
      ...state,
      templates: state.templates.filter(template => template.id !== payload),
      templateDeleting: false
    }),

    [deleteTemplate.rejected]: state => ({
      ...state,
      templateDeleting: false
    }),
    [initGlobalBroadcast.pending]: state => ({
      ...state,
      loading: true
    }),
    [initGlobalBroadcast.fulfilled]: (state, { payload }) => ({
      ...state,
      ...payload,
      loading: false
    }),
    [initGlobalBroadcast.rejected]: state => ({
      ...state,
      loading: false
    }),
    [loadingChanged]: (state, { payload }) => ({
      ...state,
      loading: typeof payload === 'boolean' ? payload : !state.loading
    }),
    [treeDataChanged]: (state, { payload }) => {
      return {
        ...state,
        data: getSafe(() => payload.model.rule, payload.model)
      }
    },
    [openModalCompanyInfo]: state => ({
      ...state,
      isOpenModalCompanyInfo: true
    }),
    [closeModalCompanyInfo]: state => ({
      ...state,
      isOpenModalCompanyInfo: false
    }),

    [getCompanyInfo.pending]: state => ({
      ...state,
      isLoadingModalCompanyInfo: true
    }),

    [getCompanyInfo.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        dataCompanyInfo: payload,
        isLoadingModalCompanyInfo: false
      }
    },

    [getCompanyInfo.rejected]: state => ({
      ...state,
      isLoadingModalCompanyInfo: false
    }),
    [getAssociations.pending]: state => {
      return {
        ...state,
        associationsFetching: true
      }
    },
    [getAssociations.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        associations: payload.map(a => a.name),
        associationsFetching: false
      }
    },
    [getAssociations.rejected]: state => {
      return {
        ...state,
        associationsFetching: false
      }
    },
    [broadcastChange.pending]: state => {
      return {
        ...state,
        loading: true
      }
    },
    [broadcastChange.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        loading: false
      }
    },
    [broadcastChange.rejected]: state => {
      return {
        ...state,
        loading: false
      }
    }
  },

  initialState
)
