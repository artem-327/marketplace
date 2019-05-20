import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import * as api from './api'

export const openBroadcast = createAsyncAction('BROADCAST_OPEN', async (id) => {
  const {data} = await api.loadRules(id)

  return data
})

export const closeBroadcast = createAction('BROADCAST_CLOSE')
export const updateLocalRules = createAction('BROADCAST_LOCAL_UPDATE', rules => rules)
export const updateFilter = createAction('BROADCAST_FILTER_UPDATE', filter => filter)