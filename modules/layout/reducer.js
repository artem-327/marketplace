import typeToReducer from 'type-to-reducer'
import * as a from './actions'

export const initialState = {
  collapsedMenu: false
}

export default typeToReducer(
  {
    [a.toggleMenu]: (state) => ({
      ...state,
      collapsedMenu: !state.collapsedMenu
    })
  },
  initialState
)