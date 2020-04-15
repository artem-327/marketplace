import * as api from './api'

import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'

import { filterTypes, filterPresets } from './constants/filter'

/* // ! !
export const toggleFilter = createAction(
  'TOGGLE_FILTER',
  (value = null, type = filterPresets.INVENTORY_MARKETPLACE) => ({ value, type })
)
*/
export const filterSaving = createAction('FILTER_SAVING', (isSaving = false) => isSaving)
export const filterApplying = createAction('FILTER_APPLYING', isApplying => isApplying)
export const applyFilter = createAction('APPLY_FILTER', filter => filter)
export const setParams = createAction('SET_PARAMS', params => params)

export const getSavedFilters = createAsyncAction(
  'GET_SAVED_FILTERS',
  async (savedUrl, productInfo, apiUrl, filterType = filterTypes.INVENTORY) => {
    let data = await api.getSavedFilters(savedUrl)

    return { data, productInfo, filterType }
  }
)
// export const getAutocompleteData = createAsyncAction('GET_AUTOCOMPLETE_DATA', searchUrl => api.getAutocompleteData(searchUrl))

export const getAutocompleteWarehouse = createAsyncAction('GET_AUTOCOMPLETE_WAREHOUSE_DATA', url =>
  api.getAutocompleteWarehouse(url)
)

export const saveFilter = createAsyncAction('SAVE_FILTER', (savedUrl, filter) => api.saveFilter(savedUrl, filter))

export const updateFilter = createAsyncAction('UPDATE_FILTER', (id, filter) => api.updateFilter(id, filter))

export const deleteFilter = createAsyncAction('DELETE_FILTER', templateId => api.deleteFilter(templateId))

export const updateFilterNotifications = createAsyncAction('UPDATE_FILTER_NOTIFICATIONS', (templateId, notifications) =>
  api.updateFilterNotifications(templateId, notifications)
)

export const getAutocompleteManufacturer = createAsyncAction('GET_AUTOCOMPLETE_MANUFACTURER_DATA', url =>
  api.getAutocompleteManufacturer(url)
)

export const getAutocompleteOrigin = createAsyncAction('GET_AUTOCOMPLETE_ORIGIN_DATA', url =>
  api.getAutocompleteOrigin(url)
)

export const saveFilterState = createAction('SAVE_FILTER_STATE', value => value)

export const fetchProductConditions = createAsyncAction('GET_PRODUCT_CONDITIONS', () =>
  api.getProductConditions()
)
export const fetchProductForms = createAsyncAction('GET_PRODUCT_FORMS', () =>
  api.getProductForms()
)
export const fetchPackagingTypes = createAsyncAction('GET_PACKAGING_TYPES', () =>
  api.getPackagingTypes()
)
export const fetchProductGrade = createAsyncAction('GET_PRODUCT_GRADES', () =>
  api.getProductGrade()
)
export const fetchWarehouses = createAsyncAction('GET_WAREHOUSES', () =>
  api.getWarehouses()
)


