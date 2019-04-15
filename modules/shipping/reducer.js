import * as AT from './action-types'


export const initialState = {
  loading: false,
  quotes: []
}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {

    case AT.SHIPPING_GET_QUOTES: {
      return { ...state, 
      }
    }

    case AT.SHIPPING_GET_QUOTES_PENDING: {
      return { ...state,
        loading: true
      }
    }

    case AT.SHIPPING_GET_QUOTES_FULFILLED: {
      return { ...state,
        loading: false,
        quotes: payload
      }
    }

    case AT.SHIPPING_GET_QUOTES_REJECTED: {
      return {...state,
        loading: false,
      }
    }
  
    default: {
      return state
    }
  }
}