import typeToReducer from 'type-to-reducer'
import * as a from './actions'

export const initialState = {
  messages: []
}

export default typeToReducer(
  {
    [a.addMessage]: (state, {payload: message}) => ({
      ...state,
      messages: [...state.messages, message]
    }),

    [a.removeMessage]: (state, {payload: index}) => ({
      ...state,
      messages: state.messages.filter((_, i) => i !== index)
    })
  },
  initialState
)
