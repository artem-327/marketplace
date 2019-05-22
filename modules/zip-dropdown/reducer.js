import * as AT from './action-types'

export const initialState = {
  loading: false,
  codes: []
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {

    case AT.ADD_ZIP_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.ADD_ZIP_FULFILLED: {
      let code = {
        text: payload.zip,
        value: payload.zip,
        key: payload.id
      }
      return {
        ...state,
        loading: false,
        codes: state.codes.concat(code)
      }
    }
    case AT.GET_ZIP_CODES_PENDING: {
      return {
        ...state,
        loading: true,
      }
    }

    case AT.GET_ZIP_CODES_FULFILLED: {
      return {
        ...state,
        loading: false,
        codes: payload.map((code) => ({
          text: code.zip,
          value: code.zip,
          key: code.id
        }))
      }
    }

    default: return state
  }
}