import * as AT from './action-types'

export const initialState = {
  loading: false,
  codes: []
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.ADD_ZIP: {
      let code = {
        text: payload,
        value: payload,
        key: payload
      }
      return {
        ...state,
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
      let newCodes = payload.map((code) => ({
        text: code.zip,
        value: code.zip,
        key: code.id
      }))

      let codes = newCodes.concat(state.codes)

      let uniqueCodes = codes
        .map(e => e.key)
        // store the keys of the unique objects
        .map((e, i, final) => final.indexOf(e) === i && i)
        // eliminate the dead keys & store unique objects
        .filter(e => codes[e]).map(e => codes[e])


      return {
        ...state,
        loading: false,
        codes: uniqueCodes

      }
    }

    default: return state
  }
}