import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import api from './api'

export const loadData = createAction('ALERTS_TAB_CHANGED', category => category)
export const markSeen = createAsyncAction('ALERTS_MARK_SEEN', id => api.markSeen(id))
export const markUnseen = createAsyncAction('ALERTS_MARK_UNSEEN', id => api.markUnseen(id))
export const getCategories = createAsyncAction('ALERTS_GET_CATEGORIES', () => api.getCategories())
export const getCountUnseen = createAsyncAction('ALERTS_GET_COUNT_UNSEEN',() => api.getCountUnseen())
export const handleVariableSave = createAction('ALERTS_HANDLE_VARIABLE_CHANGE', (variable, value) => ({
  variable,
  value
}))
export const markSeenArray = createAsyncAction('ALERTS_MARK_SEEN_ARRAY',arr => api.markSeenArray(arr))
export const markUnseenArray = createAsyncAction('ALERTS_MARK_UNSEEN_ARRAY',arr =>
  api.markUnseenArray(arr))
export const deleteArray = createAsyncAction('ALERTS_DELETE_ARRAY',arr => api.deleteArray(arr))