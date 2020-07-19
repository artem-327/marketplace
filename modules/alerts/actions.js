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

export function handleVariableSave(variable, value) {
  return {
    type: AT.ALERTS_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}