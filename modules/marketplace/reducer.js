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
    case AT.MARKETPLACE_GET_BROADCASTED_PRODUCT_OFFERS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.MARKETPLACE_GET_BROADCASTED_PRODUCT_OFFERS_FULFILLED: {
      let { data, pageNumber } = action.payload
      return {
        ...state,
        loading: false,
        broadcastedProductOffers: pageNumber === 0 ? [
          ...data
        ] : [
            ...state.broadcastedProductOffers,
            ...(pageNumber > state.broadcastedProductOffersPageLoaded ? data : [])
          ],
        broadcastedProductOffersPageLoaded: pageNumber
      }
    }

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

    case AT.POST_BROADCASTED_DATAGRID_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.POST_BROADCASTED_DATAGRID_FULFILLED: {
      return {
        ...state,
        broadcastedProductOffers: payload.data,
        loading: false,
        filter: payload.filter
      }
    }

    case AT.POST_BROADCASTED_DATAGRID_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}