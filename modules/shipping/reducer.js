import * as AT from './action-types'

export const initialState = {
  loading: false,
  loadingZip: false,
  loadingCountries: false,
  zipCodes: [],
  countries: [],
  quotes: []
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AT.SHIPPING_GET_QUOTES: {
      return { ...state }
    }

    case AT.SHIPPING_GET_QUOTES_PENDING: {
      return { ...state, loading: true }
    }

    case AT.SHIPPING_GET_QUOTES_FULFILLED: {
      return { ...state, loading: false, quotes: payload }
    }

    case AT.SHIPPING_CLEAR_QUOTES: {
      return { ...state, loading: false, quotes: [] }
    }

    case AT.SHIPPING_GET_QUOTES_REJECTED: {
      return { ...state, loading: false }
    }

    case AT.SHIPPING_GET_ZIP_CODES_FULFILLED:
    case AT.SHIPPING_FORM_INIT_FULFILLED: {
      return {
        ...state,
        loadingZip: false,
        zipCodes: action.payload.map(z => ({
          text: z.zip,
          value: z.zip,
          key: z.id
        }))
      }
    }

    case AT.SHIPPING_GET_ZIP_CODES_PENDING: {
      return { ...state, loadingZip: true }
    }

    case AT.SHIPPING_GET_ZIP_CODES_REJECTED: {
      return { ...state, loadingZip: false }
    }

    case AT.SHIPPING_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        loadingCountries: false,
        countries: action.payload.map(c => ({
          text: c.name,
          value: c.id,
          key: c.id
        }))
      }
    }

    case AT.SHIPPING_GET_COUNTRIES_PENDING: {
      return { ...state, loadingCountries: true }
    }

    case AT.SHIPPING_GET_COUNTRIES_REJECTED: {
      return { ...state, loadingCountries: false }
    }

    default: {
      return state
    }
  }
}
