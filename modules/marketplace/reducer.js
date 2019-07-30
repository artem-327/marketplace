import * as AT from './action-types'

import { uniqueArrayByKey } from '~/utils/functions'

export const initialState = {
  fileIds: [],
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
  broadcastedProductOffers: [],
  broadcastedProductOffersPageLoaded: -1,
  warehousesList: [],
  loading: false,
  autocompleteData: [],
  autocompleteDataLoading: false,
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_PENDING: {
      return {
        ...state,
        autocompleteDataLoading: true
      }
    }

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_FULFILLED: {
      return {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: uniqueArrayByKey(payload, 'id').map((el) => ({
          key: el.id,
          text: `${el.chemicalName} (${el.casNumber})`,
          value: JSON.stringify({ id: el.id, name: el.chemicalName, casNumber: el.casNumber }),
        })).concat(state.autocompleteData)
      }
    }

    case AT.GET_AUTOCOMPLETE_DATA_MARKETPLACE_REJECTED: {
      return {
        ...state,
        autocompleteDataLoading: false,
      }
    }


    default: {
      return state
    }
  }
}