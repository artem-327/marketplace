import * as AT from './action-types'

export const initialState = {
  loading: false,
  searchedCompanies: [],
  searchedCompaniesLoading: false,

}

export default function reducer(state = initialState, action) {
  const {type, payload} = action

  switch (type) {


    case AT.INVENTORY_EXPORT_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.INVENTORY_EXPORT_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.INVENTORY_EXPORT_SEARCH_COMPANY_FULFILLED: {
      return {
        ...state,
        searchedCompanies: action.payload,
        searchedCompaniesLoading: false
      }
    }

    default: {
      return state
    }
  }
}

