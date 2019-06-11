
import { createAction } from 'redux-promise-middleware-actions'

export const toggleFilter = createAction('TOGGLE_FILTER', (value = null) => value)
export const filterSaving = createAction('FILTER_SAVING', (isSaving = false) => isSaving)
export const filterApplying = createAction('FILTER_APPLYING', (isApplying) => isApplying)