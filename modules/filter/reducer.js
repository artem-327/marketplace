
import * as a from './actions'
import typeToReducer from 'type-to-reducer'

import { uniqueArrayByKey } from '~/utils/functions'

export const initialState = {
  isOpen: false,
  isFilterSaving: false,
  isFilterApplying: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  savedFilters: [],
  savedFiltersLoading: false
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
    return {
      ...state,
      savedFiltersLoading: false,
      savedFilters: payload
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
}, initialState)