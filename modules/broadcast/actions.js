import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'
import { getAllProductOffers } from '~/modules/inventory/api'

import { getSafe } from '~/utils/functions'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async (offer) => {
  const { data } = await api.loadRules(offer.id)

  return {
    data,
    id: offer.id,
    offer: {
      id: offer.id,
      pricingTiers: offer.pricingTiers,
      currency: getSafe(() => offer.cost.currency.code, 'USD')
    }
  }
})


export const initGlobalBroadcast = createAsyncAction('INIT_GLOBAL_BROADCAST', async () => {
  let productOffers = await getAllProductOffers()
  let data = await api.loadGeneralRules()
  let pricingTiers = []

  productOffers.forEach(po => {
    let first = po.pricingTiers[0], last = po.pricingTiers[po.pricingTiers.length - 1]
    if (first.price > 0 && last.price > 0) {
      pricingTiers.push({ low: first, high: last })
    }
  })

  let min = pricingTiers[0].low, max = pricingTiers[0].high

  pricingTiers.forEach(tier => {
    if (tier.low.price < min.price && tier.low.price > 0) min = tier.low
    if (tier.high.price > max.price && tier.high.price > 0) max = tier.high
  })

  return {
    data,
    id: null,
    offer: {
      id: null,
      pricingTiers: [max, min],
      currency: getSafe(() => productOffers[0].cost.currency.code, 'USD'),

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
export const switchMode = createAction('BROADCAST_SWITCH_MODE', (mode) => mode)