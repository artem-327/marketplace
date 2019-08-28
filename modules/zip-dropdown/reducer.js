import * as AT from './action-types'

import { getSafe } from '~/utils/functions'

const mergeAndFilterCodes = (newCodes, oldCodes) => {
  if (!(newCodes instanceof Array)) newCodes = [newCodes]


  let newZips = newCodes.map((code) => ({
    text: getSafe(() => code.zip, code),
    value: JSON.stringify({ id: code.id, zip: code.zip }),
    key: getSafe(() => code.id, code)
  }))



  let codes = newZips.concat(oldCodes)

  let uniqueCodes = codes
    .map(e => e.key)
    // store the keys of the unique objects
    .map((e, i, final) => final.indexOf(e) === i && i)
    // eliminate the dead keys & store unique objects
    .filter(e => codes[e]).map(e => codes[e])

  return uniqueCodes
}

export const initialState = {
  loading: false,
  codes: []
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.ADD_ZIP: {
      return {
        ...state,
        codes: mergeAndFilterCodes(payload, state.codes)//state.codes.concat(codes)
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
        codes: mergeAndFilterCodes(payload, state.codes) //uniqueCodes

      }
    }

    default: return state
  }
}