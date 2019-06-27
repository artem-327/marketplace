
import * as a from './actions'
import typeToReducer from 'type-to-reducer'

import { uniqueArrayByKey } from '~/utils/functions'

import { datagridValues, paths } from './constants/filter'

const asignFiltersDescription = filter => {
  let datagridKeys = Object.keys(datagridValues)

  let { filters } = filter

  if (filters) {
    filters.forEach(filter => {
      datagridKeys.forEach(key => {
        let datagrid = datagridValues[key]

        if (datagrid.path === filter.path && datagrid.operator === filter.operator) {
          filter.description = datagrid.description
          filter.valuesDescription = datagridValues[key].valuesDescription(filter.values)
        }
      })
    })
  }


  return filter
}


export const initialState = {
  isOpen: false,
  isFilterSaving: false,
  isFilterApplying: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  savedFilters: [],
  appliedFilter: [],
  savedFiltersLoading: false,
  savedFilterUpdating: false
}

export default typeToReducer({

  /* TOGGLE_FILTER */

  [a.toggleFilter]: (state, { payload: value }) => ({
    ...state,
    isOpen: typeof value === 'boolean' ? value : !state.isOpen
  }),

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

  [a.getSavedFilters.pending]: (state) => {
    return {
      ...state,
      savedFiltersLoading: true
    }
  },
  [a.getSavedFilters.fulfilled]: (state, { payload }) => {

    let { data } = payload
    let autocompleteData = []

    data.forEach(element => {

      element = asignFiltersDescription(element)
      element.filters.forEach(filter => {
        if (filter.path === paths.productOffers.productId) {
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
      autocompleteData: uniqueArrayByKey(autocompleteData.concat(state.autocompleteData), 'id'),
    }
  },
  [a.getSavedFilters.rejected]: (state) => {
    return {
      ...state,
      savedFiltersLoading: false,
      savedFilters: []
    }
  },

  /* GET_AUTOCOMPLETE_DATA */

  [a.getAutocompleteData.pending]: (state) => {
    return {
      ...state,
      autocompleteDataLoading: true
    }
  },
  [a.getAutocompleteData.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      autocompleteDataLoading: false,
      autocompleteData: uniqueArrayByKey(payload.concat(state.autocompleteData), 'id'),
    }
  },
  [a.getAutocompleteData.rejected]: (state) => {
    return {
      ...state,
      autocompleteDataLoading: false,
      autocompleteData: []
    }
  },

  /* SAVE_FILTER */

  [a.saveFilter.pending]: (state) => {
    return {
      ...state,
      isFilterSaving: true
    }
  },
  [a.saveFilter.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      isFilterSaving: false,
      savedFilters: [].concat(payload, state.savedFilters),
    }
  },
  [a.saveFilter.rejected]: (state) => {
    return {
      ...state,
      isFilterSaving: false
    }
  },

  /* APPLY_FILTER */



  [a.applyFilter]: (state, { payload }) => {
    let appliedFilter = asignFiltersDescription(payload)

    return {
      ...state,
      appliedFilter: {
        ...state.appliedFilter,
        ...appliedFilter
      }
    }
  },

  /* DELETE_FILTER */

  [a.deleteFilter.pending]: (state) => {
    return {
      ...state,
      savedFiltersLoading: true
    }
  },

  [a.deleteFilter.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      savedFilters: state.savedFilters.filter((filter) => filter.id !== payload),
      savedFiltersLoading: false
    }
  },


  [a.deleteFilter.rejected]: (state) => {
    return {
      ...state,
      savedFiltersLoading: false
    }
  },

  /* UPDATE_FILTER_NOTIFICATIONS */


  [a.updateFilterNotifications.pending]: (state) => {
    return {
      ...state,
      savedFilterUpdating: true
    }
  },


  [a.updateFilterNotifications.fulfilled]: (state, { payload }) => {
    let savedFilters = state.savedFilters.slice(0)
    let index = savedFilters.findIndex((el) => el.id === payload.id)

    savedFilters[index] = payload


    return {
      ...state,
      savedFilters,
      savedFilterUpdating: false
    }
  },


  [a.updateFilterNotifications.rejected]: (state) => {
    return {
      ...state,
      savedFilterUpdating: false
    }
  },

}, initialState)