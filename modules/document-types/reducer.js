import * as AT from './action-types'

export const initialState = {
  popupValues: null,
  isOpenPopup: false,
  filterValue: '',
  loading: false,
  currentTab: { name: 'Document Types', id: 9, type: 'document-types' },
  tableHandlersFilters: null,
  documentGroupsLoading: false,
  documentGroups: []
}

export default function reducer(state = initialState, action) {
  const { payload, type } = action

  switch (type) {
    case AT.DOCUMENT_TYPES_OPEN_POPUP: {
      return {
        ...state,
        popupValues: payload,
        isOpenPopup: true
      }
    }
    case AT.DOCUMENT_TYPES_CLOSE_POPUP: {
      return {
        ...state,
        isOpenPopup: false,
        popupValues: null,
      }
    }
    case AT.DOCUMENT_TYPES_HANDLE_FILTERS_VALUE: {
      return {
        ...state,
        filterValue: payload
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

    case AT.DOCUMENT_TYPES_GET_DOCUMENT_GROUPS_BY_NAME_PENDING: {
      return {
        ...state,
        documentGroupsLoading: true
      }
    }
    case AT.DOCUMENT_TYPES_GET_DOCUMENT_GROUPS_BY_NAME_FULFILLED: {
      return {
        ...state,
        documentGroupsLoading: false,
        documentGroups: payload.map(data => ({
          text: data.name,
          value: data.id,
          key: data.id
        }))
      }
    }

    case AT.DOCUMENT_TYPES_GET_DOCUMENT_GROUPS_BY_NAME_REJECTED: {
      return {
        ...state,
        documentGroupsLoading: false
      }
    }

    default: {
      return state
    }
  }
}
