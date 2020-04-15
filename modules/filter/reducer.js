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
  productConditions: [],
  productForms: [],
  packagingTypes: [],
  productGrades: [],
  warehouses: [],
  params: {
    currencyCode: currency
  },
  inventory: {
    isFilterSaving: false,
    isFilterApplying: false,
    autocompleteWarehouse: [],
    autocompleteWarehouseLoading: false,
    savedFilters: [],
    appliedFilter: [],
    savedFiltersLoading: false,
    savedFilterUpdating: false,
    savedAutocompleteData: [],
    autocompleteManufacturer: [],
    autocompleteManufacturerLoading: false,
    autocompleteOrigin: [],
    autocompleteOriginLoading: false,
    filterState: null
  },
  marketplace: {
    isFilterSaving: false,
    isFilterApplying: false,
    autocompleteWarehouse: [],
    autocompleteWarehouseLoading: false,
    savedFilters: [],
    appliedFilter: [],
    savedFiltersLoading: false,
    savedFilterUpdating: false,
    savedAutocompleteData: [],
    autocompleteManufacturer: [],
    autocompleteManufacturerLoading: false,
    autocompleteOrigin: [],
    autocompleteOriginLoading: false,
    filterState: null
  },
  wantedBoard: {
    isFilterSaving: false,
    isFilterApplying: false,
    autocompleteWarehouse: [],
    autocompleteWarehouseLoading: false,
    savedFilters: [],
    appliedFilter: [],
    savedFiltersLoading: false,
    savedFilterUpdating: false,
    savedAutocompleteData: [],
    autocompleteManufacturer: [],
    autocompleteManufacturerLoading: false,
    autocompleteOrigin: [],
    autocompleteOriginLoading: false,
    filterState: null
  }
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

    /* // ! ! can be deleted?
    [a.toggleFilter]: (state, { payload: { value, type } }) => {
      let propName = 'isOpen'
      if (type === filterPresets.ORDERS) propName = 'ordersIsOpen'

      return {
        ...state,
        [propName]: typeof value === 'boolean' ? value : !state[propName]
      }
    },*/

    /* FILTER_SAVING */

    [a.filterSaving]: (state, { payload: isSaving }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
      ...state,
        [filterType]: {
          ...state[filterType],
          isFilterSaving: isSaving
        }
      }
    },

    /* FILTER_APPLYING */

    [a.filterApplying]: (state, { payload: isApplying }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
      ...state,
        [filterType]: {
          ...state[filterType],
          isFilterApplying: isApplying
        }
      }
    },

    /* GET_SAVED_FILTERS */

    [a.getSavedFilters.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFiltersLoading: true
        }
      }
    },
    [a.getSavedFilters.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
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
        [filterType]: {
          ...state[filterType],
          savedFiltersLoading: false,
          savedFilters: data,
          savedAutocompleteData: uniqueArrayByKey(
            mapAutocompleteData(autocompleteData).concat(state[filterType].savedAutocompleteData),
            'key'
          )
        }
      }
    },
    [a.getSavedFilters.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFiltersLoading: false,
          savedFilters: []
        }
      }
    },

    /* GET_AUTOCOMPLETE_DATA */

    // [a.getAutocompleteData.pending]: (state) => {
    //   const filterType = state.params.filterType; if (!filterType) return { ...state }
    //   return {
    //     ...state,
    //     [filterType]: {
    //       ...state[filterType],
    //       autocompleteDataLoading: true
    //     }
    //   }
    // },
    // [a.getAutocompleteData.fulfilled]: (state, { payload }) => {
    //   const filterType = state.params.filterType; if (!filterType) return { ...state }
    //   return {
    //     ...state,
    //     [filterType]: {
    //       ...state[filterType],
    //       autocompleteDataLoading: false,
    //       autocompleteData: uniqueArrayByKey(payload.concat(state[filterType].autocompleteData), 'id'),
    //     }
    //   }
    // },
    // [a.getAutocompleteData.rejected]: (state) => {
    //   const filterType = state.params.filterType; if (!filterType) return { ...state }
    //   return {
    //     ...state,
    //     [filterType]: {
    //       ...state[filterType],
    //       autocompleteDataLoading: false,
    //       autocompleteData: []
    //     }
    //   }
    // },

    /* GET_AUTOCOMPLETE_WAREHOUSE_DATA */

    [a.getAutocompleteWarehouse.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteWarehouseLoading: false
        }
      }
    },
    [a.getAutocompleteWarehouse.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteWarehouseLoading: false,
          autocompleteWarehouse: uniqueArrayByKey(payload.concat(state[filterType].autocompleteWarehouse), 'id')
        }
      }
    },
    [a.getAutocompleteWarehouse.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteWarehouseLoading: false,
          autocompleteWarehouse: []
        }
      }
    },

    /* SAVE_FILTER */

    [a.saveFilter.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          isFilterSaving: true
        }
      }
    },
    [a.saveFilter.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          isFilterSaving: false,
          savedFilters: [].concat(asignFiltersDescription(payload, state.params), state[filterType].savedFilters)
        }
      }
    },
    [a.saveFilter.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          isFilterSaving: false
        }
      }
    },

    /* APPLY_FILTER */

    [a.applyFilter]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      let appliedFilter = asignFiltersDescription(payload, state.params)
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          appliedFilter: {
            ...state[filterType].appliedFilter,
            ...appliedFilter
          }
        }
      }
    },

    /* DELETE_FILTER */

    [a.deleteFilter.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFiltersLoading: true
        }
      }
    },

    [a.deleteFilter.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFilters: state[filterType].savedFilters.filter(filter => filter.id !== payload),
          savedFiltersLoading: false
        }
      }
    },

    [a.deleteFilter.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFiltersLoading: false
        }
      }
    },

    /* UPDATE_FILTER_NOTIFICATIONS */

    [a.updateFilterNotifications.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFilterUpdating: true
        }
      }
    },

    [a.updateFilterNotifications.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      let savedFilters = state[filterType].savedFilters.slice(0)
      let index = savedFilters.findIndex(el => el.id === payload.id)

      savedFilters[index] = asignFiltersDescription(payload, state.params)

      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFilters,
          savedFilterUpdating: false
        }
      }
    },

    [a.updateFilterNotifications.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFilterUpdating: false
        }
      }
    },

    /* UPDATE_FILTER */

    [a.updateFilter.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          isFilterSaving: true
        }
      }
    },

    [a.updateFilter.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      let savedFilters = state[filterType].savedFilters.slice(0)
      let index = savedFilters.findIndex(el => el.id === payload.id)

      savedFilters[index] = asignFiltersDescription(payload, state.params)

      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          savedFilters,
          isFilterSaving: false
        }
      }
    },

    /* GET_AUTOCOMPLETE_MANUFACTURER_DATA */

    [a.getAutocompleteManufacturer.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteManufacturerLoading: true
        }
      }
    },
    [a.getAutocompleteManufacturer.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteManufacturerLoading: false,
          autocompleteManufacturer: uniqueArrayByKey(payload.concat(state[filterType].autocompleteManufacturer), 'id')
        }
      }
    },
    [a.getAutocompleteManufacturer.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteManufacturerLoading: false,
          autocompleteManufacturer: []
        }
      }
    },

    /* GET_AUTOCOMPLETE_ORIGIN_DATA */

    [a.getAutocompleteOrigin.pending]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteOriginLoading: true
        }
      }
    },
    [a.getAutocompleteOrigin.fulfilled]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteOriginLoading: false,
          autocompleteOrigin: uniqueArrayByKey(payload.concat(state[filterType].autocompleteOrigin), 'id')
        }
      }
    },
    [a.getAutocompleteOrigin.rejected]: state => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          autocompleteOriginLoading: false,
          autocompleteOrigin: []
        }
      }
    },
    [a.saveFilterState]: (state, { payload }) => {
      const filterType = state.params.filterType; if (!filterType) return { ...state }
      return {
        ...state,
        [filterType]: {
          ...state[filterType],
          filterState: payload
        }
      }
    },
    [a.fetchProductConditions.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productConditions: payload
      }
    },
    [a.fetchProductForms.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productForms: payload
      }
    },
    [a.fetchPackagingTypes.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        packagingTypes: payload
      }
    },
    [a.fetchProductGrade.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        productGrades: payload
      }
    },
    [a.fetchWarehouses.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        warehouses: payload
      }
    },
  },
  initialState
)
