import typeToReducer from 'type-to-reducer'

import {
  loadData,
  getCategories,
  deleteArray,
  getCountUnseen,
  handleVariableSave,
  markSeen,
  markSeenArray,
  markUnseen,
  markUnseenArray
} from './actions'

export const initialState = {
  topMenuTab: null,
  markSeenSending: false,
  loadingCategories: false,
  categories: [],
  tableHandlersFilters: null,
  countUnseen: 0
}

export default typeToReducer(
  {
    [loadData]: (state, { payload }) => ({
      ...state,
      topMenuTab: payload
    }),

    [markSeenArray.pending]: state => ({
      ...state,
      markSeenSending: true
    }),
    [markUnseenArray.pending]: state => ({
      ...state,
      markSeenSending: true
    }),
    [deleteArray.pending]: state => ({
      ...state,
      markSeenSending: true
    }),

    [markSeenArray.rejected]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markSeenArray.fulfilled]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markUnseenArray.rejected]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markUnseenArray.fulfilled]: state => ({
      ...state,
      markSeenSending: false
    }),
    [deleteArray.rejected]: state => ({
      ...state,
      markSeenSending: false
    }),
    [deleteArray.fulfilled]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markSeen.rejected]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markSeen.fulfilled]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markUnseen.rejected]: state => ({
      ...state,
      markSeenSending: false
    }),
    [markUnseen.fulfilled]: state => ({
      ...state,
      markSeenSending: false
    }),

    [getCategories.pending]: state => ({
      ...state,
      loadingCategories: true
    }),
    [getCategories.rejected]: state => ({
      ...state,
      loadingCategories: false
    }),
    [getCategories.fulfilled]: (state, { payload }) => ({
      ...state,
      loadingCategories: false,
      categories: payload
    }),

    [getCountUnseen.fulfilled]: (state, { payload }) => ({
      ...state,
      countUnseen: payload
    }),

    [handleVariableSave]: (state, { payload }) => ({
      ...state,
      [payload.variable]: payload.value
    })
  },
  initialState
)