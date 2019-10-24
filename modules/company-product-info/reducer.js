import typeToReducer from 'type-to-reducer'
import { openPopup, closePopup, tabChanged } from './actions'

const initialState = {
  isOpen: false,
  popupValues: {},
  activeIndex: 0
}

export default typeToReducer({
  [openPopup]: (state, { payload: { companyProduct, activeIndex } }) => {
    return {
      ...state,
      isOpen: true,
      popupValues: companyProduct,
      activeIndex
    }
  },

  [closePopup]: () => ({
    ...initialState,
    isOpen: false,
  }),

  [tabChanged]: (state, { payload }) => ({
    ...state,
    activeIndex: payload
  })
}, initialState)