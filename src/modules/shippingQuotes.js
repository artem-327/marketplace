import {
  SHIPPINGQUOTES_FETCH_REQUESTED,
  SHIPPINGQUOTES_FETCH_SUCCEEDED,
  SHIPPINGQUOTES_FETCH_FAILED
} from "../constants/shippingQuotes"


export const initialState = {
  destinationZIP: '',
  quantity: 0,
  maxTransit: 0,
  shippingQuotes: [],
  shippingQuotesIsFetching: false
}

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case SHIPPINGQUOTES_FETCH_REQUESTED: {
      return {
        ...state,
        shippingQuotesIsFetching: true
      }
    }
    case SHIPPINGQUOTES_FETCH_SUCCEEDED: {
      console.log(action)
      return {
        ...state,
        shippingQuotes: action.payload,
        shippingQuotesIsFetching: false
      }
    }
    case SHIPPINGQUOTES_FETCH_FAILED: {
      return {
        ...state,
        shippingQuotesIsFetching: false
      }
    }

    default: {
      return state
    }
  }
}

export function getShippingQuotes(pack) {
  return { type: SHIPPINGQUOTES_FETCH_REQUESTED, payload: { pack } }
}