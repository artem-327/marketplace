import * as a from './actions'
import typeToReducer from 'type-to-reducer'

import { uniqueArrayByKey, mapAutocompleteData } from '~/utils/functions'

import { datagridValues, paths, filterPresets } from './constants/filter'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'

const asignFiltersDescription = (filter, params) => {
  let datagridKeys = Object.keys(datagridValues)

  let { filters } = filter

  if (filters) {
    filters.forEach(filter => {
      datagridKeys.forEach(key => {
        let datagrid = datagridValues[key]
        if (
          datagrid &&
          datagrid.paths &&
          datagrid.paths.includes(filter.path) &&
          datagrid.operator === filter.operator
        ) {
          filter.description = datagrid.description
          filter.valuesDescription = getSafe(() => datagridValues[key].valuesDescription(filter.values, params), null)
          try {
            filter.tagDescription = getSafe(() => datagridValues[key].tagDescription(filter.values, params), null)
          } catch (_) {
            filter.tagDescription = getSafe(() => datagridValues[key].valuesDescription(filter.values, params), null)
          }
        }
      })
    })
  }

  return filter
}

export const initialState = {
  isOpen: false,
  ordersIsOpen: false,
  isFilterSaving: false,
  isFilterApplying: false,
  autocompleteWarehouse: [],
  autocompleteWarehouseLoading: false,
  savedFilters: [],
  appliedFilter: [],
  savedFiltersLoading: false,
  savedFilterUpdating: false,
  savedAutocompleteData: [],
  params: {
    currencyCode: currency
  },
  autocompleteManufacturer: [],
  autocompleteManufacturerLoading: false,
  autocompleteOrigin: [],
  autocompleteOriginLoading: false
}

