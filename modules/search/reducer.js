import * as AT from './action-types'

export const initialState = {
  tags: [],
  productOffers: [],
  loadingNames: false,
  loadingTags: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.SEARCH_TAGS_PENDING: {
      return { ...state, loadingTags: true }
    }
    case AT.SEARCH_TAGS_REJECTED: {
      return { ...state, loadingTags: false }
    }
    case AT.SEARCH_TAGS_FULFILLED: {
      return {
        ...state,
        tags: action.payload,
        loadingTags: false
      }
    }

    case AT.SEARCH_PRODUCT_OFFERS_INVENTORY_PENDING: {
      return { ...state, loadingNames: true }
    }
    case AT.SEARCH_PRODUCT_OFFERS_INVENTORY_REJECTED: {
      return { ...state, loadingNames: false }
    }
    case AT.SEARCH_PRODUCT_OFFERS_INVENTORY_FULFILLED: {
      return {
        ...state,
        productOffers: action.payload,
        loadingNames: false
      }
    }

    case AT.SEARCH_CLEAR_PRODUCT_OFFERS: {
      return { productOffers: [] }
    }

    default: {
      return state
    }
  }
}
