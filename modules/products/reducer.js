import * as AT from './action-types'
import { defaultTabs } from './constants'
import { uniqueArrayByKey } from '~/utils/functions'

export const initialState = {
  editTrig: false,
  popupValues: null,
  isOpenPopup: false,
  tabsNames: defaultTabs,
  currentTab: defaultTabs[0],
  loading: false,
  searchedCompanies: [],
  searchedCompaniesLoading: false,
  companyProductUnmappedOnly: false,
  ordersStatusFilter: 'All',
  orderDetailData: null,
  documentTypesFetching: false,
  listDocumentTypes: [],
  orderProcessing: false,
  orderAccountingDocuments: [],
  orderAccountingDocumentsLoading: false,
  currentEditForm: null,
  currentEdit2Form: null,
  currentAddForm: null,
  currentAddDwolla: null,
  editPopupBoolean: false,
  deleteRowById: null,
  confirmMessage: null,
  hazardClasses: [],
  packagingGroups: [],
  casProductsRows: [],
  filterCasIds: [],
  altCasNamesRows: [],
  editEchoProductEditTab: 0,
  editEchoProductInitTrig: false,
  searchedCasProducts: [],
  searchedManufacturersLoading: false,
  searchedManufacturers: [],
  unNumbersFetching: false,
  unNumbersFiltered: [],
  searchedTags: [],
  searchedTagsLoading: false,
  documentTypes: [],
  searchedMarketSegments: [],
  searchedMarketSegmentsLoading: false,
  altEchoNamesRows: [],
  searchedProductGroups: [],
  searchedProductGroupsLoading: false
}

