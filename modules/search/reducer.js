import * as AT from './action-types'

export const initialState = {
  tags: [],
  loading: false,
  datagridFilter: { and: [], or: [] },
  datagridFilterUpdate: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.SEARCH_TAGS_PENDING: {
      return { ...state, loading: true }
    }
    case AT.SEARCH_TAGS_REJECTED: {
      return { ...state, loading: false }
    }
    case AT.SEARCH_TAGS_FULFILLED: {
      return {
        ...state,
        tags: action.payload,
        loading: false
      }
    }
    case AT.APPLY_FILTER: {
      return {
        ...state,
        datagridFilter: payload,
        datagridFilterUpdate: !state.datagridFilterUpdate
      }
    }
    default: {
      return state
    }
  }
}
