import * as AT from './action-types'

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
  searchedProducts: [],
  searchedProductsLoading: false,
  broadcastedProductOffers: [],
  broadcastedProductOffersPageLoaded: -1,
  searchedProducts: [],
  searchedProductsLoading: false,
  warehousesList: [],
  loading: false,
  filter: null
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {

    case AT.MARKETPLACE_SEARCH_PRODUCTS_PENDING: {
      return {
        ...state,
        searchedProducts: [],
        searchedProductsLoading: true
      }
    }

    case AT.MARKETPLACE_SEARCH_PRODUCTS_FULFILLED: {
      return {
        ...state,
        searchedProducts: action.payload.data,
        searchedProductsLoading: false
      }
    }

    default: {
      return state
    }
  }
}