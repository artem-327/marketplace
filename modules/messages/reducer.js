import * as AT from './action-types'

export const initialState = {
  messages: []
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.ADD_MESSAGE: {
      return {
        ...state,
        messages: state.messages.concat(payload)
      }
    }

    case AT.REMOVE_MESSAGE: {
      return {
        ...state,
        messages: state.messages.filter((value, index) => index !== payload)
      }
    }
    default: return state
  }
}