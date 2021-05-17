import * as AT from './action-types'
import api from './api'
import { Datagrid } from '~/modules/datagrid'

export const loadData = (category) => ({
  type: AT.ALERTS_TAB_CHANGED,
  payload: category
})

export const markSeen = (id) => ({
  type: AT.ALERTS_MARK_SEEN,
  payload: api.markSeen(id)
})

export const markUnseen = (id) => ({
  type: AT.ALERTS_MARK_UNSEEN,
  payload: api.markUnseen(id)
})

export const getCategories = () => ({
  type: AT.ALERTS_GET_CATEGORIES,
  payload: api.getCategories()
})

export const getCountUnseen = () => ({
  type: AT.ALERTS_GET_COUNT_UNSEEN,
  payload: api.getCountUnseen()
})

export function handleVariableSave(variable, value) {
  return {
    type: AT.ALERTS_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export const markSeenArray = (arr) => ({
  type: AT.ALERTS_MARK_SEEN_ARRAY,
  payload: api.markSeenArray(arr)
})

export const markUnseenArray = (arr) => ({
  type: AT.ALERTS_MARK_UNSEEN_ARRAY,
  payload: api.markUnseenArray(arr)
})

export const deleteArray = (arr) => ({
  type: AT.ALERTS_DELETE_ARRAY,
  payload: api.deleteArray(arr)
})

export const getNextImmediate = () => ({
  type: AT.ALERTS_GET_NEXT_IMMEDIATE,
  payload: api.getNextImmediate()
})