import * as AT from './action-types'
import { defaultTabs } from './constants'
import { uniqueArrayByKey } from '~/utils/functions'

export const initialState = {
  tabsNames: defaultTabs,
  editTrig: false,
  editedId: null,
  popupValues: null,
  loading: false,
  updating: false,
  companyListDataRequest: { pageSize: 50, pageNumber: 0, sortDirection: 'asc', sortPath: 'Company.name' },
  countries: [],
  countriesDropDown: [],
  primaryBranchProvinces: [],
  mailingBranchProvinces: [],
  addressSearchPrimaryBranch: [],
  addressSearchMailingBranch: [],
  isOpenSidebar: false,
  reRegisterP44Pending: false,
  currentUser: null,
  userRoles: [],
  clientCompanyRoles: [],
  adminRoles: [],
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  searchedCompaniesFilter: [],
  searchedCompaniesFilterLoading: false,
  searchedSellMarketSegments: [],
  searchedSellMarketSegmentsLoading: false,
  searchedBuyMarketSegments: [],
  searchedBuyMarketSegmentsLoading: false,
  tableHandlersFilters: null
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
        editedId: payload.data ? payload.data.id : null
      }
    }
    /* DELETE COMPANY */

    case AT.COMPANIES_DELETE_COMPANIES_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.COMPANIES_DELETE_USER_PENDING:
    case AT.COMPANIES_DELETE_COMPANIES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.COMPANIES_DELETE_USER_REJECTED:
    case AT.COMPANIES_DELETE_USER_FULFILLED:
    case AT.COMPANIES_DELETE_COMPANIES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.COMPANIES_CLOSE_POPUP: {
      return {
        ...state,
        isOpenSidebar: false,
        editedId: null
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

    case AT.COMPANIES_RE_REGISTER_P44_PENDING: {
      return { ...state, reRegisterP44Pending: true }
    }
    case AT.COMPANIES_RE_REGISTER_P44_REJECTED:
    case AT.COMPANIES_RE_REGISTER_P44_FULFILLED: {
      return { ...state, reRegisterP44Pending: false }
    }

    case AT.COMPANIES_GET_USERS_ME_FULFILLED: {
      return {
        ...state,
        currentUser: action.payload
      }
    }

    case AT.COMPANIES_GET_USER_ROLES_FULFILLED: {
      return {
        ...state,
        userRoles: action.payload
      }
    }

    case AT.COMPANIES_GET_CLIENT_COMPANY_ROLES_FULFILLED: {
      return {
        ...state,
        clientCompanyRoles: action.payload
      }
    }

    case AT.COMPANIES_GET_ADMIN_ROLES_FULFILLED: {
      return {
        ...state,
        adminRoles: action.payload
      }
    }

    case AT.COMPANIES_GET_USER_PENDING: {
      return { ...state, updating: true }
    }
    case AT.COMPANIES_GET_USER_REJECTED: {
      return { ...state, updating: false }
    }
    case AT.COMPANIES_GET_USER_FULFILLED: {
      return {
        ...state,
        updating: false
      }
    }

    case AT.COMPANIES_EDIT_USER_PENDING:
    case AT.COMPANIES_POST_NEW_USER_PENDING: {
      return { ...state, updating: true }
    }

    case AT.COMPANIES_POST_NEW_USER_REJECTED:
    case AT.COMPANIES_POST_NEW_USER_FULFILLED:
    case AT.COMPANIES_EDIT_USER_REJECTED:
    case AT.COMPANIES_EDIT_USER_FULFILLED: {
      return { ...state, updating: false }
    }

    case AT.COMPANIES_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.COMPANIES_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.COMPANIES_SEARCH_COMPANY_FULFILLED: {
      return {
        ...state,
        searchedCompanies: action.payload,
        searchedCompaniesLoading: false
      }
    }

    case AT.COMPANIES_SEARCH_COMPANY_FILTER_PENDING: {
      return { ...state, searchedCompaniesFilterLoading: true }
    }
    case AT.COMPANIES_SEARCH_COMPANY_FILTER_REJECTED: {
      return { ...state, searchedCompaniesFilterLoading: false }
    }
    case AT.COMPANIES_SEARCH_COMPANY_FILTER_FULFILLED: {
      return {
        ...state,
        searchedCompaniesFilter: action.payload,
        searchedCompaniesFilterLoading: false
      }
    }

    case AT.COMPANIES_INIT_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.COMPANIES_INIT_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.COMPANIES_INIT_SEARCH_COMPANY_FULFILLED: {
      return {
        ...state,
        searchedCompanies: [action.payload],
        searchedCompaniesLoading: false
      }
    }

    case AT.COMPANIES_SEARCH_SELL_MARKET_SEGMENTS_PENDING: {
      return { ...state, searchedSellMarketSegmentsLoading: true }
    }
    case AT.COMPANIES_SEARCH_SELL_MARKET_SEGMENTS_REJECTED: {
      return { ...state, searchedSellMarketSegmentsLoading: false }
    }
    case AT.COMPANIES_SEARCH_SELL_MARKET_SEGMENTS_FULFILLED: {
      return {
        ...state,
        searchedSellMarketSegments: action.payload,
        searchedSellMarketSegmentsLoading: false
      }
    }

    case AT.COMPANIES_SEARCH_BUY_MARKET_SEGMENTS_PENDING: {
      return { ...state, searchedBuyMarketSegmentsLoading: true }
    }
    case AT.COMPANIES_SEARCH_BUY_MARKET_SEGMENTS_REJECTED: {
      return { ...state, searchedBuyMarketSegmentsLoading: false }
    }
    case AT.COMPANIES_SEARCH_BUY_MARKET_SEGMENTS_FULFILLED: {
      return {
        ...state,
        searchedBuyMarketSegments: action.payload,
        searchedBuyMarketSegmentsLoading: false
      }
    }

    case AT.COMPANIES_SAVE_FILTERS: {
      return {
        ...state,
        tableHandlersFilters: action.payload
      }
    }

    default: {
      return state
    }
  }
}
