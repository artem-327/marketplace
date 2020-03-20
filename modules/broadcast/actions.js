import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async offer => {
  const data = await api.loadRules(offer.id)

  return {
    data,
    id: offer.id,
    offer: {
      id: offer.id,
      pricingTiers: offer.pricingTiers,
      currency: getSafe(() => offer.cost.currency.code, currency)
    }
  }
})

export const initGlobalBroadcast = createAsyncAction('INIT_GLOBAL_BROADCAST', async () => {
  let data = await api.loadGeneralRules()

  return {
    data,
    id: null,
    offer: {
      id: null,
      pricingTiers: [null, null],
      currency: 'USD'
    }
  }
})

export const saveRules = createAsyncAction('BROADCAST_SAVE', async (id, rules) => {
  id ? await api.saveRules(id, rules) : await api.saveGeneralRules(rules)
})

export const saveTemplate = createAsyncAction('BROADCAST_SAVE_TEMPLATE', payload => api.saveTemplate(payload))
export const updateTemplate = createAsyncAction('UPDATE_TEMPLATE', (id, payload) => api.updateTemplate(id, payload))
export const getTemplate = createAsyncAction('GET_TEMPLATE', id => api.getTemplate(id))
export const deleteTemplate = createAsyncAction('DELETE_TEMPLATE', id => api.deleteTemplate(id))
export const getTemplates = createAsyncAction('GET_TEMPLATES', () => api.getTemplates())

export const closeBroadcast = createAction('BROADCAST_CLOSE')
export const updateFilter = createAction('BROADCAST_FILTER_UPDATE', filter => filter)
export const switchMode = createAction('BROADCAST_SWITCH_MODE', mode => mode)
export const loadingChanged = createAction('BROADCAST_LOADING', (force = null) => force)
export const treeDataChanged = createAction('TREE_DATA_CHANGED', treeData => treeData)

export const openModalCompanyInfo = createAction('OPEN_MODAL_COMPANY_INFO')
export const closeModalCompanyInfo = createAction('CLOSE_MODAL_COMPANY_INFO')
export const getCompanyInfo = createAsyncAction('GET_COMPANY_INFO', companyId => api.getCompanyInfo(companyId))
