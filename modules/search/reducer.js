import * as AT from './action-types'

export const initialState = {
  tags: [],
  productOffers: [],
  loading: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.SEARCH_TAGS_PENDING: {
      return { ...state, loading: true }
    }
    case AT.SEARCH_TAGS_REJECTED: {
      return { ...state, loading: false }
    }
    case AT.SEARCH_TAGS_FULFILLED: {
      return {
        ...state,
        tags: action.payload,
        loading: false
      }
    }

    case AT.SEARCH_PRODUCT_OFFERS_INVENTORY_PENDING: {
      return { ...state, loading: true }
    }
    case AT.SEARCH_PRODUCT_OFFERS_INVENTORY_REJECTED: {
      return { ...state, loading: false }
    }
    case AT.SEARCH_PRODUCT_OFFERS_INVENTORY_FULFILLED: {
      return {
        ...state,
        productOffers: action.payload,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}
