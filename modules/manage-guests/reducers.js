import * as AT from './action-types'
import { currency } from '~/constants/index'
import { FormattedMessage } from 'react-intl'

export const initialState = {
  popupValues: null,
  isOpenPopup: false,
  editTrig: false,
  loading: false,
  updating: false,
  //currentTab: '',
  guestsTab: 'company-info',
  isOpenCompanyEdit: false,
  companyEditValues: null,
  documentTypes: [],
  documentTypesLoading: false,
  tableHandlersFilters: null,
  tableHandlersCompanyEditFilters: null,
  clientCompanyRoles: [],
  documentManagerDatagridSharedWithMe: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action

  switch (action.type) {
    case AT.GUESTS_OPEN_POPUP: {
      return {
        ...state,
        isOpenPopup: true,
        editTrig: !state.editTrig,
        popupValues: payload
      }
    }
    case AT.GUESTS_CLOSE_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null
      }
    }

    case AT.GUESTS_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [payload.variable]: payload.value
      }
    }

    case AT.GUESTS_OPEN_COMPANY_EDIT: {
      return {
        ...state,
        isOpenCompanyEdit: true,
        guestsTab: 'company-info',
        companyEditValues: payload
      }
    }

    case AT.GUESTS_CLOSE_COMPANY_EDIT: {
      return {
        ...state,
        isOpenCompanyEdit: false,
        companyEditValues: null
      }
    }

    case AT.GUESTS_COMPANY_EDIT_TAB_CHANGED: {
      return {
        ...state,
        guestsTab: payload
      }
    }

    case AT.GUESTS_GET_DOCUMENT_TYPES_PENDING: {return { ...state, documentTypesLoading: true }}
    case AT.GUESTS_GET_DOCUMENT_TYPES_REJECTED: {return { ...state, documentTypesLoading: false }}
    case AT.GUESTS_GET_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        documentTypesLoading: false,
        documentTypes: payload
      }
    }

    case AT.GUESTS_GET_CLIENT_COMPANY_ROLES_FULFILLED: {
      return {
        ...state,
        clientCompanyRoles: action.payload
      }
    }

    case AT.GUESTS_DELETE_CLIENT_COMPANY_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GUESTS_DELETE_CLIENT_COMPANY_FULFILLED:
    case AT.GUESTS_DELETE_CLIENT_COMPANY_REJECTED: {
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
