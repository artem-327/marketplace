import * as AT from './action-types'
import { uniqueArrayByKey } from '~/utils/functions'

export const initialState = {
  editTrig: false,
  popupValues: null,
  currentAddForm: null,
  currentEditForm: null,
  currentEdit2Form: null,
  currentAddForm: null,
  currentAddDwolla: null,
  loading: false,
  companiesRows: [],
  filterValue: '',
  casProductsRows: [],
  companyListDataRequest: { pageSize: 50, pageNumber: 0, sortDirection: 'asc', sortPath: 'Company.name' },
  countries: [],
  countriesDropDown: [],
  primaryBranchProvinces: [],
  mailingBranchProvinces: [],
  addressSearchPrimaryBranch: [],
  addressSearchMailingBranch: [],
  isOpenSidebar: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.COMPANIES_OPEN_POPUP: {
      return {
        ...state,
        isOpenSidebar: true,
        editTrig: !state.editTrig,
        popupValues: payload.data,

        //[payload.data ? 'currentEditForm' : 'currentAddForm']: state.currentTab,

        ...(payload.data
          ? {
              currentAddForm: null,
              currentEditForm: state.currentTab
            }
          : {
              currentAddForm: state.currentTab,
              currentEditForm: null
            }),
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }
    /* DELETE COMPANY */

    case AT.COMPANIES_DELETE_COMPANIES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.COMPANIES_DELETE_COMPANIES_FULFILLED: {
      return {
        ...state,
        loading: false,
        companiesRows: state.companiesRows.filter(company => company.id !== payload)
      }
    }

    case AT.COMPANIES_DELETE_COMPANIES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.COMPANIES_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: action.payload,
        casProductsRows: [],
        companiesRows: []
      }
    }

    case AT.COMPANIES_CLOSE_POPUP: {
      return {
        ...state,
        isOpenSidebar: false,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }

    case AT.COMPANIES_GET_COUNTRIES_FULFILLED: {
      return {
        ...state,
        countries: payload.countries,
        countriesDropDown: payload.countries.map(c => ({
          text: c.name,
          value: c.id,
          key: c.id
        }))
      }
    }

    case AT.COMPANIES_GET_PRIMARY_BRANCH_PROVINCES_FULFILLED: {
      return {
        ...state,
        primaryBranchProvinces: payload.map(d => ({
          text: d.name,
          //! ! This is not working in COMPANIES/Companies - Add/Edit submit sends wrong data body format in this case
          //! ! ??? value: { id: d.id, name: d.name, abbreviation: d.abbreviation || '' },
          value: d.id,
          key: d.id
        }))
      }
    }

    case AT.COMPANIES_GET_MAILING_BRANCH_PROVINCES_FULFILLED: {
      return {
        ...state,
        mailingBranchProvinces: payload.map(d => ({
          text: d.name,
          //! ! This is not working in COMPANIES/Companies - Add/Edit submit sends wrong data body format in this case
          //! ! ??? value: { id: d.id, name: d.name, abbreviation: d.abbreviation || '' },
          value: d.id,
          key: d.id
        }))
      }
    }

    case AT.COMPANIES_GET_ADDRESSES_SEARCH_PRIMARY_BRANCH_FULFILLED: {
      return {
        ...state,
        addressSearchPrimaryBranch: action.payload,
        loading: false
      }
    }

    case AT.COMPANIES_GET_ADDRESSES_SEARCH_MAILING_BRANCH_FULFILLED: {
      return {
        ...state,
        addressSearchMailingBranch: action.payload,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}
