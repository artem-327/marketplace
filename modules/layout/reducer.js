import typeToReducer from 'type-to-reducer'
import * as a from './actions'

export const initialState = {
  collapsedMenu: false,
  openGlobalAddFormName: ''
}

export default typeToReducer(
  {
    [a.toggleMenu]: (state) => ({
      ...state,
      collapsedMenu: !state.collapsedMenu
    }),

    [a.openGlobalAddForm]: (state, { payload: name }) => ({
      ...state,
      openGlobalAddFormName: name
    })
  },
  initialState
)