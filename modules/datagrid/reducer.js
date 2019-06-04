import typeToReducer from 'type-to-reducer'
import * as a from './actions'

const initialState = {
  rows: [],
  page: 0
}

export default typeToReducer({

  [a.initTable]: (state) => ({
    ...state,
    // todo
  })

}, initialState)