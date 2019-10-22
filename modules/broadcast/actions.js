import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'
import { getAllProductOffers } from '~/modules/inventory/api'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async (offer) => {
  const { data } = await api.loadRules(offer.id)

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
  let productOffers = await getAllProductOffers()
  let data = await api.loadGeneralRules()
  let pricingTiers = []
  let min = 0, max = 0
  
  if (productOffers.length > 0) {

    productOffers.forEach(po => {
      let first = po.pricingTiers[0], last = po.pricingTiers[po.pricingTiers.length - 1]
      if (getSafe(() => first.pricePerUOM, -1) > 0 && getSafe(() => last.pricePerUOM, -1) > 0) {
        pricingTiers.push({ low: first, high: last })
      }
    })

    min = pricingTiers[0].low, max = pricingTiers[0].high
    pricingTiers.forEach(tier => {
      if (tier.low.pricePerUOM < min.pricePerUOM && tier.low.pricePerUOM > 0) min = tier.low
      if (tier.high.pricePerUOM > max.pricePerUOM && tier.high.pricePerUOM > 0) max = tier.high
    })
  }

  return {
    data,
    id: null,
    offer: {
      id: null,
      pricingTiers: [max, min],
      currency: getSafe(() => productOffers[0].cost.currency.code, currency),
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
export const loadingChanged = createAction('BROADCAST_LOADING', (force = null) => force)
export const treeDataChanged = createAction('TREE_DATA_CHANGED', (treeData) => treeData)