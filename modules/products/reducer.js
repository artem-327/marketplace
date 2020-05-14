import * as AT from './action-types'
import { defaultTabs } from './constants'

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
  editEchoProductInitTrig: false
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
    case AT.PRODUCTS_DELETE_PRODUCT_NAME_REJECTED:
    case AT.PRODUCTS_UPDATE_PRODUCT_NAME_REJECTED:
    case AT.PRODUCTS_POST_NEW_PRODUCT_NAME_REJECTED:
    case AT.PRODUCTS_GET_ALTERNATIVE_CAS_PRODUCT_NAMES_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }
    case AT.PRODUCTS_EDIT_ECHO_PRODUCT_CHANGE_TAB: {
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
    default: {
      return state
    }
  }
}
