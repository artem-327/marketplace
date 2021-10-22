import * as AT from './action-types'

export const initialState = {
  openedSubmitOfferPopup: false,
  openedInfoModal: false,
  openedRespondModal: false,
  openedAddEditModal: false,
  openedDeleteModal: false,
  openedSeeListingModal: false,
  infoModalData: {},
  editID: null,
  popupValues: null,
  sending: false,
  allPostsFilters: null,
  myPostsFilters: null,
  loading: false,
  toggleDisabled: false
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case AT.WB_OPEN_SUBMIT_OFFER: {
      return {
        ...state,
        openedSubmitOfferPopup: true,
      }
    }

    case AT.WB_OPEN_INFO_MODAL: {
      return {
        ...state,
        openedInfoModal: true,
        infoModalData: payload.row
      }
    }

    case AT.WB_CLOSE_INFO_MODAL: {
      return {
        ...state,
        openedInfoModal: false,
      }
    }

    case AT.WB_OPEN_RESPOND_MODAL: {
      return {
        ...state,
        openedRespondModal: true,
        editID: payload.row.id,
        popupValues: payload.row
      }
    }

    case AT.WB_CLOSE_RESPOND_MODAL: {
      return {
        ...state,
        openedRespondModal: false,
        editID: null,
        popupValues: null
      }
    }

    case AT.WB_CLOSE_POPUP: {
      return {
        ...state,
        openedSubmitOfferPopup: false,
      }
    }

    case AT.WB_ADD_EDIT_MODAL: {
      return {
        ...state,
        popupValues: payload.row,
        openedAddEditModal: true,
      }
    }

    case AT.WB_CLOSE_ADD_EDIT_MODAL: {
      return {
        ...state,
        popupValues: null,
        openedAddEditModal: false,
      }
    }

    case AT.WB_DELETE_MODAL: {
      return {
        ...state,
        openedDeleteModal: true,
      }
    }

    case AT.WB_CLOSE_DELETE_MODAL: {
      return {
        ...state,
        openedDeleteModal: false,
      }
    }

    case AT.WB_SEE_LISTING_MODAL: {
      return {
        ...state,
        openedSeeListingModal: true,
        editID: payload.row.id,
        popupValues: payload.row
      }
    }

    case AT.WB_CLOSE_SEE_LISTING_MODAL: {
      return {
        ...state,
        openedSeeListingModal: false,
        editID: null,
        popupValues: null
      }
    }

    case AT.WB_GET_WANTED_BOARD_PENDING: {
      return {
        ...state,
        loading: true,
      }
    }

    case AT.WB_GET_WANTED_BOARD_FULFILLED: {
      return {
        ...state,
        loading: false,
      }
    }

    case AT.WB_GET_WANTED_BOARD_REJECTED: {
      return {
        ...state,
        loading: false,
      }
    }

    case AT.WB_POST_NEW_PENDING: {
      return {
        ...state,
        sending: true,
      }
    }

    case AT.WB_POST_NEW_FULFILLED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_POST_NEW_REJECTED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_UPDATE_PENDING: {
      return {
        ...state,
        sending: true,
      }
    }

    case AT.WB_UPDATE_FULFILLED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_UPDATE_REJECTED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_DELETE_PENDING: {
      return {
        ...state,
        sending: true,
      }
    }

    case AT.WB_DELETE_FULFILLED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_DELETEE_REJECTED: {
      return {
        ...state,
        sending: false,
      }
    }

    case AT.WB_HANDLE_VARIABLE_CHANGE: {
      return {
        ...state,
        [action.payload.variable]: action.payload.value
      }
    }

    case AT.WB_TOGGLE_DISABLED: {
      return {
        ...state,
        toggleDisabled: action.payload
      }
    }

    default: {
      return state
    }
  }
}
