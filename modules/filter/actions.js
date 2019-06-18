import * as api from './api'

import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'

export const toggleFilter = createAction('TOGGLE_FILTER', (value = null) => value)
export const filterSaving = createAction('FILTER_SAVING', (isSaving = false) => isSaving)
export const filterApplying = createAction('FILTER_APPLYING', (isApplying) => isApplying)


export const getSavedFilters = createAsyncAction('GET_SAVED_FILTERS', (savedUrl) => api.getSavedFilters(savedUrl))
export const getAutocompleteData = createAsyncAction('GET_AUTOCOMPLETE_DATA', (searchUrl, text) => api.getAutocompleteData(searchUrl, text))
export const saveFilter = createAsyncAction('SAVE_FILTER', (savedUrl, filter) => api.saveFilter(savedUrl, filter))