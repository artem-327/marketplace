import * as AT from './action-types'
import { uniqueArrayByKey } from '~/utils/functions'

export const initialState = {
  deleteRowById: null,
  confirmMessage: null,
  currentEditForm: null,
  currentAddForm: null,
  currentEdit2Form: null,
  currentAddDwolla: null,
  editPopupBoolean: false,
  popupValues: null,
  filterValue: '',
  loading: false,
  casProductsRows: [],
  companiesRows: [],
  currentTab: { name: 'Document Types', id: 9, type: 'document-types' },
  tableHandlersFilters: null
}

export default function reducer(state = initialState, action) {
  const { payload, type } = action

  switch (type) {
    case AT.DOCUMENT_TYPES_OPEN_POPUP: {
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
    case AT.DOCUMENT_TYPES_OPEN_EDIT_POPUP: {
      return {
        ...state,
        currentEditForm: state.currentTab,
        currentAddForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null,
        editPopupBoolean: state.editPopupBoolean === false ? true : false,
        popupValues: payload
      }
    }
    case AT.DOCUMENT_TYPES_CLOSE_CONFIRM_POPUP: {
      return {
        ...state,
        deleteRowById: null,
        confirmMessage: null
      }
    }
    case AT.DOCUMENT_TYPES_CLOSE_ADD_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }
    case AT.DOCUMENT_TYPES_CLOSE_EDIT_POPUP: {
      return {
        ...state,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }
    case AT.DOCUMENT_TYPES_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: payload,
        casProductsRows: [],
        companiesRows: []
      }
    }
    case AT.DOCUMENT_TYPES_CLOSE_POPUP: {
      return {
        ...state,
        popupValues: null,
        currentAddForm: null,
        currentEditForm: null,
        currentEdit2Form: null,
        currentAddDwolla: null
      }
    }
    case AT.DOCUMENT_TYPES_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    case AT.DOCUMENT_TYPES_DELETE_DOCUMENT_TYPES_DATA_PENDING: {
      return {
        ...state,
        loading: true
      }
    }
    case AT.DOCUMENT_TYPES_DELETE_DOCUMENT_TYPES_DATA_FULFILLED:
    case AT.DOCUMENT_TYPES_DELETE_DOCUMENT_TYPES_DATA_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    default: {
      return state
    }
  }
}
