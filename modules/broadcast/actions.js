import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async (offer) => {
  const { data } = await api.loadRules(offer.id)

  return {
    data,
    id: offer.id,
    offer: {
      id: offer.id,
      pricingTiers: offer.pricingTiers,
      currency: offer.cost.currency && offer.cost.currency.code,
    }
  }
})

export const saveRules = createAsyncAction('BROADCAST_SAVE', async (id, rules) => {
  await api.saveRules(id, rules)
})

export const saveTemplate = createAsyncAction('BROADCAST_SAVE_TEMPLATE', payload => api.saveTemplate(payload))
export const updateTemplate = createAsyncAction('UPDATE_TEMPLATE', (id, payload) => api.updateTemplate(id, payload))
export const getTemplate = createAsyncAction('GET_TEMPLATE', id => api.getTemplate(id))
export const deleteTemplate = createAsyncAction('DELETE_TEMPLATE', id => api.deleteTemplate(id))
export const getTemplates = createAsyncAction('GET_TEMPLATES', () => api.getTemplates())

export const closeBroadcast = createAction('BROADCAST_CLOSE')
export const updateFilter = createAction('BROADCAST_FILTER_UPDATE', filter => filter)
export const switchMode = createAction('BROADCAST_SWITCH_MODE', (mode) => mode)