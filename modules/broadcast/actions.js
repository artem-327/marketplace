import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async (id) => {
  const {data} = await api.loadRules(id)

  return {
    data,
    id
  }
})

export const saveRules = createAsyncAction('BROADCAST_SAVE', async (id, rules) => {
  await api.saveRules(id, rules)
})

export const closeBroadcast = createAction('BROADCAST_CLOSE')
export const updateFilter = createAction('BROADCAST_FILTER_UPDATE', filter => filter)
export const switchMode = createAction('BROADCAST_SWITCH_MODE', (mode) => mode)