export default typeToReducer(
  {
    [a.setParams]: (state, { payload }) => ({
      ...state,
      params: {
        ...state.params,
        ...payload
      }
    }),

    /* TOGGLE_FILTER */

    [a.toggleFilter]: (state, { payload: { value, type } }) => {
      let propName = 'isOpen'
      if (type === filterPresets.ORDERS) propName = 'ordersIsOpen'

      return {
        ...state,
        [propName]: typeof value === 'boolean' ? value : !state[propName]
      }
    },

    /* FILTER_SAVING */

    [a.filterSaving]: (state, { payload: isSaving }) => ({
      ...state,
      isFilterSaving: isSaving
    }),

    /* FILTER_APPLYING */

    [a.filterApplying]: (state, { payload: isApplying }) => ({
      ...state,
      isFilterApplying: isApplying
    }),

    /* GET_SAVED_FILTERS */

    [a.getSavedFilters.pending]: state => {
      return {
        ...state,
        savedFiltersLoading: true
      }
    },
    [a.getSavedFilters.fulfilled]: (state, { payload }) => {
      let { data } = payload
      let autocompleteData = []

      data.forEach(element => {
        element = asignFiltersDescription(element, state.params)
        element.filters.forEach(filter => {
          if (filter.path === paths.productOffers.productId || filter.path === paths.casProduct.id) {
            filter.values.forEach(element => {
              let parsed = JSON.parse(element.description)
              let { name, casNumberCombined } = parsed
              autocompleteData.push({ id: element.value, productName: name, casNumberCombined })
            })
          }
        })
      })

      return {
        ...state,
        savedFiltersLoading: false,
        savedFilters: data,
        savedAutocompleteData: uniqueArrayByKey(
          mapAutocompleteData(autocompleteData).concat(state.savedAutocompleteData),
          'key'
        )
      }
    },
    [a.getSavedFilters.rejected]: state => {
      return {
        ...state,
        savedFiltersLoading: false,
        savedFilters: []
      }
    },

    /* GET_AUTOCOMPLETE_DATA */

    // [a.getAutocompleteData.pending]: (state) => {
    //   return {
    //     ...state,
    //     autocompleteDataLoading: true
    //   }
    // },
    // [a.getAutocompleteData.fulfilled]: (state, { payload }) => {
    //   return {
    //     ...state,
    //     autocompleteDataLoading: false,
    //     autocompleteData: uniqueArrayByKey(payload.concat(state.autocompleteData), 'id'),
    //   }
    // },
    // [a.getAutocompleteData.rejected]: (state) => {
    //   return {
    //     ...state,
    //     autocompleteDataLoading: false,
    //     autocompleteData: []
    //   }
    // },

    /* GET_AUTOCOMPLETE_WAREHOUSE_DATA */

    [a.getAutocompleteWarehouse.pending]: state => {
      return {
        ...state,
        autocompleteWarehouseLoading: true
      }
    },
    [a.getAutocompleteWarehouse.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        autocompleteWarehouseLoading: false,
        autocompleteWarehouse: uniqueArrayByKey(payload.concat(state.autocompleteWarehouse), 'id')
      }
    },
    [a.getAutocompleteWarehouse.rejected]: state => {
      return {
        ...state,
        autocompleteWarehouseLoading: false,
        autocompleteWarehouse: []
      }
    },

    /* SAVE_FILTER */

    [a.saveFilter.pending]: state => {
      return {
        ...state,
        isFilterSaving: true
      }
    },
    [a.saveFilter.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isFilterSaving: false,
        savedFilters: [].concat(asignFiltersDescription(payload, state.params), state.savedFilters)
      }
    },
    [a.saveFilter.rejected]: state => {
      return {
        ...state,
        isFilterSaving: false
      }
    },

    /* APPLY_FILTER */

    [a.applyFilter]: (state, { payload }) => {
      let appliedFilter = asignFiltersDescription(payload, state.params)
      return {
        ...state,
        appliedFilter: {
          ...state.appliedFilter,
          ...appliedFilter
        }
      }
    },

    /* DELETE_FILTER */

    [a.deleteFilter.pending]: state => {
      return {
        ...state,
        savedFiltersLoading: true
      }
    },

    [a.deleteFilter.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        savedFilters: state.savedFilters.filter(filter => filter.id !== payload),
        savedFiltersLoading: false
      }
    },

    [a.deleteFilter.rejected]: state => {
      return {
        ...state,
        savedFiltersLoading: false
      }
    },

    /* UPDATE_FILTER_NOTIFICATIONS */

    [a.updateFilterNotifications.pending]: state => {
      return {
        ...state,
        savedFilterUpdating: true
      }
    },

    [a.updateFilterNotifications.fulfilled]: (state, { payload }) => {
      let savedFilters = state.savedFilters.slice(0)
      let index = savedFilters.findIndex(el => el.id === payload.id)

      savedFilters[index] = asignFiltersDescription(payload, state.params)

      return {
        ...state,
        savedFilters,
        savedFilterUpdating: false
      }
    },

    [a.updateFilterNotifications.rejected]: state => {
      return {
        ...state,
        savedFilterUpdating: false
      }
    },

    /* UPDATE_FILTER */

    [a.updateFilter.pending]: state => {
      return {
        ...state,
        isFilterSaving: true
      }
    },

    [a.updateFilter.fulfilled]: (state, { payload }) => {
      let savedFilters = state.savedFilters.slice(0)
      let index = savedFilters.findIndex(el => el.id === payload.id)

      savedFilters[index] = asignFiltersDescription(payload, state.params)

      return {
        ...state,
        savedFilters,
        isFilterSaving: false
      }
    },

    [a.updateFilter.pending]: state => {
      return {
        ...state,
        isFilterSaving: false
      }
    },

    /* GET_AUTOCOMPLETE_MANUFACTURER_DATA */

    [a.getAutocompleteManufacturer.pending]: state => {
      return {
        ...state,
        autocompleteManufacturerLoading: true
      }
    },
    [a.getAutocompleteManufacturer.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        autocompleteManufacturerLoading: false,
        autocompleteManufacturer: uniqueArrayByKey(payload.concat(state.autocompleteManufacturer), 'id')
      }
    },
    [a.getAutocompleteManufacturer.rejected]: state => {
      return {
        ...state,
        autocompleteManufacturerLoading: false,
        autocompleteManufacturer: []
      }
    },

    /* GET_AUTOCOMPLETE_ORIGIN_DATA */

    [a.getAutocompleteOrigin.pending]: state => {
      return {
        ...state,
        autocompleteOriginLoading: true
      }
    },
    [a.getAutocompleteOrigin.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        autocompleteOriginLoading: false,
        autocompleteOrigin: uniqueArrayByKey(payload.concat(state.autocompleteOrigin), 'id')
      }
    },
    [a.getAutocompleteOrigin.rejected]: state => {
      return {
        ...state,
        autocompleteOriginLoading: false,
        autocompleteOrigin: []
      }
    }
  },
  initialState
)