export default function reducers(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.PRODUCTS_HANDLE_ACTIVE_TAB: {
      return {
        ...state,
        currentTab: payload.tab,
        popupValues: null,
        isOpenPopup: false,
        loading: false,
        orderDetailData: null,
        filterCasIds: []
      }
    }
    case AT.PRODUCTS_OPEN_POPUP: {
      return {
        ...state,
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
    case AT.PRODUCTS_OPEN_EDIT_2_POPUP: {
      return {
        ...state,
        currentEdit2Form: state.currentTab,
        currentAddForm: null,
        currentEditForm: null,
        currentAddDwolla: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: action.payload
      }
    }
    case AT.PRODUCTS_CLOSE_CONFIRM_POPUP: {
      return {
        ...state,
        deleteRowById: null,
        confirmMessage: null
      }
    }
    case AT.PRODUCTS_GET_HAZARD_CLASSES_FULFILLED: {
      return {
        ...state,
        hazardClasses: action.payload
      }
    }
    case AT.PRODUCTS_GET_PACKAGING_GROUPS_FULFILLED: {
      return {
        ...state,
        packagingGroups: action.payload
      }
    }
    /* CAS DELETE PRODUCT */

    case AT.PRODUCTS_CAS_DELETE_PRODUCT_PENDING: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.PRODUCTS_CAS_DELETE_PRODUCT_FULFILLED: {
      return {
        ...state,
        casProductsRows: state.casProductsRows.filter(row => row.id !== payload),
        loading: false
      }
    }

    case AT.PRODUCTS_CAS_DELETE_PRODUCT_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.PRODUCTS_CLOSE_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }

    case AT.PRODUCTS_CLOSE_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }
    case AT.PRODUCTS_CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }
    case AT.PRODUCTS_GET_ALTERNATIVE_COMPANY_GENERIC_PRODUCT_NAMES_PENDING:
    case AT.PRODUCTS_GET_COMPANY_GENERIC_PRODUCT_PENDING:
    case AT.PRODUCTS_REMOVE_ATTACHMENT_PENDING:
    case AT.PRODUCTS_REMOVE_ATTACHMENT_LINK_PENDING:
    case AT.PRODUCTS_LINK_ATTACHMENT_PENDING:
    case AT.PRODUCTS_ADD_ATTACHMENT_PENDING:
    case AT.PRODUCTS_POST_COMPANY_GENERIC_PRODUCT_PENDING:
    case AT.PRODUCTS_PUT_COMPANY_GENERIC_PRODUCT_PENDING:
    case AT.PRODUCTS_DELETE_PRODUCT_NAME_PENDING:
    case AT.PRODUCTS_UPDATE_PRODUCT_NAME_PENDING:
    case AT.PRODUCTS_POST_NEW_PRODUCT_NAME_PENDING:
    case AT.PRODUCTS_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case AT.PRODUCTS_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_FULFILLED: {
      return {
        ...state,
        altCasNamesRows: action.payload,
        loading: false
      }
    }
    case AT.PRODUCTS_GET_ALTERNATIVE_COMPANY_GENERIC_PRODUCT_NAMES_REJECTED:
    case AT.PRODUCTS_GET_COMPANY_GENERIC_PRODUCT_FULFILLED:
    case AT.PRODUCTS_GET_COMPANY_GENERIC_PRODUCT_REJECTED:
    case AT.PRODUCTS_REMOVE_ATTACHMENT_FULFILLED:
    case AT.PRODUCTS_REMOVE_ATTACHMENT_REJECTED:
    case AT.PRODUCTS_REMOVE_ATTACHMENT_LINK_FULFILLED:
    case AT.PRODUCTS_REMOVE_ATTACHMENT_LINK_REJECTED:
    case AT.PRODUCTS_LINK_ATTACHMENT_FULFILLED:
    case AT.PRODUCTS_LINK_ATTACHMENT_REJECTED:
    case AT.PRODUCTS_ADD_ATTACHMENT_FULFILLED:
    case AT.PRODUCTS_ADD_ATTACHMENT_REJECTED:
    case AT.PRODUCTS_POST_COMPANY_GENERIC_PRODUCT_FULFILLED:
    case AT.PRODUCTS_POST_COMPANY_GENERIC_PRODUCT_REJECTED:
    case AT.PRODUCTS_PUT_COMPANY_GENERIC_PRODUCT_FULFILLED:
    case AT.PRODUCTS_PUT_COMPANY_GENERIC_PRODUCT_REJECTED:
    case AT.PRODUCTS_DELETE_PRODUCT_NAME_REJECTED:
    case AT.PRODUCTS_UPDATE_PRODUCT_NAME_REJECTED:
    case AT.PRODUCTS_POST_NEW_PRODUCT_NAME_REJECTED:
    case AT.PRODUCTS_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }
    case AT.PRODUCTS_EDIT_COMPANY_GENERIC_PRODUCT_CHANGE_TAB: {
      return {
        ...state,
        editEchoProductEditTab: payload.editTab,
        editEchoProductInitTrig: payload.force ^ state.editEchoProductInitTrig,
        popupValues: payload.data,
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

    case AT.PRODUCTS_SEARCH_CAS_PRODUCT_FULFILLED: {
      return {
        ...state,
        // searchedCasProducts: payload.concat(state.searchedCasProducts),
        searchedCasProducts: uniqueArrayByKey(state.searchedCasProducts.concat(payload), 'id')
      }
      // return {
      //   ...state,
      //   searchedCasProducts: state.searchedCasProducts.map((list, listIndex) => {
      //     if (listIndex === action.payload.index) {
      //       return action.payload.data
      //     } else {
      //       return list
      //     }
      //   })
      // }
    }
    case AT.PRODUCTS_SEARCH_MANUFACTURERS_PENDING: {
      return {
        ...state,
        searchedManufacturersLoading: true
      }
    }
    case AT.PRODUCTS_SEARCH_MANUFACTURERS_FULFILLED: {
      return {
        ...state,
        searchedManufacturers: action.payload.data.map(manufacturer => ({
          key: manufacturer.id,
          value: manufacturer.id,
          text: manufacturer.name
        })),
        searchedManufacturersLoading: false
      }
    }
    case AT.PRODUCTS_GET_UN_NUMBERS_BY_STRING_PENDING: {
      return {
        ...state,
        unNumbersFetching: true
      }
    }
    case AT.PRODUCTS_GET_UN_NUMBERS_BY_STRING_FULFILLED: {
      return {
        ...state,
        unNumbersFetching: false,
        unNumbersFiltered: action.payload
      }
    }
    case AT.PRODUCTS_SEARCH_TAGS_PENDING: {
      return { ...state, searchedTagsLoading: true }
    }
    case AT.PRODUCTS_SEARCH_TAGS_REJECTED: {
      return { ...state, searchedTagsLoading: false }
    }
    case AT.PRODUCTS_SEARCH_TAGS_FULFILLED: {
      return {
        ...state,
        searchedTags: action.payload,
        searchedTagsLoading: false
      }
    }
    case AT.PRODUCTS_GET_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        documentTypes: action.payload.data.map(docType => {
          return {
            ...docType,
            value: docType.id,
            text: docType.name
          }
        })
      }
    }
    case AT.PRODUCTS_SEARCH_MARKET_SEGMENTS_PENDING: {
      return { ...state, searchedMarketSegmentsLoading: true }
    }
    case AT.PRODUCTS_SEARCH_MARKET_SEGMENTS_REJECTED: {
      return { ...state, searchedMarketSegmentsLoading: false }
    }
    case AT.PRODUCTS_SEARCH_MARKET_SEGMENTS_FULFILLED: {
      return {
        ...state,
        searchedMarketSegments: action.payload,
        searchedMarketSegmentsLoading: false
      }
    }
    case AT.PRODUCTS_GET_ALTERNATIVE_COMPANY_GENERIC_PRODUCT_NAMES_FULFILLED: {
      return {
        ...state,
        altEchoNamesRows: action.payload,
        loading: false
      }
    }
    case AT.PRODUCTS_GROUPS_CREATE_PENDING: {
      return { ...state, loading: true }
    }
    case AT.PRODUCTS_GROUPS_CREATE_REJECTED: {
      return { ...state, loading: false }
    }
    case AT.PRODUCTS_GROUPS_CREATE_FULFILLED: {
      return {
        ...state,
        productGroup: action.payload,
        loading: false
      }
    }
    case AT.PRODUCTS_GROUPS_UPDATE_PENDING: {
      return { ...state, loading: true }
    }
    case AT.PRODUCTS_GROUPS_UPDATE_REJECTED: {
      return { ...state, loading: false }
    }
    case AT.PRODUCTS_GROUPS_UPDATE_FULFILLED: {
      return {
        ...state,
        productGroup: action.payload,
        loading: false
      }
    }
    case AT.PRODUCTS_GROUPS_DELETE_PENDING: {
      return { ...state, loading: true }
    }
    case AT.PRODUCTS_GROUPS_DELETE_REJECTED: {
      return { ...state, loading: false }
    }
    case AT.PRODUCTS_GROUPS_DELETE_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }
    case AT.PRODUCTS_SEARCH_PRODUCT_GROUPS_PENDING: {
      return { ...state, searchedProductGroupsLoading: true }
    }
    case AT.PRODUCTS_SEARCH_PRODUCT_GROUPS_REJECTED: {
      return { ...state, searchedProductGroupsLoading: false }
    }
    case AT.PRODUCTS_SEARCH_PRODUCT_GROUPS_FULFILLED: {
      return {
        ...state,
        searchedProductGroups: action.payload,
        searchedProductGroupsLoading: false
      }
    }
    case AT.PRODUCTS_SEARCH_COMPANY_PENDING: {
      return { ...state, searchedCompaniesLoading: true }
    }
    case AT.PRODUCTS_SEARCH_COMPANY_REJECTED: {
      return { ...state, searchedCompaniesLoading: false }
    }
    case AT.PRODUCTS_SEARCH_COMPANY_FULFILLED: {
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
