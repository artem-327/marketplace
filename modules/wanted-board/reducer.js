import * as AT from './action-types'
import { uniqueArrayByKey, getSafe } from '~/utils/functions'

export const initialState = {
  editedId: null,
  editWindowOpen: null,
  sidebarValues: null,
  editInitTrig: false,



  listConditions: [],
  listForms: [],
  listGrades: [],
  lotFiles: [],
  poCreated: false,
  searchedManufacturers: [],
  searchedManufacturersLoading: false,
  searchedOrigins: [],
  searchedOriginsLoading: false,
  searchedProductsLoading: false,
  warehousesList: [],
  loading: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
  datagridFilter: { filters: [] },
  datagridFilterUpdate: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.WB_SIDEBAR_DETAIL_TRIGGER: {
      return {
        ...state,
        editInitTrig: !state.editInitTrig,
        editWindowOpen: payload.activeTab,
        sidebarValues: payload.row
      }
    }

    /*
    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_PENDING: {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    }

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_REJECTED: {
      return {
        ...state,
        autocompleteDataLoading: false
      }
    }

    case AT.CLEAR_AUTOCOMPLETE_DATA: {
      return {
        ...state,
        autocompleteData: []
      }
    }
    */



    default: {
      return state
    }
  }
}
