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
  tableHandlersFiltersListings: null,
  holds: [],
  typeHolds: 'my',
  countHolds: '',
  tableHandlersFiltersHolds: null,
  tableHandlersFiltersBidsSent: null,
  tableHandlersFiltersBidsReceived: null,
  isOpenPopup: false,
  popupValues: null
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

    case AT.CREATED_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.CREATED_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload
      }
    }

    case AT.CREATED_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.GET_COUNT_HOLDS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_COUNT_HOLDS_FULFILLED: {
      return {
        ...state,
        loading: false,
        countHolds: payload.data
      }
    }

    case AT.GET_COUNT_HOLDS_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.REJECT_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.REJECT_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.REJECT_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.CANCEL_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.CANCEL_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.CANCEL_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.APPROVE_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.APPROVE_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.APPROVE_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.TO_CART_HOLD_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.TO_CART_HOLD_FULFILLED: {
      return {
        ...state,
        loading: false,
        holds: payload.data
      }
    }

    case AT.TO_CART_HOLD_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.HOLD_APPLY_FILTER: {
      return {
        ...state,
        datagridFilter: payload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    }

    case AT.TOGGLE_HOLDS: {
      return {
        ...state,
        typeHolds: payload
      }
    }

    case AT.MARKETPLACE_OPEN_POPUP: {
      return {
        ...state,
        isOpenPopup: true,
        popupValues: action.payload
      }
    }
    case AT.MARKETPLACE_CLOSE_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null
      }
    }

    default: {
      return state
    }
  }
}
