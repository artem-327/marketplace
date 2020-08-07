import * as AT from './action-types'

import { uniqueArrayByKey, getSafe } from '~/utils/functions'

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
  datagridFilter: { filters: [] },
  datagridFilterReload: false,
  datagridFilterUpdate: false,
  tableHandlersFilters: null
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
      const rVal = {
        ...state,
        autocompleteDataLoading: false,
        autocompleteData: state.autocompleteData.concat(
          uniqueArrayByKey(payload, 'id').map(el => {
            const productName = getSafe(() => el.name, '')
            return {
              ...el,
              key: el.id,
              text: productName,
              value: JSON.stringify({
                id: el.id,
                name: productName
              }),
              content: {
                productName: productName,
                casProducts: getSafe(() => el.companyGenericProduct.elements, [])
              }
            }
          })
        )
      }
      return rVal
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

    case AT.MARKETPLACE_APPLY_FILTER: {
      return {
        ...state,
        datagridFilter: payload.filter,
        datagridFilterReload: payload.reload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    }

    case AT.MARKETPLACE_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    default: {
      return state
    }
  }
}
