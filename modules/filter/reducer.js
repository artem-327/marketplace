
import * as a from './actions'
import typeToReducer from 'type-to-reducer'

export const initialState = {
  isOpen: false,
  filterSaving: false,
  filterApplying: false
}

export default typeToReducer({
  [a.toggleFilter]: (state, { payload: value }) => ({
    ...state,
    isOpen: typeof value === 'boolean' ? value : !state.isOpen
  }),
  [a.filterSaving]: (state, { payload: isSaving }) => ({
    ...state,
    filterSaving: isSaving
  }),
  [a.filterApplying]: (state, { payload: isApplying }) => ({
    ...state,
    filterApplying: isApplying
  })

}, initialState)