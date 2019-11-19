import * as AT from './action-types'

export const initialState = {
  loading: false,
  phoneCountryCodes: []
}

export default function reducer(state = initialState, action) {
  let {type, payload} = action

  switch (type) {
    case AT.PHONE_NUMBER_GET_COUNTRY_CODES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.PHONE_NUMBER_GET_COUNTRY_CODES_FULFILLED: {
      return {
        ...state,
        loading: false,
        phoneCountryCodes: payload
      }
    }

    default:
      return state
  }
}
